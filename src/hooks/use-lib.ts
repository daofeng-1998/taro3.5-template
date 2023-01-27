import type { ComputedRef, Ref, UnwrapNestedRefs } from 'vue';
import { computed, customRef, reactive, ref, toRefs } from 'vue';
import Decimal from 'decimal.js';
import type { Data, FormData, useFormOptions } from '@/hooks/hooks';
import { mergeFunc } from '@/utils/TypeTools/FunctionTools';
import { BASE_TYPE_ARRAY, isNullOrUndefined } from '@/utils/TypeTools/TypesTools';
import { useInterval } from '@/hooks/shared/useInterval';

export function useVModel<P extends Data, >(props: P, key: keyof P, emit: Function) {
    return computed({
        get: () => props[key],
        set: val => emit(`update:${String(key)}`, val),
    });
}

/**
 * 对数组求和
 * @param list
 * @param field
 */
export function useSumForList<T,>(
    list: T[] | (() => T[]),
    field?: keyof T | ((item: T) => number)
): ComputedRef<number> {
    const targetIsFunc = typeof list === 'function';
    const isFunc = typeof field === 'function';
    const isEmpty = isNullOrUndefined(field);

    return computed(() => {
        const arr = targetIsFunc ? list() : list;
        return arr
            .reduce((pre, item) => {
                // @ts-ignore
                return Decimal.add(pre, isFunc ? field(item) : isEmpty ? item : item[field]);
            }, new Decimal(0))
            .toNumber();
    });
}

/**
 * 使用一个表单数据对象
 * @param newData
 */
export function useFormData<D extends object, R, >(newData: () => D): [UnwrapNestedRefs<D>, () => void, Ref<R | null>] {
    const data = reactive(newData());

    const reset = () => Object.assign(data, newData());

    return [data, reset, ref(null)];
}

export function useForm<F extends object, >(data: useFormOptions<F>): [UnwrapNestedRefs<FormData<F>>, () => void] {
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
}

/**
 * 创建一个受控ref
 * @param value
 */
export function useDelayRef<T, >(value: T): [Ref<T>, () => void] {
    let update;

    const state = customRef<T>((track, trigger) => {
        update = trigger;
        return {
            get: mergeFunc<T>(track, () => value),
            set: newValue => value = newValue,
        };
    });

    return [state, update];
}

export function useCountDown(interval = 1000) {
    const state = reactive({
        count: 0,
    });

    const { isActive, resume, pause } = useInterval(() => {
        --state.count <= 0 && pause();
    }, interval);

    const action = (count: number) => {
        if (isActive.value || count <= 0) return;
        isActive.value = true;
        state.count = count;

        resume();
    };

    return {
        isActive,
        ...toRefs(state),
        action,
    };
}
