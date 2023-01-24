import type { HttpRequest } from '@/lib/network/request/http-request';

declare type IRequestOptions = HttpRequest.IRequestOptions;

export class HttpError extends Error {
    options?: IRequestOptions;
    name = 'HttpError';

    constructor(message, options?: IRequestOptions) {
        super(message);
        this.options = options;
    }
}
