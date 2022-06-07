import { BotOIcon, BoXIcon, PlayerOIcon, PlayerXIcon } from 'components/OxoIcons'
import OxoText from 'components/OxoText'
import { useIsPlayerNow, useSide } from 'hooks'
import React, { useRef } from 'react'
import { useMemo } from 'react'
import { Animated, View } from 'react-native'
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



const Statuses = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <StatusIcon />
            <View style={{ paddingHorizontal: 8 }}>
                <StatusText />
            </View>
        </View>
    )
}

export default Statuses