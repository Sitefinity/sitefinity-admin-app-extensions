import { element, by, ElementFinder } from "protractor";

export class ItemListMap {
    public static PrintPreviewButton: ElementFinder = element(by.cssContainingText("div[role=option]", "Print preview"));
    public static ImageColumn: ElementFinder = element(by.cssContainingText(`div[data-sftest=image3]`, "Image"));
    public static ActionsButton: ElementFinder = element(by.css("[title=Actions]"));
    public static TitleTag: ElementFinder = element.all(by.css(".sf-row h1")).last();
    public static BackButton: ElementFinder = element(by.css("button[title=Back]"));

    public static GetRowTitleCell(rowTitle: string): ElementFinder {
        return element(by.cssContainingText("p", rowTitle));
    }

    public static GetItemActionsMenu(): ElementFinder {
        return this.ActionsButton;
    }
}
