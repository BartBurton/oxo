import { Config, Game } from 'game'
import React from 'react'
import { Children } from 'types/Children'


const _GameContext = React.createContext<Game | null>(null)

type Props = {
    value?: Config
    children: Children
}
export const GameContext = ({ value, children }: Props) => {
    const _game = React.useRef<Game>(new Game(value))
    
    return (
        <_GameContext.Provider value={_game.current}>
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