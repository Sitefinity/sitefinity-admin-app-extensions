import { element, by, ElementFinder, ElementArrayFinder } from "protractor";

export class ItemListMap {
    public static PrintPreviewButton: ElementFinder = element(by.cssContainingText("div[role=option]", "Print preview"));
    public static TitleTag: ElementFinder = element.all(by.css(".sf-row h1")).last();
    public static ImageColumn: ElementFinder = element(by.cssContainingText(`div.-head[title="Image"]`, "Image"));
    public static ActionsButton: ElementArrayFinder = element.all(by.css("i[title=Actions]"));
    public static BackButton: ElementFinder = element(by.css("button[title=Back]"));
    public static RowsCheckboxes: ElementArrayFinder = element.all(by.css(".tree-node-checkbox"));
    public static BulkActionsMenuButton: ElementFinder = element(by.css(".sf-main-list-header__bulk div[role='listbox']"));
    public static BulkDropdown: ElementFinder = element(by.css("sf-bulk-operations div.sf-dropdown"));
    public static BulkNotification: ElementFinder = element(by.css("sf-bulk-operations-notification"));
    public static Columns: ElementArrayFinder = element.all(by.css(".sf-tree-list__cell.-head"));

    public static GetColumnByName(name: string): ElementFinder {
        return element(by.cssContainingText(".sf-tree-list__cell.-head", ` ${name} `));
    }

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
