import { Arena, GameSubscriber } from "game"
import { Level } from "types/Level"
import { Side } from "types/Side"
import { selectRandomOnArena } from "utils/rand"
import { revers } from "utils/side"

export type BotConfig = {
    level: Level
} | undefined


class Bot {
    private _level: Level
    public get level() { return this._level }

    public toggleLevel = () => {
        if (this._level === 'easy') {
            this._level = 'middle'
        } else if (this._level === 'middle') {
            this._level = 'hard'
        } else {
            this._level = 'easy'
        }

        this.onLevelToggle.handle(this._level)
    }

    public onLevelToggle = new GameSubscriber<Level>()


    constructor(config: BotConfig) {
        const { level } = !!config
        ? config
        : {
            level: undefined,
        }

        this._level = level ? level : 'easy'
    }

    public state = (): BotConfig => ({
        level: this._level,
    })


    private moveKey: NodeJS.Timeout = setTimeout(() => { })
    public makeMove = (arena: Arena, playerSide: Side) => {
        clearTimeout(this.moveKey)
        this.moveKey = setTimeout(() => {
            this._mover(arena, playerSide)
        }, 1000)
    }

        private _easy = (arena: Arena, playerSide: Side) => {
        const xy = selectRandomOnArena(arena)
        arena.move(xy.x, xy.y, revers(playerSide))
    }

    private _middle = (arena: Arena, playerSide: Side) => {
        this._easy(arena, playerSide)
    }

    private _hard = (arena: Arena, playerSide: Side) => {
        this._easy(arena, playerSide)
    }

    private _mover = (arena: Arena, playerSide: Side) => {
        if (this._level === 'easy') {
            this._easy(arena, playerSide)
        } else if (this._level === 'middle') {
            this._middle(arena, playerSide)
        } else {
            this._hard(arena, playerSide)
        }
    }
}

export default Bot