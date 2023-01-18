
export class Middleware {
    private passable: any;
    constructor(
        private pipes: Array<Function>
    ) { }
    /**
     * 管道传递参数
     * @param passable
     */
    send<T>(passable: T): Middleware {
        this.passable = passable;
        return this;
    }
    /**
     * 管道执行
     * @param function destination 
     * @returns 
     */
    then(destination: Function) {
        this.pipes.reverse();
        const firstSlice = this.getInitialSlice(destination);
        let callable = this.pipes.reduce(this.getSlice(), firstSlice);
        return callable(this.passable);
    }

    protected getSlice() {
        return (stack: Function, pipe: Function) => {
            return (passable?: any) => pipe(passable, stack)
        }
    }

    protected getInitialSlice(destination: Function) {
        return (passable?: any) => destination(passable)
    }
}