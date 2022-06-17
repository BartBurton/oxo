import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Arena } from './Arena'
import { Score } from './Score'
import { Tools } from './Tools'
import { GameContext } from 'hooks'
import { Config } from 'game'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Game = () => {
    return (
        <Layout>
            <GameContext>
                <Score />
                <Tools />
                <Arena />
            </GameContext>
        </Layout>
    )
}

export default Game