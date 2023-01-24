import { NavigateType, Router } from 'tarojs-router-next';
import type { NavigateOptions } from 'tarojs-router-next/src/router/type';

type options = Omit<NavigateOptions, 'type'>;

export function switchTab(url, options?: options) {
    return Router.navigate({ url }, {
        type: NavigateType.switchTab,
        ...options,
    });
}

export function navigateTo(url, options?: options) {
    return Router.navigate({ url }, {
        type: NavigateType.navigateTo,
        ...options,
    });
}

export function redirectTo(url, options?: options) {
    return Router.navigate({ url }, {
        type: NavigateType.redirectTo,
        ...options,
    });
}

export function reLaunch(url, options?: options) {
    return Router.navigate({ url }, {
        type: NavigateType.reLaunch,
        ...options,
    });
}

/**
 * 跳转tab优先
 * @param url
 * @param options
 */
export function switchAny(url: string, options?: options) {
    return switchTab(url, options)
        .catch(() => redirectTo(url, options))
        .catch(() => navigateTo(url, options));
}

/**
 * 重定向优先
 * @param url
 * @param options
 */
export function redirectAny(url: string, options?: options) {
    return redirectTo(url, options)
        .catch(() => switchTab(url, options))
        .catch(() => navigateTo(url, options));
}

/**
 * 普通导航优先
 * @param url
 * @param options
 */
export function navigateAny(url: string, options?: options) {
    return navigateTo(url, options)
        .catch(() => switchTab(url, options))
        .catch(() => redirectTo(url, options));
}
