import type { ComputedRef, Ref, UnwrapNestedRefs } from 'vue';
import { computed, customRef, reactive, ref } from 'vue';
import type { FormData, useFormOptions } from '@/hooks/hooks';
import { mergeFunc } from '@/utils/TypeTools/FunctionTools';
import { BASE_TYPE_ARRAY } from '@/utils/TypeTools/TypesTools';

export const useVModel = <T,>(props: Object, key: string, emit: Function) => {
    return computed<T>({
        get: () => props[key],
        set: val => emit(`update:${key}`, val),
    });
};

/**
 * 对数组求和
 * @param list
 * @param field
 */
export const useSumForList = <T,>(
    list: T[],
    field?: keyof T | ((item: T) => number)
): ComputedRef<number> => {
    const isFunc = typeof field === 'function';
    const isEmpty = !!field;

    return computed(() => {
        const arr = targetIsFunc ? list() : list;
        return arr
            .reduce((pre, item) => {
                // @ts-ignore
                return Decimal.add(pre, isFunc ? field(item) : isEmpty ? item : item[field]);
            }, new Decimal(0))
            .toNumber();
    });
};

/**
 * 使用一个表单数据对象
 * @param newData
 */
export const useFormData = <D extends object, R,>(newData: () => D): [UnwrapNestedRefs<D>, () => void, Ref<R | null>] => {
    const data = reactive(newData());

    const reset = () => {
        Object.assign(data, newData());
    };
    return [data, reset, ref(null)];
};

export const useForm = <F extends object,>(data: useFormOptions<F>): [UnwrapNestedRefs<FormData<F>>, () => void] => {
    // 基本数据类型 + function
    const dataTypes = BASE_TYPE_ARRAY.concat('function');

    /** 获取新的数据 */
    const getDefaultValue = (ele) => {
        if (BASE_TYPE_ARRAY.includes(typeof ele))
            return ele; // 基础类型，直接返回
        else if (typeof ele === 'function')
            return ele(); // 数据工厂，调用获取新的值
        else
            return undefined; // 空
    };

    const newData = () => {
        const newObj = {};
        for (const key in data) {
            const type = typeof data[key]; // 当前成员类型

            if (dataTypes.includes(type)) {
                // @ts-ignore
                newObj[key] = getDefaultValue(data[key]);
            } else {
                // @ts-ignore
                newObj[key] = getDefaultValue(data[key].default);
            }
        }
        return newObj;
    };

    const formData = reactive(newData());

    /** 重置表单数据 */
    const reset = () => {
        Object.assign(formData, newData());
    };

    // @ts-ignore
    return [formData, reset];
};

/**
 * 创建一个受控ref
 * @param value
 */
export const useDelayRef = <T,>(value: T): [Ref<T>, () => void] => {
    let update;

    const state = customRef<T>((track, trigger) => {
        update = trigger;
        return {
            get: mergeFunc<T>(track, () => value),
            set: newValue => value = newValue,
        };
    });

    return [state, update];
};
