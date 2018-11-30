require("jasmine-expect");

import { ThemeMap } from "./theme.map";
import { BrowserWaitForElement } from "../helpers/browser-helpers";
import { EC } from "../helpers/constants";
import { browser } from "protractor";

const backgroundColorAttribute = "backgroundColor";
const expectedButtonColor = "rgba(0, 99, 208, 1)";
const timeToWait = 3000;

export class Theme {
    public static async SelectTheme(themeName: string) {
        await BrowserWaitForElement(ThemeMap.UseSelectedButton);
        const item = ThemeMap.GetThemeRow(themeName);
        await item.click();
    }

    public static async UseSelectedTheme() {
        await BrowserWaitForElement(ThemeMap.UseSelectedButton);
        await ThemeMap.UseSelectedButton.click();
        await browser.wait(EC.elementToBeClickable(ThemeMap.UseSelectedButton), timeToWait);
    }

    public static async ValidateButtonColor() {
        const button = await ThemeMap.UseSelectedButton;
        const actualButtonColor = await button.getCssValue(backgroundColorAttribute);
        expect(actualButtonColor).toBe(expectedButtonColor);
    }
}
