import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const { status, restart } = useGameContext()
    const [state, setState] = useState(status.gameResult)

    let key: number
    useEffect(() => {
        key = status.onGameResultChange.subscribe(setState)
        return () => {
            status.onGameResultChange.unsubscribe(key)
        }
    })

    return {
        gameResult: state,
        restart: restart
    }
}