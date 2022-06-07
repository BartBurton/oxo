import React, { useMemo } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { shadowColor } from 'theme'
import { Children } from 'types/Children'

type IconProps = {
    size: 'small' | 'middle' | 'large'
}

const OxoIcon = ({ size, children }: IconProps & Children) => {
    const scale = useMemo(() => {
        switch (size) {
            case 'small':
                return 64
            case 'middle':
                return 128
            default:
                return 256
        }
    }, [size])

    return (
        <View
            style={{
                width: scale,
                height: scale,
            }}
        >
            {children as any}
        </View>
    )
}

export const BotOIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/bot-o.png')} />
        </OxoIcon>
    )
}
BotOIcon.defaultProps = { size: 'small' }

export const BoXIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/bot-x.png')} />
        </OxoIcon>
    )
}
BoXIcon.defaultProps = { size: 'small' }

export const EasyIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/easy.png')} />
        </OxoIcon>
    )
}
EasyIcon.defaultProps = { size: 'small' }

export const HardIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/hard.png')} />
        </OxoIcon>
    )
}
HardIcon.defaultProps = { size: 'small' }

export const MiddleIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/middle.png')} />
        </OxoIcon>
    )
}
MiddleIcon.defaultProps = { size: 'small' }

export const OIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/o.png')} />
        </OxoIcon>
    )
}
OIcon.defaultProps = { size: 'small' }

export const PlayerOIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/player-o.png')} />
        </OxoIcon>
    )
}
PlayerOIcon.defaultProps = { size: 'small' }

export const PlayerXIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/player-x.png')} />
        </OxoIcon>
    )
}
PlayerXIcon.defaultProps = { size: 'small' }

export const SwapToXIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/swap-to-x.png')} />
        </OxoIcon>
    )
}
SwapToXIcon.defaultProps = { size: 'small' }

export const SwapToOIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/swap-to-o.png')} />
        </OxoIcon>
    )
}
SwapToOIcon.defaultProps = { size: 'small' }

export const XIcon = ({ size }: IconProps) => {
    return (
        <OxoIcon size={size}>
            <Image style={styles.img} source={require('icons/x.png')} />
        </OxoIcon>
    )
}
XIcon.defaultProps = { size: 'small' }


const styles = StyleSheet.create({
    img: {
        height: '100%',
        width: '100%',
        shadowColor: shadowColor,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0
    },
})