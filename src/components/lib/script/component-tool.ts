import Taro from '@tarojs/taro';
import type { Ref } from 'vue';
import { ref } from 'vue';

export const inject = <R,>(key: string | symbol): R => {
    return Taro.getCurrentInstance().page?.[key] as R;
};

export const provide = (key: string | symbol, data: any) => {
    const page = Taro.getCurrentInstance().page;
    if (page)
        page[key] = data;
};

/** 从当前实例取出数据，如果当前实例没有该数据，则产生一个默认数据并注入当前实例 */
export const useInstanceDataWithDefault = <T,>(
    key: string | symbol,
    defaultSate: () => T
) => {
    let state = inject<Ref<T>>(key);

    if (!state) {
        state = ref(defaultSate()) as Ref<T>;
        provide(key, state);
    }
    return state;
};
