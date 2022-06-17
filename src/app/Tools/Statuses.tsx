import { BotOIcon, BoXIcon, PlayerOIcon, PlayerXIcon } from 'components/OxoIcons'
import OxoText from 'components/OxoText'
import { useGameResult, useIsPlayerNow, useSide } from 'hooks'
import React, { useRef } from 'react'
import { useMemo } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import { oColor, xColor } from 'theme'
import rand from 'utils/rand'


const StatusIcon = () => {
    const isPlayerNow = useIsPlayerNow()
    const { side } = useSide()
    const icon = useMemo(
        () => isPlayerNow
            ? side === 'x' ? <PlayerXIcon /> : <PlayerOIcon />
            : side !== 'x' ? <BoXIcon /> : <BotOIcon />,
        [isPlayerNow, side]
    )

    const anim = useRef(new Animated.Value(0)).current
    Animated.timing(anim, {
        toValue: isPlayerNow ? 1 : 2,
        duration: isPlayerNow ? 1200 : 700,
        useNativeDriver: true
    }).start()

    const styleAnim = useMemo(() => {
        if (isPlayerNow) {
            const interpolate = anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '1440deg']
            })
            return { transform: [{ rotate: interpolate }] }
        } else {
            const interpolate = anim.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0.5, 1.5, 1]
            })
            return { transform: [{ scale: interpolate }] }
        }
    }, [isPlayerNow])

    return (
        <Animated.View style={styleAnim}>
            {icon}
        </Animated.View>
    )
}


const playerTexts = [
    'run',
    'just do it',
    'come on',
    'you can',
    `don't screw up`,
]
const botTexts = [
    'computing',
    'request to NASA',
    'beep beep',
    'kill humans',
    'hold my beer'
]
const StatusText = () => {
    const isPlayerNow = useIsPlayerNow()
    const { side } = useSide()

    const text = useMemo(
        () => isPlayerNow
            ? playerTexts[rand(0, playerTexts.length - 1)]
            : botTexts[rand(0, botTexts.length - 1)],
        [isPlayerNow]
    )


    const anim = useRef(new Animated.Value(0)).current
    Animated.timing(anim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()


    return (
        <Animated.View style={{ opacity: anim }}>
            <OxoText
                color={
                    isPlayerNow
                        ? side === 'x' ? xColor : oColor
                        : side !== 'x' ? xColor : oColor
                }
                fontSize={32}
            >
                {text}
            </OxoText>
        </Animated.View>
    )
}


const WinnerText = () => {
    const { gameResult, restart } = useGameResult()
    const { side } = useSide()

    const text = useMemo(
        () => gameResult === 'player'
            ? 'Player WIN'
            : gameResult === 'bot'
                ? 'Bot WIN'
                : 'Both LOSE',
        [gameResult]
    )


    const anim = useRef(new Animated.Value(0)).current
    Animated.timing(anim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    }).start()


    return (
        <TouchableOpacity onPress={() => { restart() }} activeOpacity={1}>
            <Animated.View style={{ opacity: anim }}>
                <OxoText
                    color={
                        gameResult === 'player'
                            ? side === 'x' ? xColor : oColor
                            : side !== 'x' ? xColor : oColor
                    }
                    fontSize={48}
                >
                    {text}
                </OxoText>
            </Animated.View>
        </TouchableOpacity>
    )
}



const Statuses = () => {
    const { gameResult } = useGameResult()

    const status = useMemo(() => gameResult === null ? (
        <>
            <StatusIcon />
            <View style={{ paddingHorizontal: 8 }}>
                <StatusText />
            </View>
        </>
    ) : (
        <WinnerText />
    ), [gameResult])

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {status}
        </View>
    )
}

export default Statuses