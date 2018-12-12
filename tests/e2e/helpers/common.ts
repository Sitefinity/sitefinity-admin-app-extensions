import { browser, ElementFinder } from "protractor";
import { SEVERE_LOG_LEVEL, NEW_LINE } from "./constants";

export function removeQueryParams(url: Promise<string>): Promise<string> {
    return url.then((url) => {
        return url.split("?")[0];
    });
}

export async function ServerConsoleLogs() {
    const browserLog = await browser.manage().logs().get("browser");
    const severeConsoleLogs = await browserLog.filter(l => l.level.name === SEVERE_LOG_LEVEL);

    const hasSevereConsoleLogs = severeConsoleLogs.length > 0;
    expect(hasSevereConsoleLogs).toBe(false, "Severe console logs were detected");

    severeConsoleLogs.forEach(log => {
        const logAsString = JSON.stringify(log.toJSON());
        // tslint:disable-next-line:no-console
        console.log("\x1b[33m%s\x1b[0m:", NEW_LINE, `Error in the console: ${logAsString}`, NEW_LINE);
    });
}

export function capitalizeFirstLetter(stringToCapitalize: string) {
    return stringToCapitalize.charAt(0) + stringToCapitalize.slice(1);
}

export async function ElementHasClass(element: ElementFinder, className: string) {
    const classes = (await element.getAttribute('class')).split(' ');
    return classes.indexOf(className) !== -1;
}
