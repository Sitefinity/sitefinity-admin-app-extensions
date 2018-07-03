"use strict";
var jasmineReporters = require("jasmine-reporters");
var protractor = require("protractor");

const modifiedReporter = new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: "test-results",
    filePrefix: "e2e-tests.xml"
});

// Override "source-map-support"'s install function, since it is causing issues protractor bootstrap
// TODO
require("source-map-support").install = function() {};
require("ts-node/register");

exports.config = {
    directConnect: true,

    allScriptsTimeout: 40000,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: "chrome",
        // TODO: Temporary workaround for Chrome version 52.0.2743.116 m!
        chromeOptions: {
            args: ["--no-sandbox", "--disable-gpu", "--window-size=1024,768"]
        }
    },

    // Framework to use. Jasmine is recommended.
    framework: "jasmine",

    // Spec patterns are relative to the current working directory when protractor is called.
    // TODO: rename specs
    specs: ["app-specs/**/**.e2e-spec.ts"],

    // We should turn off control_flow. We cannot use a mix of async/await and the control flow:
    // async/await causes the control flow to become unreliable. See teampulse item #241056 and links in it.
    SELENIUM_PROMISE_MANAGER: false,

    // If needed to run/debug protractor tests via WebStorm, uncomment the following lines and set parameters.
    // params: {
    //     sfUrl: "",
    //     login: {
    //         username: "",
    //         password: ""
    //     }
    // },

    useAllAngular2AppRoots: true,

    baseUrl: "http://localhost:3000/",


    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};