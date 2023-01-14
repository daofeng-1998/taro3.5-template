import Taro from '@tarojs/taro';
import { promisify } from '@/utils/AsyncTool';
import { exactTimeout } from '@/utils/PlatformTools';

export const asyncRequest = promisify(Taro.request);

export const asyncGo = promisify(Taro.navigateTo);
export const asyncTab = promisify(Taro.switchTab);
export const asyncBack = promisify(Taro.navigateBack);
export const asyncRedirect = promisify(Taro.redirectTo);
export const asyncRelunch = promisify(Taro.reLaunch);

export const asyncSleep = (time: number) => {
    return new Promise((resolve) => {
        exactTimeout(resolve, time);
    });
};
