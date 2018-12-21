import { element, by, ElementFinder } from "protractor";

export class ItemDetailsMap {
    public static ExtendedTitleField: ElementFinder = element(by.css(".custom-title-input"));
    public static BackButton: ElementFinder = element(by.css(".sf-button.-toggle.-icon"));
    public static EditorInternalField: ElementFinder = element(by.cssContainingText("div", "Hello everyone"));
    public static HtmlFieldExpandButton: ElementFinder = element(by.css("a[title=Expand]"));

    public static ToolbarButtonByTitle(buttonTitle: string): ElementFinder {
        return element(by.css(`a[Title="${buttonTitle}"]`))
    }
}
