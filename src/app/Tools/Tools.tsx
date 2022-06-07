import OxoText from 'components/OxoText'
import React from 'react'
import { View } from 'react-native'
import Statuses from './Statuses'
import Togglers from './Togglers'

const Tools = () => {
    return (
        <View style={{ flex: 2, flexDirection: 'column' }}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
                <Statuses />
            </View>

            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                <Togglers />
            </View>
        </View>
    )
}

export default Tools