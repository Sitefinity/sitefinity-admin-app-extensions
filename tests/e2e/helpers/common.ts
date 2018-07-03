import { browser } from "protractor";
import { SEVERE_LOG_LEVEL, NEW_LINE, IMAGES_URL, DOCUMENTS_URL, DOCUMENT_LIBRARIES } from "./constants";
import librariesOperations from "../setup/libraries/libraries-operations";

export function removeQueryParams(url: Promise<string>): Promise<string> {
    return url.then((url) => {
        return url.split("?")[0];
    });
}

// Code taken from https://stackoverflow.com/questions/26501688/a-typescript-guid-class
export function RandomGuid(): string {
    const generatedGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(character) {
        const randomSeed = Math.random() * 16 | 0;
        const hexa = character === "x" ? randomSeed : (randomSeed & 0x3 | 0x8);
        const newChar = hexa.toString(16);
        return newChar;
    });

    return generatedGuid;
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

/**
 * Make sure sandbox is cleared of static content beforeAll other setup
 */
export async function DeleteStaticContent() {
    await librariesOperations.deleteAllMediaItems(IMAGES_URL);
    await librariesOperations.deleteAllMediaItems(DOCUMENTS_URL);
    await librariesOperations.deleteAllLibraries(DOCUMENT_LIBRARIES);
}

export function capitalizeFirstLetter(stringToCapitalize: string) {
    return stringToCapitalize.charAt(0) + stringToCapitalize.slice(1);
}
