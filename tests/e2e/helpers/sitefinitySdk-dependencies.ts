declare var global: any;

export function mockGlobalWindow() {
    const MockBrowser = require("mock-browser").mocks.MockBrowser;
    const AbstractBrowser = require("mock-browser").delegates.AbstractBrowser;
    // configure in some factory
    const config = {};

    if (typeof window === "object") {
        // assign the browser window if it exists
        config["window"] = window;
    } else {
        // create a mock window object for testing
        config["window"] = MockBrowser.createWindow();
    }

    // create the browser object with a real window in browsers and mock when not in browser
    const browser = new AbstractBrowser(config);

    global.window = browser.getWindow();
}

export function enableXMLHttpRequests() {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    global.XMLHttpRequest = XMLHttpRequest;
}
