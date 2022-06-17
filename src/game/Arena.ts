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

const COUNT = 3

export type ArenaConfig = {
    cells: (Side | null)[][]
    canMove: boolean
} | undefined

class Arena {
    private _cells: Cell[][] = []

    public side: () => Side = () => 'x'

    private _canMove: boolean = true
    public get canMove() {
        return this._canMove
    }

    public get size() {
        return {
            x: this._cells.length,
            y: this._cells[0].length
        }
    }

    constructor(config: ArenaConfig) {
        const { cells, canMove } = !!config
        ? config
        : {
            cells: undefined,
            canMove: undefined,
        }

        this._canMove = canMove ? canMove : true

        for (let i = 0; i < COUNT; i++) {
            this._cells.push([])
            for (let j = 0; j < COUNT; j++) {
                this._cells[i].push(new Cell())
                this._cells[i][j].value = cells ? cells[i][j] : null
            }
        }

        this.onMove.subscribe(this.moveHandle)
    }

    public state = (): ArenaConfig => ({
        cells: this._cells.map(r => r.map(c => c.value)),
        canMove: this._canMove,
    })



    public get = (x: number, y: number) => {
        return this._cells[x][y].value
    }

    public move = (x: number, y: number, value: Side) => {
        this._cells[x][y].value = value
        this.onMove.handle()
    }

    public moveHandle = () => {
        let h: boolean, v: boolean, d: boolean, dr: boolean

        for (let i = 0; i < COUNT; i++) {
            h = v = true

            for (let j = 1; j < COUNT; j++) {
                if (this._cells[i][j - 1].value === null) {
                    h = false
                }
                h = h && this._cells[i][j - 1].value === this._cells[i][j].value

                if (this._cells[j - 1][i].value === null) {
                    v = false
                }
                v = v && this._cells[j - 1][i].value === this._cells[j][i].value
            }

            if (h || v) {
                this._canMove = false
                if (this.side() === this._cells[i][i].value) {
                    this.onWin.handle()
                } else {
                    this.onLose.handle()
                }
                return
            }
        }

        d = dr = true
        for (let i = 1; i < COUNT; i++) {
            if (this._cells[i - 1][i - 1].value === null) {
                d = false
            }
            d = d && this._cells[i - 1][i - 1].value === this._cells[i][i].value

            if (this._cells[i - 1][COUNT - i].value === null) {
                dr = false
            }
            dr = dr && this._cells[i - 1][COUNT - i].value === this._cells[i][COUNT - (i + 1)].value
        }
        if (d || dr) {
            this._canMove = false
            if (this.side() === this._cells[Math.floor(COUNT / 2)][Math.floor(COUNT / 2)].value) {
                this.onWin.handle()
            } else {
                this.onLose.handle()
            }
            return
        }


        if (this._cells.every(r => r.every(c => c.value !== null))) {
            this._canMove = false
            this.onDraw.handle()
        }
    }


    public onMove = new GameSubscriber<void>()
    public onWin = new GameSubscriber<void>()
    public onLose = new GameSubscriber<void>()
    public onDraw = new GameSubscriber<void>()
    public onCellChange = (x: number, y: number) => this._cells[x][y].onCellChange


    public drop = () => {
        for (let i = 0; i < COUNT; i++) {
            for (let j = 0; j < COUNT; j++) {
                this._cells[i][j].value = null
            }
        }
        this._canMove = true
    }
}

export default Arena
