// export type RuleType =
//     | 'string'
//     | 'number'
//     | 'boolean'
//     | 'method'
//     | 'regexp'
//     | 'integer'
//     | 'float'
//     | 'array'
//     | 'object'
//     | 'enum'
//     | 'date'
//     | 'url'
//     | 'hex'
//     | 'email'
//     | 'pattern'
//     | 'any';

export type RuleType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'pattern'
    | 'any';

export interface FormRules<T> {
    /** 校验类型 */
    type?: keyof RuleType
    /** Number最小值 */
    min?: number
    /** Number最大值 */
    max?: number
    /** 必须：判断是否为undefined、null、NaN */
    required?: boolean
    /** 长度：支持字符串、数组 */
    len?: number,
    /** 错误消息 */
    msg?: string,
    /** 校验器 */
    asyncValidator?: (value: T) => boolean
}
