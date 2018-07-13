import { browser, ElementFinder } from "protractor";
import { EC, TIME_TO_WAIT } from "./constants";

export async function BrowserWaitForElement(element: ElementFinder) {
    await browser.wait(EC.visibilityOf(element), TIME_TO_WAIT, "Element is not visible");
}

export async function BrowserGetUrl(): Promise<string> {
    return await browser.getCurrentUrl();
}

export async function BrowserNavigate(url: string): Promise<void> {
    return await browser.get(url);
}
