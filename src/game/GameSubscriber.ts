class GameSubscriber<T> {
    private _key: number = 0
    private _subscribers: Map<number, (v: T) => void> = new Map()

    public subscribe = (handler: (v: T) => void) => {
        this._key += 0.0000001
        this._subscribers.set(this._key, handler)
        return this._key
    }
    public unsubscribe = (key: number) => {
        return this._subscribers.delete(key)
    }
    public handle = (value: T) => {
        this._subscribers.forEach(v => {
            v(value)
        })
    }
}

export default GameSubscriber