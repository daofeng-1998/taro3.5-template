/**
 * 基本数据类型
 */
export const BASE_TYPE_ARRAY = ['string', 'number', 'boolean', 'undefined', 'symbol', 'null'];
export type BASE_TYPE = string | number | boolean | undefined | symbol | null;

/**
 * 是否为基础数据类型
 * @param value
 */
export function isBaseType(value: any): value is BASE_TYPE {
    return value == null ? true : BASE_TYPE_ARRAY.includes(typeof value);
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}

export function isSymbol(value: any): value is symbol {
    return typeof value === 'symbol';
}

export function isUndefined(value: any): value is undefined {
    return value === undefined;
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isNullOrUndefined(value: any): value is null | undefined {
    return isNull(value) || isUndefined(value);
}

/**
 * 判断多个数据类型是否一致
 * @param target
 * @param objects
 */
export function isFamily(target: any, ...objects: any[]): boolean {
    if (objects.length === 0)
        return true;

    const base = isNull(target) ? 'null' : typeof target;

    return objects.every((item) => {
        return base === (isNull(item) ? 'null' : typeof item);
    });
}
