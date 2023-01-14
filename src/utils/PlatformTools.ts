import Taro from '@tarojs/taro';
import { globalEnv } from '@/utils/CommonTools';

export const exactTimeout = (func: Function, delay = 0): number => {
    return globalEnv.setTimeout(() => {
        func();
        const inner = setTimeout(() => clearTimeout(inner));
    }, delay);
};

/**
 * 精确不卡顿的定时任务
 * @param func
 * @param delay
 */
export const exactInterval = (func: Function, delay: number): number => {
    return globalEnv.setInterval(() => {
        func();
        const inner = setTimeout(() => clearTimeout(inner));
    }, delay);
};

export const getNodeInfo = (selector: string) => {
    return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve) => {
        Taro.nextTick(() => {
            const query = Taro.createSelectorQuery();

            query.select(selector).boundingClientRect((res) => {
                resolve(res);
            });
            query.exec();
        });
    });
};

/**
 * 独有的扫码方式
 * @returns {Promise<string>}
 */
export const uniqueScanCode = () => {
    return new Promise<string>((resolve, reject) => {
        Taro.scanCode({
            success: ({ result: code, }) => {
                if (code.includes('://') || code.includes('='))
                    code = /=(.*?)(?:&|$)/.exec(code)?.[1] || code;

                resolve(code);
            },
            fail: reject,
        });
    });
};
