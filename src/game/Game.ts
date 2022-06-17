import { Arena, GameSubscriber, Bot, Status } from 'game'
import { Score } from 'types/Score'
import { Side } from 'types/Side'
import { ArenaConfig } from './Arena'
import { BotConfig } from './Bot'
import { StatusConfig } from './Status'

export type Config = {
    status: StatusConfig
    bot: BotConfig
    arena: ArenaConfig
} | undefined


class Game {
    private _status: Status
    private _bot: Bot
    private _arena: Arena

    public get status() {
        return {
            isPlayerNow: this._status.isPlayerNow,
            onIsPlayerNowToggle: this._status.onIsPlayerNowToggle,
            score: this._status.score,
            onScoreChange: this._status.onScoreChange,
            side: this._status.side,
            toggleSide: this._status.toggleSide,
            onSideToggle: this._status.onSideToggle,
            gameResult: this._status.gameResult,
            onGameResultChange: this._status.onGameResultChange,
        }
    }
    public get arena() {
        return {
            get: this._arena.get,
            move: this.move,
            size: this._arena.size,
            onCellChange: this._arena.onCellChange,
        }
    }
    public get bot() {
        return {
            level: this._bot.level,
            toggleLevel: this._bot.toggleLevel,
            onLevelToggle: this._bot.onLevelToggle,
        }
    }

    public move = (x: number, y: number) => {
        return () => {
            if (this._status.isPlayerNow && this._arena.get(x, y) === null && this._arena.canMove) {
                this._arena.move(x, y, this._status.side)
            }
        }
    }

    public start = () => {
        if (!this._status.isPlayerNow && this._arena.canMove) {

        }
    }

    public restart = () => {
        this._arena.drop()
        this._status.setGameResult(null)

        this._status.playerFirst = !this._status.playerFirst
        if (this._status.playerFirst) {
            if (!this._status.isPlayerNow) {
                this._status.toggleIsPlayerNow()
            }
        } else {
            if (this._status.isPlayerNow) {
                this._status.toggleIsPlayerNow()
                return
            }
            this._bot.makeMove(this._arena, this._status.side)
        }
    }

    constructor(config: Config) {
        const { status, bot, arena } = !!config
            ? config
            : {
                status: undefined,
                bot: undefined,
                arena: undefined,
            }


        this._status = new Status(status)
        this._bot = new Bot(bot)
        this._arena = new Arena(arena)

        this._arena.side = () => this._status.side


        this._arena.onMove.subscribe(() => {
            if (this._arena.canMove) {
                this._status.toggleIsPlayerNow()
            }

            this.onStateCreate.handle(this.state())
        })

        this._arena.onWin.subscribe(() => {
            this._status.mutateScore(1, 0)
            this._status.setGameResult('player')
            this.onStateCreate.handle(this.state())
        })

        this._arena.onLose.subscribe(() => {
            this._status.mutateScore(0, 1)
            this._status.setGameResult('bot')
            this.onStateCreate.handle(this.state())
        })

        this._arena.onDraw.subscribe(() => {
            this._status.setGameResult('draw')
            this.onStateCreate.handle(this.state())
        })


        this._status.onIsPlayerNowToggle.subscribe(value => {
            if (!value && this._arena.canMove) {
                this._bot.makeMove(this._arena, this._status.side)
            }
        })

        this._status.onGameResultChange.subscribe(() => this.onStateCreate.handle(this.state()))
        this._status.onScoreChange.subscribe(() => this.onStateCreate.handle(this.state()))
        this._status.onSideToggle.subscribe(() => this.onStateCreate.handle(this.state()))
        
        this._bot.onLevelToggle.subscribe(() => this.onStateCreate.handle(this.state()))
    }

    public state = (): Config => ({
        status: this._status.state(),
        bot: this._bot.state(),
        arena: this._arena.state(),
    })

    public onStateCreate = new GameSubscriber<Config>()
}

export default Game