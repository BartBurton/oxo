import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const { status } = useGameContext()
    const [state, setState] = useState(status.score)

    let key: number
    useEffect(() => {
        key = status.onScoreChange.subscribe(setState)
        return () => {
            status.onScoreChange.unsubscribe(key)
        }
    })

    return state
}