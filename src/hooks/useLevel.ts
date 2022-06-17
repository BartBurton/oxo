import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const { bot } = useGameContext()
    const [state, setState] = useState(bot.level)

    let key: number
    useEffect(() => {
        key = bot.onLevelToggle.subscribe(setState)
        return () => {
            bot.onLevelToggle.unsubscribe(key)
        }
    })

    return {
        level: state,
        toggleLevel: bot.toggleLevel
    }
}