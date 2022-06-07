import { OIcon, XIcon } from 'components/OxoIcons'
import { useCell } from 'hooks'
import React from 'react'
import { useMemo } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'

type Props = {
    x: number
    y: number
    styles?: StyleProp<ViewStyle>
    maxWidth?: string
    maxHeight?: string
}

const Cell = ({ x, y, styles, maxWidth, maxHeight }: Props) => {
    const { cell, changeCell } = useCell(x, y)

    const icon = useMemo(() => cell && (
        cell === 'o' ? <OIcon /> : <XIcon />
    ), [cell])


    return (
        <TouchableOpacity
            onPress={() => { changeCell() }}
            style={[
                styles, {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 6,
                    maxWidth: maxWidth,
                    maxHeight: maxHeight,
                    backgroundColor: '#626c80',
                    borderColor: '#3a404d',
                    borderRadius: 16,
                    borderEndWidth: 6,
                    borderBottomWidth: 6,
                }
            ]}
        >
            {icon}
        </TouchableOpacity>
    )
}

export default Cell