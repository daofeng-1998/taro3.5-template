interface InterceptorHandle<R,> {
    fulfilled: (option: R) => any
    rejected?: Function
}

class Interceptor<R,> {
    private handles: InterceptorHandle<R>[] = [];

    public use(fulfilled: (option: R) => any, rejected?: Function): void {
        const handle: InterceptorHandle<R> = {
            fulfilled,
            rejected,
        };
        this.handles.push(handle);
    }

    public each(fn: (handle: InterceptorHandle<R>) => void) {
        this.handles.forEach(fn);
    }
}

export default Interceptor;
