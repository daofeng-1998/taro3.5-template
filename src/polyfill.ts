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
