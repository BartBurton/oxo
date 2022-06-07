import { EasyIcon, HardIcon, MiddleIcon, SwapToOIcon, SwapToXIcon } from 'components/OxoIcons'
import { useLevel, useSide } from 'hooks'
import React, { useRef } from 'react'
import { useMemo } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'


const LevelToggler = () => {
    const { level, toggleLevel } = useLevel()
    const icon = useMemo(() => {
        switch (level) {
            case 'easy':
                return <EasyIcon />
            case 'middle':
                return <MiddleIcon />
            default:
                return <HardIcon />
        }
    }, [level])

    const anim = useRef(new Animated.Value(0)).current
    const timing = Animated.timing(anim, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true
    })
    const handlePress = () => {
        setTimeout(() => { toggleLevel() }, 150)
        timing.start(() => anim.setValue(0))
    }
    const interpolateY = anim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 0.2, 1]
    })


    return (
        <Animated.View style={{ transform: [{ scaleY: interpolateY }] }}>
            <TouchableOpacity onPress={() => { handlePress() }} activeOpacity={1}>
                {icon}
            </TouchableOpacity>
        </Animated.View >
    )
}

const SideToggler = () => {
    const { side, toggleSide } = useSide()
    const icon = useMemo(() => side === 'x' ? <SwapToXIcon /> : <SwapToOIcon />, [side])

    const anim = useRef(new Animated.Value(0)).current
    const timing = Animated.timing(anim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
    })
    const handlePress = () => {
        setTimeout(() => { toggleSide() }, 600)
        timing.start(() => anim.setValue(0))
    }
    const interpolateSpin = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '7200deg']
    })


    return (
        <TouchableOpacity onPress={() => { handlePress() }} activeOpacity={1}>
            <Animated.View style={{ transform: [{ rotate: interpolateSpin }] }}>
                {icon}
            </Animated.View>
        </TouchableOpacity>
    )
}


const Togglers = () => {
    return (
        <>
            <LevelToggler />
            <View style={{ paddingHorizontal: 8 }}>
                <SideToggler />
            </View>
        </>
    )
}

export default Togglers