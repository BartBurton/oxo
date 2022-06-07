import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const context = useGameContext()
    const [state, setState] = useState(context.score)

    let key: number
    useEffect(() => {
        key = context.onScoreChange.subscribe(setState)
        return () => {
            context.onScoreChange.unsubscribe(key)
        }
    })

    return state
}