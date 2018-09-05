import { element, by, ElementFinder, ElementArrayFinder } from "protractor";

export class ItemListMap {
    public static TitleTag: ElementFinder = element.all(by.css(".sf-row h1")).last();
    public static PrintPreviewButton: ElementFinder = element(by.cssContainingText("div[role=option]", "Print preview"));
    public static CountLabel: ElementFinder = element(by.css("div.row__col.-txt-align-right.-txt-hint"));
    public static TableHeaders: ElementArrayFinder = element(by.className("sf-tree-list__row -head")).all(by.className("sf-tree-list__cell -head"));
    public static TableElements: ElementArrayFinder = element.all(by.css(".sf-tree-list__row:not(.-head):not(.-loading)"));

    public static GetRowTitleCell(rowTitle: string): ElementFinder {
        const itemRow = ItemListMap.GetTableRow(rowTitle);
        return itemRow.element(by.css(".sf-tree-list__cell.-title"));
    }

    public static GetItemActionsMenu(rowTitle: string): ElementFinder {
        const itemRow = ItemListMap.GetTableRow(rowTitle);
        return itemRow.element(by.css("[title=Actions]"));
    }

    private static GetTableRow(rowTitle: string): ElementFinder {
        return element(by.cssContainingText(".tree-node-level-1", rowTitle));
    }
}
