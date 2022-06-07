import { Arena, GameSubscriber, Bot, Status } from 'game'
import { Score } from 'types/Score'
import { Side } from 'types/Side'

export type Config = {
    status?: Status
    bot?: Bot
    arena?: Arena
} | undefined


class Game {
    private _status: Status
    private _bot: Bot
    private _arena: Arena

    public get status() { return this._status }
    public get bot() { return this._bot }
    public get arena() { return this._arena }


    // public changeCell = (x: number, y: number) => {
    //     return () => {
    //         if (this.isPlayerNow && this._arena.get(x, y) === null) {
    //             this._arena.set(x, y, this.side)
    //             this.toggleIsPlayerNow()
    //         }
    //     }
    // }

    constructor(config: Config) {
        const { status, bot, arena } = !!config
            ? config
            : {
                status: undefined,
                bot: undefined,
                arena: undefined,
            }

        this._status = status ? status : new Status()
        this._bot = bot ? bot : new Bot()
        this._arena = arena ? arena : new Arena()
    }
}

export default Game