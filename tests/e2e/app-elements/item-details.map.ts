import { element, by, ElementFinder } from "protractor";

const defaultFieldLocator = ".-sf-short-text-default";
const itemTitleExtensionCssClass = ".custom-title-input";

export class ItemDetailsMap {
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static ExtendedTitleField: ElementFinder = element(by.css(defaultFieldLocator)).element(by.css(itemTitleExtensionCssClass));
}
