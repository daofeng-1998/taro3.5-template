import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_NOTIFY } from '@/components/lib/script/Symbols';
import { isNumber } from '@/utils/TypeTools/TypesTools';

export const newNotifyState = (): INotifyState => ({
    show: false,
    msg: '',
    activated: false,
    duration: 2500,
    type: 'info',
});

declare type Options = Omit<INotifyState, 'show' | 'activated'>;
declare type notifyParam = Omit<Options, 'type'> | string;

let timeout;

export const useNotify = () => {
    const state = useComponentState<INotifyState>(SYMBOL_NOTIFY);

    const hide = () => {
        state.value.show = false;
    };

    const show = (options: Options) => {
        Object.assign<any, Partial<INotifyState>, any, Partial<INotifyState>>(
            state.value,
            newNotifyState(),
            options,
            {
                show: true,
                activated: true,
            }
        );

        // 清除放在外面，确保需要手动关闭的不会被其他调用者关闭
        clearTimeout(timeout);

        // @ts-ignore 校验函数已经确定一定是number
        if (isNumber(state.value.duration) && state.value.duration > 0)
            timeout = setTimeout(hide, state.value.duration);
    };

    const info = (options: notifyParam) => {
        const o = typeof options === 'string'
            ? { msg: options }
            : options;

        show({
            ...o,
            type: 'info',
        });
    };

    const success = (options: notifyParam) => {
        const o = typeof options === 'string'
            ? { msg: options }
            : options;

        show({
            ...o,
            type: 'success',
        });
    };

    const danger = (options: notifyParam) => {
        const o = typeof options === 'string'
            ? { msg: options }
            : options;
        show({
            ...o,
            type: 'danger',
        });
    };

    const warning = (options: notifyParam) => {
        const o = typeof options === 'string'
            ? { msg: options }
            : options;
        show({
            ...o,
            type: 'warning',
        });
    };

    return {
        hide,
        show,
        info,
        success,
        danger,
        warning,
    };
};
