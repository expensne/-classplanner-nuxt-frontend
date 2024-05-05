import type { $Fetch, FetchOptions } from "ofetch";

export default class FetchFactory {
    private fetcher: $Fetch;

    constructor(fetcher: $Fetch | any) {
        this.fetcher = fetcher;
    }

    /**
     * The HTTP client is utilized to control the process of making API requests.
     * @param method the HTTP method (GET, POST, ...)
     * @param url the endpoint url
     * @param data the body data
     * @param fetchOptions fetch options
     * @returns
     */
    async call(method: string, url: string, data?: object, fetchOptions?: FetchOptions<"json">): Promise<any> {
        return this.fetcher(url, {
            method,
            body: data,
            ...fetchOptions,
        });
    }
}
