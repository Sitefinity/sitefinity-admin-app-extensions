import { element, by, ElementFinder, ElementArrayFinder } from "protractor";

export class ItemListMap {
    public static PrintPreviewButton: ElementFinder = element(by.cssContainingText("div[role=option]", "Print preview"));
    public static TitleTag: ElementFinder = element.all(by.css(".sf-row h1")).last();
    public static ImageColumn: ElementFinder = element(by.cssContainingText(`div[data-sftest=image3]`, "Image"));
    public static ActionsButton: ElementArrayFinder = element.all(by.css("i[title=Actions]"));
    public static BackButton: ElementFinder = element(by.css("button[title=Back]"));

    public static GetRowTitleCell(rowTitle: string): ElementFinder {
        return element(by.cssContainingText("sf-main-field", rowTitle));
    }

    public static GetItemActionsMenu(): ElementFinder {
        return this.ActionsButton.first();
    }

    public static GetCreateItemButton(): ElementFinder {
        const listHeaderBar = element(by.css(".sf-main__header"));
        return listHeaderBar.element(by.cssContainingText("button.sf-button.-action", "Create a"));
    }
}
