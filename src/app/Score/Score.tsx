import OxoText from 'components/OxoText'
import { useScore, useSide } from 'hooks'
import React from 'react'
import { View } from 'react-native'
import { oColor, xColor } from 'theme'

const Score = () => {
    const score = useScore()
    const { side } = useSide()

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <OxoText color={side === 'x' ? xColor : oColor}>
                you: {score.player}
            </OxoText>
            <OxoText color={side !== 'x' ? xColor : oColor}>
                bot: {score.bot}
            </OxoText>
        </View>
    )
}

export default Score