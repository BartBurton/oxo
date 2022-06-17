import { useGameContext } from 'hooks'
import React, { useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import Cell from './Cell'

const Arena = () => {
    const [scale, setScale] = useState(0)
    const onLayoutHandler = ({ nativeEvent: { layout: { width, height } } }: LayoutChangeEvent) => {
        setScale(Math.min(width, height) / 3)
    }

    const { arena: { size } } = useGameContext()

    return (
        <View style={styles.arena} onLayout={onLayoutHandler}>
            {
                [...Array(size.x).keys()].map(x => (
                    <View
                        key={x}
                        style={[ styles.row, { height: `${scale}px` } ]}
                    >
                        {[...Array(size.y).keys()].map(y => (
                            <Cell
                                key={y}
                                x={x}
                                y={y}
                                maxWidth={`${scale}px`}
                            />
                        ))}
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    arena: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export default Arena