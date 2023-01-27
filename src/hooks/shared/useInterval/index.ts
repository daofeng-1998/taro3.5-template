import { ref } from 'vue';
import { isFunction } from '@tarojs/shared';
import { isNullOrUndefined } from '@/utils/TypeTools/TypesTools';

export interface useIntervalOptions {
    immediate?: boolean
    immediateCallback?: boolean
}

export function useInterval(
    cb: (...args: any[]) => any,
    interval = 1000,
    options: useIntervalOptions = {
        immediate: false,
        immediateCallback: false,
    }
) {
    const isActive = ref(false);
    let timer: ReturnType<typeof setInterval> | null = null;

    if (!isFunction(cb))
        throw new TypeError('cb must be a function');

    options?.immediateCallback && cb();

    const clear = () => {
        if (!isNullOrUndefined(timer)) {
            clearInterval(timer);
            timer = null;
        }
    };

    const pause = () => {
        isActive.value = false;
        clear();
    };

    const resume = () => {
        if (interval <= 0) return;
        if (options?.immediate) cb();
        isActive.value = true;
        clear();
        timer = setInterval(cb, interval);
    };

    return {
        isActive,
        pause,
        resume,
    };
}
