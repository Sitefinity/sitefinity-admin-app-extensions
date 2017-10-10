import { NgModule } from "@angular/core";
import { TRACKJS_LOGGER } from "./custom-logger";

const trackJsConfig =         {
    token: "TRACK_JS_TOKEN",
    window: {

        // TrackJS sets up a window.onerror function automatically.
        // Set this to false if you wish to use your own, or to manually track errors.
        enabled: false,

        // Whether to listen for global unhandled promise rejections.
        promise: false
    },

    visitor: {
        enabled: false
    },

    network: {

        // TrackJS will monitor network calls and add some metadata about them to your Telemetry Timeline.
        // If you don't want your network events monitored set this to false.
        enabled: false,

        // By default any network response with a status code of 400 or greater will trigger an error.
        // Set this to false if you do not wish to automatically track 400 or greater network errors.
        error: false
    },

    callback: {

        // TrackJS wraps addEventListener() and setTimeout() by default.
        // If you want to prevent this wrapping, set this to false.
        enabled: true
    },

    console: {
        // By default TrackJS will watch all console activity and include that information in the Telemetry Timeline
        enabled: false
    }
};

@NgModule({
    providers: [
        TRACKJS_LOGGER
    ]
})
export class LoggerModule {
    constructor() {
        const config = document.createElement("script");
        config.textContent = `window._trackJs = ${JSON.stringify(trackJsConfig)}`;
        document.body.appendChild(config);

        const trackJsScript = document.createElement("script");
        trackJsScript.setAttribute("src", "https://cdn.trackjs.com/releases/current/tracker.js");
        document.body.appendChild(trackJsScript);
    }
}
