function createRef<T>(): RefObject<T>

// react.d.ts
interface RefObject<T> {
    // immutable
    readonly current: T | null
}