import { HttpCore } from '@/lib/network/request/http-core';
import { asyncRequest } from '@/utils/AsyncAPI';
import type { HttpRequest } from '@/lib/network/request/http-request';

const http = HttpCore.create(asyncRequest as HttpRequest.IAdaptor);

http.default = {
    baseUrl: 'https://a.bioshinecn.cn/Services',
    filterEmpty: false,
};

http.interceptor.request.use((options: HttpRequest.IRequestOptions) => {
    if (options.method === 'POST') {
        if (!options.header)
            options.header = {};

        Object.assign(options.header, {
            'content-type': 'application/x-www-form-urlencoded',
        });
    }

    return options;
});

http.interceptor.response.use((response: HttpRequest.ISuccessResult) => {
    if (typeof response.data === 'string') {
        if (response.data.includes('</string>')) {
            try {
                const jsonStr = /<string.*?>(.*)<\/string>/.exec(response.data)?.[1];
                if (jsonStr)
                    response.data = JSON.parse(jsonStr);
            } catch {
                // JSON解析失败不做任何处理
            }
        }
    }
    return response;
});

export default http;
