import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default (x: number, y: number) => {
    const context = useGameContext()
    const [state, setState] = useState(context.arena.get(x, y))

    let key: number
    useEffect(() => {
        key = context.arena.subscribe(x, y, setState)
        return () => {
            context.arena.unsubscribe(x, y, key)
        }
    })

    return {
        cell: state,
        changeCell: context.changeCell(x, y)
    }
}