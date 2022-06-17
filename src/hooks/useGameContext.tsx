import { Config, Game } from 'game'
import React, { useEffect, useState } from 'react'
import { Children } from 'types/Children'
import AsyncStorage from '@react-native-async-storage/async-storage'


const _GameContext = React.createContext<Game | null>(null)

type Props = {
    children: Children
}
export const GameContext = ({ children }: Props) => {
    const [state, setState] = useState<Game | null>(null)
    useEffect(() => {
        AsyncStorage.getItem('state').then(e => {
            let game: Game = new Game(undefined)
            if (e !== null) {
                game = new Game(JSON.parse(e) as Config)
            }
            game.onStateCreate.subscribe((e) => {
                AsyncStorage.setItem('state', JSON.stringify(e))
            })
            setState(game)
        })
    }, [AsyncStorage])


    return (state !== null &&
        <_GameContext.Provider value={state}>
            {children}
        </_GameContext.Provider>
    )
}

export const useGameContext = () => {
    const context = React.useContext(_GameContext)
    if (!context) {
        throw new Error('Call must be in GameContext.')
    }
    return context
}