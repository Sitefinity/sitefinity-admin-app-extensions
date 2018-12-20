import { element, by, ElementFinder } from "protractor";
import { ITEM_CONTENT_BEGINNING } from '../helpers/constants';

const defaultFieldLocator = ".-sf-short-text-default";

export class ItemDetailsMap {
    public static TitleField: ElementFinder = element(by.css(defaultFieldLocator));
    public static TitleInput: ElementFinder = ItemDetailsMap.TitleField.element(by.css("input"));
    public static TitleError: ElementFinder = ItemDetailsMap.TitleField.element(by.css("sf-error"));
    public static HtmlFieldExpander: ElementFinder = element(by.css(".sf-expand-button"));
    public static EditorInternalField: ElementFinder = element(by.css(".k-editor.k-editor-inline"));
    public static EditorCustomEditMenu: ElementFinder = element.all(by.css(".sf-notification__content")).last();
    public static MonacoEditor: ElementFinder = element(by.cssContainingText("div", ITEM_CONTENT_BEGINNING));
    public static DoneButton: ElementFinder = element(by.cssContainingText(".sf-button", "Done"));
    public static PublishButton: ElementFinder = element(by.cssContainingText("button", "Publish"));
    public static BackButton: ElementFinder = element(by.css(".sf-button.-toggle.-icon"));

    public static ToolbarButton(customClass: string): ElementFinder {
        return element(by.className(customClass));
    }

    public static EditorImmutableElement(elementText: string): ElementFinder {
        return ItemDetailsMap.EditorInternalField.element(by.cssContainingText("[data-sf-ec-immutable]", elementText));
    }

    public static EditorMenuButton(buttonTitle: string): ElementFinder {
        return ItemDetailsMap.EditorCustomEditMenu.element(by.css(`.sf-notification__tool-button[title='${buttonTitle}']`));
    }

    public static FieldCharCounter(field: ElementFinder): ElementFinder {
        return field.element(by.css('.sf-input__char-counter'));
    }
}
