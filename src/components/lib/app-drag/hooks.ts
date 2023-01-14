import { inject } from 'vue';

export const useDragArea = (tag) => {
    const defaultObj = {
        dragAreaInfo: {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        },
        refresh: () => {
        },
    };

    // 容器信息
    return inject<{
        dragAreaInfo: {
            top: number
            left: number
            width: number
            height: number
        }
        refresh: Function
    }>(tag) ?? defaultObj;
};
