"use strict";
var jasmineReporters = require("jasmine-reporters");
var HtmlReporter = require('protractor-angular-screenshot-reporter');

var screenshotReporter = new HtmlReporter({
    baseDirectory: './test-results/html-report'
}).getJasmine2Reporter();

// Override "source-map-support"'s install function, since it is causing issues protractor bootstrap
// TODO
require("source-map-support").install = function() {};
require("ts-node/register");

var junitReporter = new jasmineReporters.JUnitXmlReporter({
    filePrefix: "e2e-tests.xml",
    consolidateAll: true
});

var browserParameter;
var headlessParameter = false;

for (let index = 0; index < process.argv.length; index++) {
    const element = process.argv[index];

    var browserParameterMatch = element.match(/^--params\.browser=(.*)$/);
    var headlessParameterMatch = element.match(/^--params\.headless$/);

    if (browserParameterMatch !== null) {
        browserParameter = browserParameterMatch[1];
    }

    if (headlessParameterMatch !== null) {
        headlessParameter = true;
    }
}

var browserSettings;
switch(browserParameter) {
    case "chrome":
        browserSettings = {
            browserName: "chrome",
            chromeOptions: {
                args: []
            },
            loggingPrefs: {
                browser: "ALL"
            }
        };

        if (headlessParameter) {
            browserSettings.chromeOptions.args = browserSettings.chromeOptions.args.concat([
                "--headless",
                "--disable-gpu",
                "--window-size=1920,1080"
            ]);
        }
        break;

    case "firefox":
        browserSettings = {
            browserName: "firefox",
            "moz:firefoxOptions": {
                args: [],
                log: {
                    "level": "error"
                }
            },
            loggingPrefs: {
                browser: "ALL"
            }
        };

        if (headlessParameter) {
            browserSettings["moz:firefoxOptions"].args = browserSettings["moz:firefoxOptions"].args.concat([
                "--headless"
            ]);
        }
        break;

    default:
        console.log("No or unrecognized browser parameter. Falling back to default browser Chrome.");
        browserSettings = {
            browserName: "chrome",
            chromeOptions: {
                args: []
            },
            loggingPrefs: {
                browser: "ALL"
            }
        };
}

exports.config = {
    directConnect: true,

    allScriptsTimeout: 40000,

    // Capabilities to be passed to the webdriver instance.
    capabilities: browserSettings,

    // Framework to use. Jasmine is recommended.
    framework: "jasmine",

    // Spec patterns are relative to the current working directory when protractor is called.
    // TODO: rename specs
    specs: ["app-specs/**/**.e2e-spec.ts"],

    // We should turn off control_flow. We cannot use a mix of async/await and the control flow:
    // async/await causes the control flow to become unreliable. See TeamPulse item #241056 and links in it.
    SELENIUM_PROMISE_MANAGER: false,

    // If needed to run/debug protractor tests via WebStorm, uncomment the following lines and set parameters.
    params: require("./config.json"),

    useAllAngular2AppRoots: true,

    baseUrl: "http://localhost:3000/",

    onPrepare: function() {
        browser.manage().window().setSize(1920, 1080);
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(junitReporter);
        jasmine.getEnv().addReporter(screenshotReporter);
    },

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
