const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export class Request {
    /**
     * Creates an instance of Request.
     *
     * @param {string} method - Connection method (eg GET, POST).
     * @param {string} url - URL for the connection.
     * @param {Object} [headers] - optional object containing the headers for the requests in form of key(value).
     * @param {string} [body] - optional payload of the request.
     */
    constructor(private method: string,
                private url: string,
                private headers?: Object,
                private body?: string) { }

    /**
     * Executes the instantiated request
     *
     * @returns {Promise<any>} - returns the response object
     */
    execute(): Promise<any> {
        const promiseExecutor = (resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(this.method, this.url, true);
            xhr.addEventListener("load", () => {
                if (Request.isRequestSuccessful(xhr.status)) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            });

            if (this.headers) {
                Object.keys(this.headers)
                    .map(header => xhr.setRequestHeader(header, this.headers[header]));
            }

            xhr.send(this.body);
        };

        return new Promise(promiseExecutor);
    }

    /**
     *  Checks if response status code is starting with 2**
     *
     * @static
     * @param {number} statusCode
     * @returns {boolean}
     */
    static isRequestSuccessful(statusCode: number): boolean {
        return Math.floor(statusCode / 100) === 2;
    }
}
