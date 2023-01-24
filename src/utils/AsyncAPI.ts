import Taro from '@tarojs/taro';
import { promisify } from '@/utils/AsyncTool';

export const asyncRequest = promisify(Taro.request);

export const asyncGo = promisify(Taro.navigateTo);
export const asyncTab = promisify(Taro.switchTab);
export const asyncBack = promisify(Taro.navigateBack);
export const asyncRedirect = promisify(Taro.redirectTo);
export const asyncRelunch = promisify(Taro.reLaunch);

export function asyncSleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
