import { element, by, ElementFinder } from "protractor";
import { ITEM_CONTENT_BEGINNING } from "../helpers/constants";

const defaultFieldLocator = ".-sf-short-text-default";

export class ItemDetailsMap {
    public static ExtendedTitleField: ElementFinder = element(by.css(".custom-title-input"));
    public static EditorInternalField: ElementFinder = element.all(by.css("sf-editor .sf-editor")).first();
    public static HtmlFieldExpandButton: ElementFinder = element(by.css("a[title=Expand]"));
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static TitleInput: ElementFinder = ItemDetailsMap.TitleField.element(by.css("input"));
    public static TitleError: ElementFinder = ItemDetailsMap.TitleField.element(by.css("sf-error"));
    public static ArrayOfGUIDsField: ElementFinder = element(by.css(".-sf-array-of-guids"));
    public static ArrayOfGUIDsInput: ElementFinder = ItemDetailsMap.ArrayOfGUIDsField.element(by.css("input"));
    public static HtmlFieldExpander: ElementFinder = element(by.css(".sf-expand-button"));
    public static EditorCustomEditMenu: ElementFinder = element.all(by.css(".sf-notification__content")).last();
    public static MonacoEditor: ElementFinder = element.all(by.cssContainingText("div", ITEM_CONTENT_BEGINNING)).first();
    public static DoneButton: ElementFinder = element(by.cssContainingText(".sf-button", "Done"));
    public static PublishButton: ElementFinder = element(by.cssContainingText("button", "Publish"));
    public static BackButton: ElementFinder = element(by.css(".sf-button.-toggle.-icon[title='All items']"));

    public static ToolbarButtonByTitle(buttonTitle: string): ElementFinder {
        return element(by.css(`a[Title="${buttonTitle}"]`));
    }

    public static EditorImmutableElement(elementText: string): ElementFinder {
        return ItemDetailsMap.EditorInternalField.element(by.cssContainingText("[data-sf-ec-immutable]", elementText));
    }

    public static EditorMenuButton(buttonTitle: string): ElementFinder {
        return ItemDetailsMap.EditorCustomEditMenu.element(by.css(`.sf-notification__tool-button[title='${buttonTitle}']`));
    }

    public static FieldCharCounter(field: ElementFinder): ElementFinder {
        return field.element(by.css(".sf-input__char-counter"));
    }
}
