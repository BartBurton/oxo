import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const context = useGameContext()
    const [state, setState] = useState(context.level)

    let key: number
    useEffect(() => {
        key = context.onLevelToggle.subscribe(setState)
        return () => {
            context.onLevelToggle.unsubscribe(key)
        }
    })

    return {
        level: state,
        toggleLevel: context.toggleLevel
    }
}