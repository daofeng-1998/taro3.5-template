import type { Ref } from 'vue';
import { useInstanceDataWithDefault } from '@/components/lib/script/component-tool';
import { SYMBOL_DIALOG, SYMBOL_LOADING, SYMBOL_NOTIFY } from '@/components/lib/script/Symbols';
import { newLoadingState } from '@/components/lib/app-loading/hooks';
import { newDialogState } from '@/components/lib/app-dialog/hooks';
import { newNotifyState } from '@/components/lib/app-notify/hooks';

/**
 * 状态容器
 */
const states = {
    [SYMBOL_DIALOG]: newDialogState,
    [SYMBOL_LOADING]: newLoadingState,
    [SYMBOL_NOTIFY]: newNotifyState,
};

/**
 * 设置一个新状态工厂函数
 * @param key
 * @param dataMethod
 */
export const setNewState = (key: string | symbol, dataMethod: Function): void => {
    states[key] = dataMethod;
};

/**
 * 通过工厂函数获取一个新状态
 * @param key
 */
export const getNewState = <T,>(key: string | symbol): T => {
    return states[key]() as T;
};

/**
 * 使用当前实例的状态，如果没有，则创建一个新的状态并注入并返回
 * @param key
 */
export const useComponentState = <T,>(key: string | symbol): Ref<T> => {
    return useInstanceDataWithDefault<T>(key, states[key]);
};
