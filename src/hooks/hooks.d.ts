import { FormRules } from '@/lib/form-validator/types';

declare type Data = Record<string, unknown>;

declare type Func = (...args: any) => any;


export interface FormDataOptions<T> {
    /** 默认值 */
    default: T | (() => T)
    rules?: FormRules<T> | FormRules<T>[]

}

declare type DataTypeFactory<T> = T extends Func ? () => T : T;

declare type DataType<T> = T extends { default: infer DT } ? DataTypeFactory<DT> : DataTypeFactory<T>;

/** useForm 表单数据配置对象 */
export declare type useFormOptions<T = Data> = {
    [K in keyof T]: T[K] | (() => T[K]) | FormDataOptions<T[K]>
};

/** 表单数据对象 */
export declare type FormData<P = Record<string, any>> = {
    [K in keyof P]: DataType<P[K]>
};

