import qs from 'qs';
import { HttpError } from '@/lib/network/request/errors/http-error';
import type { HttpRequest } from '@/lib/network/request/http-request';
import Interceptor from '@/lib/network/request/interceptor';
import { getErrorMessage } from '@/utils/CommonTools';

type MethodOptions = HttpRequest.IRequestMethodOptions;

export class HttpCore<RS, PRS = RS & { options: HttpRequest.IRequestOptions },> {
    /**
     * 拦截器
     * */
    public interceptor = {
        /** 请求拦截器 */
        request: new Interceptor<HttpRequest.IRequestOptions>(),
        /** 响应拦截器 */
        response: new Interceptor<PRS>(),
    };

    /**
     * 默认配置
     */
    public default: Partial<HttpRequest.IDefaultOptions> = {
        filterEmpty: true,
        timeout: 10000,
    };

    /**
     * 请求适配器，默认为Taro.request
     * @private
     */
    private readonly adaptor: (...args: any[]) => Promise<RS>;

    private constructor(adaptor: (...args: any[]) => Promise<RS>) {
        this.adaptor = adaptor;
    }

    /**
     * 创建一个Http请求实例对象
     * @param adaptor
     */
    public static create<R,>(adaptor: (...args: any[]) => Promise<R>) {
        if (!adaptor || typeof adaptor !== 'function')
            throw new TypeError('adaptor is not a function');

        return new HttpCore(adaptor);
    }

    /**
     * 发起通用请求
     * @param options
     */
    public request = (options: HttpRequest.IRequestOptions): Promise<PRS> => {
        /** 最终请求配置信息 */
        const finalOptions = {
            ...this.default, // 默认配置
            ...this.initRequestOptions(options), // 本次请求的配置，覆盖默认配置

        };
        if (!finalOptions.method)
            finalOptions.method = 'GET';

        let promise = Promise.resolve(finalOptions); // 链条第一环，传入请求配置信息

        // 连上请求拦截器
        this.interceptor.request.each((handle) => {
            // @ts-ignore
            promise = promise.then(handle.fulfilled, handle.rejected);
        });

        // 请求
        promise = promise.then(this.dispatchRequest.bind(this));

        // 连接上响应拦截器
        this.interceptor.response.each((handle) => {
            // @ts-ignore
            promise = promise.then(handle.fulfilled, handle.rejected);
        });

        // @ts-ignore
        return promise;
    };

    /**
     * 发起get请求
     * @param url
     * @param options
     */
    public get = (url: string, options?: MethodOptions): Promise<PRS> => {
        return this.request({
            ...options,
            url,
            method: 'GET',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用POST请求
     * @param url
     * @param options
     */
    public post = (url: string, options?: MethodOptions): Promise<PRS> => {
        return this.request({
            ...options,
            url,
            method: 'POST',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用PUT请求
     * @param url
     * @param options
     */
    public put = (url: string, options?: MethodOptions): Promise<PRS> => {
        return this.request({
            ...options,
            url,
            method: 'PUT',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用DELETE请求
     * @param url
     * @param options
     */
    public delete = (url: string, options?: MethodOptions): Promise<PRS> => {
        return this.request({
            ...options,
            url,
            method: 'DELETE',
        } as HttpRequest.IRequestOptions);
    };

    private initRequestOptions = (options: HttpRequest.IRequestOptions) => {
        const newOptions = Object.assign({}, options);

        const url = newOptions.url;

        newOptions.url = url.includes('://')
            ? url
            : (this.default?.baseUrl || '').concat(url);

        if (typeof newOptions.params === 'object') {
            const queryString = qs.stringify(newOptions.params);

            if (queryString.length > 0) {
                newOptions.url = newOptions.url
                    .concat(newOptions.url.endsWith('?') ? queryString : `?${queryString}`);
            }
        }

        return newOptions;
    };

    /**
     * 派发实际请求，通过提供的适配器
     * @param options
     * @private
     */
    private dispatchRequest = (options: HttpRequest.IRequestOptions): Promise<PRS | HttpError> => {
        return this.adaptor(options).then((res) => {
            return {
                ...res,
                options,
            } as PRS;
        }).catch((error) => {
            const httpError = new HttpError(getErrorMessage(error));
            httpError.options = options;
            return Promise.reject(httpError);
        });
    };
}
