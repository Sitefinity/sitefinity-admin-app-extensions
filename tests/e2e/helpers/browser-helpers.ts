import { browser, ElementFinder, protractor } from "protractor";
import { EC, TIME_TO_WAIT } from "./constants";

export async function BrowserWaitForElement(element: ElementFinder) {
    await browser.wait(EC.visibilityOf(element), TIME_TO_WAIT, "Element is not visible. Locator used - " + element.locator());
}

export async function BrowserWaitForElementToBeClickable(element: ElementFinder) {
    await browser.wait(EC.elementToBeClickable(element), TIME_TO_WAIT, "Element is not clickable. Locator used - " + element.locator());
}

export async function BrowserWaitForTextToBePresent(element: ElementFinder, text: string) {
    await browser.wait(EC.textToBePresentInElement(element, text), TIME_TO_WAIT, `Text '${text}' was not present. Locator used - ${element.locator()}`);
}

export async function BrowserWaitForElementHidden(element: ElementFinder) {
    await browser.wait(EC.not(EC.visibilityOf(element)), TIME_TO_WAIT, "Element is visible, but should not be. Locator used - " + element.locator());
}

export async function BrowserGetUrl(): Promise<string> {
    return await browser.getCurrentUrl();
}

export async function BrowserNavigate(url: string): Promise<void> {
    return await browser.get(url);
}

export async function BrowserVerifyConsoleOutput(expectedOutputs: string[]) {
    return await browser.manage().logs().get("browser").then((browserLog) => {
        const infoLogs = browserLog.filter(entry => entry.level.name === "INFO");
        for (let i = 0; i < expectedOutputs.length; i++) {
            const expectedOutput = expectedOutputs[i];
            const log = infoLogs.find(entry => entry.message.includes(expectedOutput));
            expect(log).not.toBeUndefined(`${expectedOutput} was not found in logs`);
        }
    });
}

export async function BrowserVerifyAlert(expectedAlertText: string | RegExp): Promise<void> {
    await browser.wait(EC.alertIsPresent(), TIME_TO_WAIT, "Alert is not shown");
    const alertDialog = browser.switchTo().alert();
    const actualAlertText = await alertDialog.getText();
    expect(actualAlertText).toMatch(expectedAlertText, "The expected alert was shown but the text was not expected");
    await alertDialog.accept();
}

export async function SelectAllAndTypeText(text: string): Promise<void> {
    await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys("a").perform();
    await browser.actions().keyUp(protractor.Key.CONTROL).perform();
    await browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    await browser.actions().sendKeys(text).perform();
}
