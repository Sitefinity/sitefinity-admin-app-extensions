import { mockGlobalWindow, enableXMLHttpRequests } from "./sitefinitySdk-dependencies";
import { URL_IN_CONFIG_FILE, DEFAULT_SERVICE_URL } from "./constants";

// sitefinitySdk requires global window object
mockGlobalWindow();
// sitefinitySdk requires XMLHttpRequests
enableXMLHttpRequests();

const Sitefinity = require("sitefinity-webservices-sdk/dist/sitefinity-webservices-sdk.js");

class SitefinitySdk {

    private static instance: any;
    /**
     * Since SitefinitySdk is a static class, it should not get instantiated.
     *
     */
    constructor() {
        if (SitefinitySdk.instance) {
            throw new Error("Error: Instantiation failed: Use SitefinitySdk.instance instead of new.");
        }
    }

    /**
     * Retrieves the singleton instance of the SitefinitySdk.instance
     *
     * @static
     * @returns {SitefinitySdk.instance}
     */
    static getInstance() {
        if (SitefinitySdk.instance)
            return SitefinitySdk.instance;

        let url = URL_IN_CONFIG_FILE.trim();

        url = `${url}/${DEFAULT_SERVICE_URL}`;
        SitefinitySdk.instance = new Sitefinity({
            serviceUrl: url
        });

        return SitefinitySdk.instance;
    }

    /**
     * Provides Sitefinity.Query
     *
     * @static
     * @returns
     */
    static Query() {
        return Sitefinity.Query;
    }
}

export default SitefinitySdk;
