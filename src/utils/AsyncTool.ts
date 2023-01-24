interface APIOption<R, ER,> {
    success?: (r: R) => void
    fail?: (r: ER) => void
}

/**
 * 异常捕获方法
 * @param {Promise} promise
 * @returns
 */
export async function to<T,>(promise: Promise<T>): Promise<[Error | any, T | null]> {
    try {
        const res = await promise as T;
        return [null, res];
    } catch (error) {
        return [error, null];
    }
}

/**
 * node大哥提供的优秀promise转化方案
 * @param api
 */
export function promisify<P extends object, R, ER,>(api: (option?: P & APIOption<R, ER>) => any) {
    return (options?: Omit<P, 'success' | 'fail'>) => {
        return new Promise<R>((resolve, reject) => {
            // @ts-ignore
            api({
                ...options,
                success: resolve,
                fail: reject,
            });
        });
    };
}

/**
 * 异步循环call
 * */
export function cycleCallAsync(count: number, method: Function): Function {
    return async function (...args) {
        let counter = 0;
        do {
            const [err, res] = await to(method(...args));
            if (err) {
                if (++counter >= count)
                    throw err;
            } else {
                return res;
            }
        } while (true);
    };
}
