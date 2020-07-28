import { browser, ElementFinder, protractor } from "protractor";
import { EC, TIME_TO_WAIT } from "./constants";

export async function BrowserWaitForElement(element: ElementFinder) {
    await browser.wait(EC.visibilityOf(element), TIME_TO_WAIT, "Element is not visible. Locator used - " + element.locator());
}

export async function BrowserWaitForElementHidden(element: ElementFinder) {
    await browser.wait(EC.invisibilityOf(element), TIME_TO_WAIT, "Element is visible, but should not be. Locator used - " + element.locator());
}

export async function BrowserGetUrl(): Promise<string> {
    return await browser.getCurrentUrl();
}

export async function BrowserNavigate(url: string): Promise<void> {
    return await browser.get(url);
}

export async function BrowserVerifyConsoleOutput(expectedOutput: string) {
    return await browser.manage().logs().get("browser").then((browserLog) => {
        const log = browserLog.find(entry => entry.level.name === "INFO" && entry.message.includes(expectedOutput));
        expect(log).not.toBeUndefined(`${expectedOutput} was not found in logs`);
    });
}

export async function BrowserVerifyWordCountAlert(): Promise<void> {
    await browser.wait(EC.alertIsPresent(), TIME_TO_WAIT, "Alert is not shown");
    const alertDialog = browser.switchTo().alert();
    const actualAlertText = await alertDialog.getText();
    expect(actualAlertText).toMatch(/Words count: \d+/);
    await alertDialog.accept();
}

export async function BrowserVerifyAlert(expectedAlertText: string): Promise<void> {
    await browser.wait(EC.alertIsPresent(), TIME_TO_WAIT, "Alert is not shown");
    const alertDialog = browser.switchTo().alert();
    const actualAlertText = await alertDialog.getText();
    expect(actualAlertText).toBe(expectedAlertText, "The expected alert was shown but the text was not expected");
    await alertDialog.accept();
}

export async function SelectAllAndTypeText(text: string): Promise<void> {
    await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys("a").perform();
    await browser.actions().keyUp(protractor.Key.CONTROL).perform();
    await browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
    await browser.actions().sendKeys(text).perform();
}
