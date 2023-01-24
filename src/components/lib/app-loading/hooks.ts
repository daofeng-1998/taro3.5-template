import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_LOADING } from '@/components/lib/script/Symbols';

export const newLoadingState = () => ({
    show: false,
    activated: false,
    msg: '',
});

export const useLoading = () => {
    const state = useComponentState<ILoadingState>(SYMBOL_LOADING);

    const show = (msg?: string) => {
        if (!state?.value)
            return;

        Object.assign(state.value, {
            msg,
            activated: true,
            show: true,
        });
    };
    const hide = () => {
        if (!state?.value)
            return;

        Object.assign(state.value, {
            msg: '',
            show: false,
        });
    };

    /** 带loading的call */
    const callAsync = async <R, P extends Array<any>,>(
        func: (...args: P) => Promise<R>,
        ...args: P
    ): Promise<R> => {
        try {
            show();
            return await func(...args);
        } finally {
            hide();
        }
    };

    /** 即时启动的loading包装器 */
    const wrapAsync = <P extends Array<any>, R,>(func: (...args: P) => Promise<R>) => {
        return (...args: P) => callAsync(func, ...args);
    };

    /** 延迟启动的loading包装器 */
    const wrapDelayAsync = <P extends Array<any>, R,>(
        func: (...args: P) => Promise<R>,
        delay = 100
    ) => {
        return async function (...args: P) {
            const timer = setTimeout(show, delay);
            try {
                return await func(...args);
            } finally {
                clearTimeout(timer);
                hide();
            }
        };
    };

    return {
        show,
        hide,
        callAsync,
        wrapDelayAsync,
        wrapAsync,
    };
};
