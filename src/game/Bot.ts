import { GameSubscriber } from "game"
import { Level } from "types/Level"

class Bot {
    private _level: Level
    public get level() { return this._level }
    
    public toggleLevel = () => {
        this._level = this._level === 'easy'
            ? 'middle'
            : this._level === 'middle'
                ? 'hard'
                : 'easy'
        this.onLevelToggle.handle(this._level)
    }

    constructor() {
        this._level = 'easy'
    }
    
    public onLevelToggle = new GameSubscriber<Level>()
}

export default Bot