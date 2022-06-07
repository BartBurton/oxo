import { GameSubscriber } from "game"
import { Score } from "types/Score"
import { Side } from "types/Side"

class Status {
    private _isPlayerNow: boolean
    private _score: Score
    private _side: Side

    public get isPlayerNow() { return this._isPlayerNow }
    public get score() { return this._score }
    public get side() { return this._side }

    public toggleIsPlayerNow = () => {
        this._isPlayerNow = !this._isPlayerNow
        this.onIsPlayerNowToggle.handle(this._isPlayerNow)
    }
    public changeScore = (v: Score) => {
        this._score = v
        this.onScoreChange.handle(this._score)
    }
    public toggleSide = () => {
        this._side = this._side === 'x' ? 'o' : 'x'
        this.onSideToggle.handle(this._side)
    }

    constructor() {
        this._isPlayerNow = true
        this._score = { player: 0, bot: 0 }
        this._side = 'x'
    }

    public onIsPlayerNowToggle = new GameSubscriber<boolean>()
    public onScoreChange = new GameSubscriber<Score>()
    public onSideToggle = new GameSubscriber<Side>()
}

export default Status