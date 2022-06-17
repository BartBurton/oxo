import { GameSubscriber } from "game"
import { GameResult } from "types/GameResult"
import { Score } from "types/Score"
import { Side } from "types/Side"
import { revers } from "utils/side"


export type StatusConfig = {
    isPlayerNow: boolean
    score: Score
    side: Side
    gameResult: GameResult | null
} | undefined

class Status {
    private _isPlayerNow: boolean
    private _score: Score
    private _side: Side
    private _gameResult: GameResult | null

    public playerFirst = true
    public get isPlayerNow() { return this._isPlayerNow }
    public get score() { return this._score }
    public get side() { return this._side }
    public get gameResult() { return this._gameResult }

    public toggleIsPlayerNow = () => {
        this._isPlayerNow = !this._isPlayerNow
        this.onIsPlayerNowToggle.handle(this._isPlayerNow)
    }
    public mutateScore = (player: number = 0, bot: number = 0) => {
        this._score = {
            player: this._score.player + player,
            bot: this._score.bot + bot,
        }
        this.onScoreChange.handle(this._score)
    }
    public toggleSide = () => {
        this._side = revers(this._side)
        this.onSideToggle.handle(this._side)
    }
    public setGameResult = (value: GameResult | null) => {
        this._gameResult = value
        this.onGameResultChange.handle(this._gameResult)
    }


    constructor(config: StatusConfig) {
        const { isPlayerNow, score, side, gameResult } = !!config
            ? config
            : {
                isPlayerNow: undefined,
                score: undefined,
                side: undefined,
                gameResult: undefined,
            }

        this._isPlayerNow = isPlayerNow ? isPlayerNow : true
        this._score = score ? score : { player: 0, bot: 0 }
        this._side = side ? side : 'x'
        this._gameResult = gameResult ? gameResult : null
    }

    public onIsPlayerNowToggle = new GameSubscriber<boolean>()
    public onScoreChange = new GameSubscriber<Score>()
    public onSideToggle = new GameSubscriber<Side>()
    public onGameResultChange = new GameSubscriber<GameResult | null>()

    public state = (): StatusConfig => ({
        isPlayerNow: this._isPlayerNow,
        score: this._score,
        side: this._side,
        gameResult: this._gameResult,
    })
}

export default Status