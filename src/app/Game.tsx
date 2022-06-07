import React from 'react'
import Layout from './Layout'
import { Arena } from './Arena'
import { Score } from './Score'
import { Tools } from './Tools'
import { GameContext } from 'hooks'

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