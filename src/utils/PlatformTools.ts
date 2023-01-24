import Taro from '@tarojs/taro';

export function getNodeInfo(selector: string) {
    return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve) => {
        Taro.nextTick(() => {
            const query = Taro.createSelectorQuery();

            query.select(selector).boundingClientRect((res) => {
                resolve(res);
            });
            query.exec();
        });
    });
}

/**
 * 独有的扫码方式
 * @returns {Promise<string>}
 */
export function uniqueScanCode() {
    return new Promise<string>((resolve, reject) => {
        Taro.scanCode({
            success: ({ result: code }) => {
                if (code.includes('://') || code.includes('='))
                    code = /=(.*?)(?:&|$)/.exec(code)?.[1] || code;

                resolve(code);
            },
            fail: reject,
        });
    });
}
