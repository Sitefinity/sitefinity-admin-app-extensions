/* tslint:disable:no-console */
import SitefinitySdk from "./sitefinitySdk";
import { Request } from "./request";
import { browser } from "protractor";
import { URL_IN_CONFIG_FILE, BASE_URL } from "./constants";

function getToken(username: string, password: string): Promise<any> {
    const url = URL_IN_CONFIG_FILE + "/Sitefinity/Authenticate/OpenID/connect/token";
    const data = {
        username: username,
        password: password,
        grant_type: "password",
        scope: "openid",
        client_id: "iris",
        client_secret: "secret"
    };

    let body = "";
    Object.keys(data).forEach(key => {
        if (body.length) {
            body += "&";
        }
        body += key + "=";
        body += encodeURIComponent(data[key]);
    });

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const request = new Request("POST", url, headers, body);
    const promiseExecutor = (resolve, reject) => {
        request.execute().then(
            (data) => {
                const token = JSON.parse(data.responseText);

                const expireDate = new Date();
                expireDate.setSeconds(expireDate.getSeconds() + token.expires_in);

                const tokenObj = {
                    type: token.token_type,
                    value: token.access_token,
                    lifetime: 3600,
                    expireDate: expireDate.getTime()
                };

                resolve(tokenObj);
            },
            (response) => {
                reject(response);
            }
        );
    };

    return new Promise(promiseExecutor);
}

export default class AuthenticationManager {

    private static instance: AuthenticationManager = new AuthenticationManager();
    private requestHeaders = {
        "X-SF-Service-Request": true,
        "Content-Type": "application/json"
    };

    /**
     * Since AuthenticationManager is a static class, it should not get instantiated.
     *
     */
    constructor() {
        if (AuthenticationManager.instance) {
            throw new Error("Error: Instantiation failed: Use AuthenticationManager.instance instead of new.");
        }
    }

    /**
     * Retrieves the singleton instance of the class
     *
     * @static
     * @returns {AuthenticationManager}
     */
    static getInstance(): AuthenticationManager {
        return AuthenticationManager.instance;
    }

    /**
     * Method for logging out from the server
     *
     * @returns {Promise<string>}
     */
    logout(): Promise<string> {
        const promiseExecutor = (resolve, reject) => {
            resolve();
        };

        return new Promise(promiseExecutor);
    }

    /**
     * Method for getting authentication token and adding it as a "Authorization" header
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>}
     */
    async authenticate(username: string, password: string): Promise<any> {
        const token = await getToken(username, password);
        try {
            this.requestHeaders["Authorization"] = `${token.type} ${token.value}`;
            return await SitefinitySdk.getInstance().authentication.setToken(token);
        } catch (error) {
            console.log(this.parseError(token));
        }
    }

    /**
     * Get the request headers, alongside with 'Authorization' header after successful authentication
     * Throws an exception, if 'Authorization' header is absent
     *
     * @returns {Object} - returns new copy of headers object
     */
    getRequestHeaders(): Object {
        if (!this.requestHeaders["Authorization"]) {
            throw "Authorization header not set. Try to authenticate before requiring request headers.";
        }

        return Object.assign({}, this.requestHeaders);
    }

    private parseError(response) {
        let err = null;
        let serverError = null;

        if (response) {
            if (response.responseText) {
                try {
                    serverError = JSON.parse(response.responseText);
                } catch (e) {
                    /* Invalid JSON */
                }

                err = serverError
                    && serverError.error
                    && serverError.error.innererror
                    && serverError.error.innererror.message;

                // no inner error
                err = err ? err : serverError && serverError.error;

            }
            if (!err && response.statusText) {
                err = response.statusText;
            }
        }

        // if err is still null fall back to some undefined err message
        return err || "Server error";
    }
}

export async function initAuth(username: string, password: string) {
    const token = await getToken(username, password);
    await browser.get(BASE_URL);
    const setLocalStorageString = `localStorage.setItem("sf.config.serviceUrl","${URL_IN_CONFIG_FILE}");`;
    await browser.executeScript(setLocalStorageString);
    const serializedToken = JSON.stringify(token);
    const setTokenScriptString = `localStorage.setItem("sf.token",'${serializedToken}');`;

    await browser.executeScript(setTokenScriptString);
}
