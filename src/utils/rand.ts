import { Arena } from "game"

const rand = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export default rand

export const selectRandomOnArena = (arena: Arena) => {
    const indexes: { x: number; y: number }[] = []

    for (let i = 0; i < arena.size.x; i++) {
        for (let j = 0; j < arena.size.y; j++) {
            const cell = arena.get(i, j)
            if (cell === null) {
                indexes.push({
                    x: i,
                    y: j,
                })
            }
        }
    }
    const index = rand(0, indexes.length - 1)

    return indexes[index]
}
