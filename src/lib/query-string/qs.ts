import type { IQsStringifyOptions } from './query-string';
import { isEmptyObject } from '@/utils/TypeTools/ObjectTools';

export default {
    stringify(obj: object, options: IQsStringifyOptions = {}): string {
        // 处理配置信息
        const finalOptions = Object.assign<IQsStringifyOptions, any>({
            filterEmpty: true,
            urlEncoding: true,
        }, options); // 自定义配置覆盖默认配置

        if (!isEmptyObject(obj)) {
            const paramsArr: string[] = [];

            // @ts-ignore 上面已经判断它不会为空对象了
            Object.keys(obj).forEach((key) => {
                const ele = obj[key];

                if (ele === undefined || ele === null) {
                    finalOptions?.filterEmpty && paramsArr.push(`${key}=`);
                } else {
                    let eleStr = ele;
                    if (typeof ele === 'object')
                        eleStr = JSON.stringify(eleStr);

                    paramsArr.push(`${key}=${encodeURIComponent(eleStr)}`);
                }
            });

            if (paramsArr.length > 0)
                return paramsArr.join('&');
        }
        return '';
    },
};
