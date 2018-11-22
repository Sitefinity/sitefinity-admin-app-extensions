import { element, by, ElementFinder } from "protractor";

export class ThemeMap {
    public static UseSelectedButton: ElementFinder = element(by.cssContainingText(".sf-button", "Use selected"));

    public static GetThemeRow(themeName: string): ElementFinder {
        return element(by.cssContainingText(".tree-node-level-1", themeName));
    }
}
