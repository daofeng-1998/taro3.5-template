import { isFunction } from '@tarojs/shared';

if (!isFunction(Object.hasOwn)) {
    Object.hasOwn = function (o: object, key: PropertyKey): boolean {
        return Object.prototype.hasOwnProperty.call(o, key);
    };
}

// 给console的全部函数挂钩子，使其在生产模式下失效
(function () {
    const logger = { ...console };

    Object.keys(logger).forEach((key) => {
        if (isFunction(logger[key])) {
            console[key] = function (...args: any[]) {
                if (process.env.NODE_ENV === 'development')
                    logger[key](...args);
            };
        }
    });
})();

// TODO 处理Taro在微信小程序端的setTimeout和setInterval卡顿问题
if (process.env.TARO_ENV === 'weapp') {
    const _setTimeout = setTimeout;
    const _setInterval = setInterval;

    type _typeTimeout = typeof _setTimeout;
    type _typeInterval = typeof _setInterval;

    // @ts-ignore
    setTimeout = function (...args: Parameters<_typeTimeout>): ReturnType<_typeTimeout> {
        return _setTimeout((...innerArgs: any[]) => {
            if (isFunction(args[0]))
                args[0](...innerArgs);
            else
                throw new TypeError('setTimeout expects a function as first argument but got string.');

            const inner = _setTimeout(() => clearTimeout(inner));
        }, args[1], args.slice(2));
    };

    // @ts-ignore
    setInterval = function (...args: Parameters<_typeInterval>): ReturnType<_typeInterval> {
        return _setInterval((...innerArgs: any[]) => {
            if (isFunction(args[0]))
                args[0](...innerArgs);
            else
                throw new TypeError('setInterval expects a function as first argument but got string.');

            const inner = _setTimeout(() => clearTimeout(inner));
        }, args[1], args.slice(2));
    };
}
