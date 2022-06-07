import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const context = useGameContext()
    const [state, setState] = useState(context.status.isPlayerNow)

    let key: number
    useEffect(() => {
        key = context.onIsPlayerNowToggle.subscribe(setState)
        return () => {
            context.onIsPlayerNowToggle.unsubscribe(key)
        }
    })

    return state
}