import { showModal } from '@tarojs/taro';

interface APIOption<R, ER,> {
    success?: (r: R) => void
    fail?: (r: ER) => void
}

/**
 * 异常捕获方法
 * @param {Promise} promise
 * @returns
 */
export const to = async <T,>(promise: Promise<T>): Promise<[Error | any, T | null]> => {
    try {
        const res = await promise as T;
        return [null, res];
    } catch (error) {
        return [error, null];
    }
};

/**
 * node大哥提供的优秀promise转化方案
 * @param api
 */
export const promisify = <P extends object, R, ER,>(api: (option?: P & APIOption<R, ER>) => any) => {
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
};

/**
 * 将回调形式的异步方法转为Promise，对应的success回调会指向resolve，fail指向reject
 * @param method
 */
export const toPromise = <O extends object, R, ER,>(
    method: (options?: O & {
        success?: (r: R) => void
        fail?: (r: ER) => void
    }) => any
) => {
    return (options?: Omit<O, 'success' | 'fail'>) => {
        return new Promise<R>((resolve, reject) => {
            // @ts-ignore
            method({
                ...options,
                success: resolve,
                fail: reject,
            });
        });
    };
};

/**
 * 异步循环call
 * */
export const cycleCallAsync = (count: number, method: Function): Function => {
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
};

/**
 * 捕获异步函数错误，当然同步函数也支持，并showModal
 * @param func
 */
export const er = (func: (...args: any[]) => Promise<unknown> | any) => {
    return async (...args: any[]) => {
        try {
            return await func(...args);
        } catch (error) {
            // console.log(error instanceof Error);
            showModal({
                showCancel: false,
                content: error.toString(),
            });
        }
    };
};
