import { Side } from "types/Side";
import GameSubscriber from "./GameSubscriber";

class Cell {
    private _value: Side | null = null

    public get value() {
        return this._value
    }
    public set value(v: Side | null) {
        this._value = v
        this.onCellChange.handle(this._value)
    }

    public onCellChange = new GameSubscriber<Side | null>()
}


class Arena {
    private _cells: Cell[][] = []
    constructor() {
        for (let i = 0; i < 3; i++) {
            this._cells.push([])
            for (let j = 0; j < 3; j++) {
                this._cells[i].push(new Cell())
            }
        }
    }

    public get size() {
        return {
            x: this._cells.length,
            y: this._cells[0].length
        }
    }

    
    public get = (x: number, y: number) => {
        return this._cells[x][y].value
    }

    public set = (x: number, y: number, value: Side) => {
        this._cells[x][y].value = value
    }


    public onCellChange = (x: number, y: number) => this._cells[x][y].onCellChange


    public drop = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this._cells[i][j].value = null
            }
        }
    }
}

export default Arena
