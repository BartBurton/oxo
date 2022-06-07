import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default () => {
    const context = useGameContext()
    const [state, setState] = useState(context.side)
    
    let key: number
    useEffect(() => {
        key = context.onSideToggle.subscribe(setState)
        return () => {
            context.onSideToggle.unsubscribe(key)
        }
    })

    return {
        side: state,
        toggleSide: context.toggleSide
    }
}