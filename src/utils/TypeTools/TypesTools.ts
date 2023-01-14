/**
 * 基本数据类型
 */
export const BASE_TYPE_ARRAY = ['string', 'number', 'boolean', 'undefined', 'symbol', 'null'];
export type BASE_TYPE = string | number | boolean | undefined | symbol | null;

/**
 * 是否为基础数据类型
 * @param value
 */
export const isBaseType = (value: any): value is BASE_TYPE => {
    return value == null ? true : BASE_TYPE_ARRAY.includes(typeof value);
};

export const isString = (value: any): value is string => typeof value === 'string';

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isSymbol = (value: any): value is symbol => typeof value === 'symbol';

export const isUndefined = (value: any): value is undefined => value === undefined;

export const isNull = (value: any): value is null => value === null;

export const isNullOrUndefined = (value: any): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};

/**
 * 判断多个数据类型是否一致
 * @param target
 * @param objects
 */
export const isFamily = (target: any, ...objects: any[]): boolean => {
    if (objects.length === 0)
        return true;

    const base = isNull(target) ? 'null' : typeof target;

    return objects.every((item) => {
        return base === (isNull(item) ? 'null' : typeof item);
    });
};
