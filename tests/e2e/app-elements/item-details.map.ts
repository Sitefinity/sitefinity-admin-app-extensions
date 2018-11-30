import { element, by, ElementFinder } from "protractor";

const defaultFieldLocator = ".sf-input.-rich-text";
const itemTitleExtensionCssClass = ".custom-title-input";

export class ItemDetailsMap {
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static ExtendedTitleField: ElementFinder = element(by.css(itemTitleExtensionCssClass));
    public static HtmlField: ElementFinder = element(by.css(".sf-input.-rich-text"));
    public static EditorInternalField: ElementFinder = element(by.css(".k-editor.k-editor-inline"));
    public static PublishButton: ElementFinder = element(by.cssContainingText("button", "Publish"));

    public static ToolbarButton(customClass: string): ElementFinder {
        return element(by.className(customClass));
    }
}
