import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const { status } = useGameContext()
    const [state, setState] = useState(status.side)

    let key: number
    useEffect(() => {
        key = status.onSideToggle.subscribe(setState)
        return () => {
            status.onSideToggle.unsubscribe(key)
        }
    })

    return {
        side: state,
        toggleSide: status.toggleSide
    }
}