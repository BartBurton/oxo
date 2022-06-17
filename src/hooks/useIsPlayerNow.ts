import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const { status } = useGameContext()
    const [state, setState] = useState(status.isPlayerNow)

    let key: number
    useEffect(() => {
        key = status.onIsPlayerNowToggle.subscribe(setState)
        return () => {
            status.onIsPlayerNowToggle.unsubscribe(key)
        }
    })

    return state
}