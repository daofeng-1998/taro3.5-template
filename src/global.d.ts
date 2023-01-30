import { NavigateOptions } from "tarojs-router-next/src/router/type";

interface RouterFunc {
    (url: string, options?: Omit<NavigateOptions, 'type'>): Promise<any>;
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        navigateAny: RouterFunc,
        redirectAny: RouterFunc,
        switchAny: RouterFunc
    }
}

declare module 'dayjs' {
    interface Dayjs {
        formatDate(template?: string): string;

        formatTime(template?: string): string;
    }
}
