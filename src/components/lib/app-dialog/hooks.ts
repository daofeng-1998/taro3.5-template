import type { Ref } from 'vue';
import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG } from '@/components/lib/script/Symbols';
import { mergeFunc } from '@/utils/TypeTools/FunctionTools';

export const newDialogState = () => ({
    activated: false,
    title: '',
    titleColor: '',
    content: '',
    contentColor: '',
    contentType: 'TEXT',
    show: false,
    showCancel: false,
    cancelText: '取消',
    cancelColor: undefined,
    confirmColor: undefined,
    confirmText: '确定',
    disableConfirm: false,
    disableCancel: false,
    onConfirm: undefined,
    onCancel: undefined,
});

export const useDialog = (): IDialogControl => {
    const state: Ref<IDialogSync> = useComponentState<IDialogSync>(SYMBOL_DIALOG);

    /**
     * 更改dialog状态
     * @param newState
     */
    const setState = (newState: Partial<IDialogBase>) => {
        Object.assign(state.value, newState);
    };

    const close = () => {
        state.value.show = false;
        // setTimeout(() => {
        //     Object.assign<any, any, Partial<IDialogSync>>(state.value, newDialogState(), {
        //         activated: true,
        //         show: false,
        //     });
        // }, 500);
    };

    const show = (options: IDialogBase) => {
        return new Promise<boolean>((resolve) => {
            Object.assign<any, any, IDialogSync>(
                state.value,
                newDialogState(), // 复制到一个新的状态对象，实现覆盖之前的状态信息，使之处于最干净的状态
                {
                    ...options,
                    activated: true,
                    show: true,
                    onConfirm: mergeFunc(close, () => resolve(true)),
                    onCancel: mergeFunc(close, () => resolve(false)),
                }
            );
        });
    };

    const showContent = (content: string, title?: string) => {
        return show({
            content,
            title,
            showCancel: false,
            contentType: 'TEXT',
            confirmText: '确定',
        });
    };

    const showCancel = (content: string, title?: string) => {
        return show({
            contentType: 'TEXT',
            content,
            title,
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
        });
    };

    return {
        show,
        close,
        setState,
        showCancel,
        showContent,
    };
};
