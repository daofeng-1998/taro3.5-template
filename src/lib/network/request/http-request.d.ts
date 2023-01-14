export namespace HttpRequest {
    interface IAdaptor {
        (options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult>
    }

    /** 请求头 */
    interface IHeader {
        /** 请求内容类型 */
        'content-type',
    }

    type IAnyObject = Record<keyof IHeader | string, any>

    type Method = {
        /** HTTP 请求 OPTIONS */
        OPTIONS
        /** HTTP 请求 GET */
        GET
        /** HTTP 请求 HEAD */
        HEAD
        /** HTTP 请求 POST */
        POST
        /** HTTP 请求 PUT */
        PUT
        /** HTTP 请求 DELETE */
        DELETE
        /** HTTP 请求 TRACE */
        TRACE
        /** HTTP 请求 CONNECT */
        CONNECT
    }

    interface IBasicOptions {
        /** 超时时间 */
        timeout?: number,
        /** 请求头 */
        header?: IAnyObject,
        /** 请求方法 */
        method?: keyof Method,
        /** 过滤null和undefined */
        filterEmpty?: boolean,
        dataType?: 'json' | 'other'
    }

    interface IDefaultOptions extends IBasicOptions {
        baseUrl?: string,
    }

    interface IRequestOptions<U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any> extends IBasicOptions {
        url: string,
        data?: U,
        params?: object
    }

    interface IRequestMethodOptions extends Omit<IRequestOptions, 'method' | 'url'> {
    }


    interface IRequestResult {
        /** 错误信息 */
        errMsg: string
    }


    interface ISuccessResult<T extends string | TaroGeneral.IAnyObject | ArrayBuffer = any> extends IRequestResult {
        /** 开发者服务器返回的数据 */
        data: T
        /** 开发者服务器返回的 HTTP Response Header */
        header: IAnyObject
        /** 开发者服务器返回的 HTTP 状态码 */
        statusCode: number
        /** 调用结果 */
        errMsg: string
        /** cookies */
        cookies?: string[],
        /** 请求配置信息 */
        options?: IRequestOptions
    }

}
