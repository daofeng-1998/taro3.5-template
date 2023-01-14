import type { HttpRequest } from '@/lib/network/request/http-request';

declare type IRequestOptions = HttpRequest.IRequestOptions;

export class HttpError extends Error {
    options: IRequestOptions | undefined;
    name = 'HttpError';

    constructor(message, options?: IRequestOptions) {
        super(message);
        this.options = options;
    }
}
