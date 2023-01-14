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
