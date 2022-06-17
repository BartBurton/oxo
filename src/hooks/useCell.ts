import { useEffect, useState } from "react"
import { useGameContext } from "./useGameContext"

export default (x: number, y: number) => {
    const { arena } = useGameContext()
    const [state, setState] = useState(arena.get(x, y))

    let key: number
    useEffect(() => {
        key = arena.onCellChange(x, y).subscribe(setState)
        return () => {
            arena.onCellChange(x, y).unsubscribe(key)
        }
    })

    return {
        cell: state,
        move: arena.move(x, y)
    }
}