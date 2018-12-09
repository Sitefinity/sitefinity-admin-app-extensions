import { element, by, ElementFinder } from "protractor";

const defaultFieldLocator = ".sf-input.-rich-text";
const itemTitleExtensionCssClass = ".custom-title-input";

export class ItemDetailsMap {
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static ExtendedTitleField: ElementFinder = element(by.css(itemTitleExtensionCssClass));
    public static HtmlField: ElementFinder = element(by.css(".sf-input.-rich-text"));
    public static EditorInternalField: ElementFinder = element(by.cssContainingText("div", "Hello everyone"));
    public static HtmlFieldExpandButton: ElementFinder = element(by.css("a[title=Expand]"));

    public static ToolbarButton(customClass: string): ElementFinder {
        return element(by.className(customClass));
    }

    public static ToolbarButtonByTitle(buttonTitle: string): ElementFinder {
        return element(by.css(`a[Title="${buttonTitle}"]`))
    }
}
