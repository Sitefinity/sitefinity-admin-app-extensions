import { element, by, ElementFinder } from "protractor";

const defaultFieldLocator = ".sf-input.-rich-text";
const itemTitleExtensionCssClass = ".custom-title-input";

export class ItemDetailsMap {
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static ExtendedTitleField: ElementFinder = element(by.css(itemTitleExtensionCssClass));
    public static HtmlFieldExpander: ElementFinder = element(by.css(".sf-expand-button"));
    public static EditorInternalField: ElementFinder = element(by.css(".k-editor.k-editor-inline"));
    public static EditorCustomEditMenu: ElementFinder = element.all(by.css(".sf-notification__content")).last();
    public static MonacoEditor: ElementFinder = element(by.css(".monaco-editor"));
    public static DoneButton: ElementFinder = element(by.cssContainingText(".sf-button", "Done"));
    public static PublishButton: ElementFinder = element(by.cssContainingText(".sf-button", "Publish"));

    public static ToolbarButton(customClass: string): ElementFinder {
        return element(by.className(customClass));
    }

    public static EditorImmutableElement(elementText: string): ElementFinder {
        return ItemDetailsMap.EditorInternalField.element(by.cssContainingText("[data-sf-ec-immutable]", elementText));
    }

    public static EditorMenuButton(buttonTitle: string): ElementFinder {
        return ItemDetailsMap.EditorCustomEditMenu.element(by.css(`.sf-notification__tool-button[title='${buttonTitle}']`));
    }
}
