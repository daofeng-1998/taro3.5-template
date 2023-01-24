import { isNumber, isString } from '@/utils/TypeTools/TypesTools';

/**
 * 全局环境对象
 */
export const globalEnv = window || self;

/**
 * 格式化数字，默认保留两位小数
 * @param {int} number 欲处理的数字
 * @param {int} length 要保留的小数位长度
 * @returns {string}
 */
export function formatMoney(number: number, length = 2): string {
    // 有传递指定保留位数
    const numberStr = number.toFixed(length);

    const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return numberStr.replace(regForm, '$1,');
}

// 生成从minNum到maxNum的随机数
export function random(): number;
export function random(max: number): number;
export function random(min?: number, max?: number) {
    if (!isNumber(min)) min = 0;

    if (isNumber(max))
        return Math.floor(Math.random() * (max - min + 1) + min);
    else
        return Math.floor(Math.random() * min + 1);
}

export function getErrorMessage(error: string | Error | any): string {
    if (isString(error))
        return error;
    else if (error instanceof Error)
        return error.message;
    else if (Object.hasOwn(error, 'errMsg')) // 微信小程序错误信息
        return error.errMsg;
    else if (Object.hasOwn(error, 'errorMessage')) // 支付宝小程序错误信息
        return error.errorMessage;
    else
        return String(error);
}
