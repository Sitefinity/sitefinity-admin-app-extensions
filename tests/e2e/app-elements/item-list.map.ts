import { element, by, ElementFinder, ElementArrayFinder } from "protractor";

export class ItemListMap {

    private static ImageColumnHeader = "Image";
    private static ColumnName: string = "image3";
    public static TitleTag: ElementFinder = element.all(by.css(".sf-row h1")).last();
    public static PrintPreviewButton: ElementFinder = element(by.cssContainingText("div[role=option]", "Print preview"));
    public static CustomActionsSection: ElementFinder = element(by.cssContainingText("div", "Custom commands"));
    public static CountLabel: ElementFinder = element(by.css("div.sf-row__col.-sf-txt-align-right.-sf-txt-hint"));
    public static TableHeaders: ElementArrayFinder = element(by.className("sf-tree-list__row -head")).all(by.className("sf-tree-list__cell -head"));
    public static TableElements: ElementArrayFinder = element.all(by.css(".sf-tree-list__row:not(.-head):not(.-loading)"));
    public static BackButton: ElementFinder = element(by.css(".sf-button.-toggle.-icon[title=Back]"));
    public static ImageColumn: ElementFinder = element(by.cssContainingText(`div[data-sftest=${ItemListMap.ColumnName}]`, ItemListMap.ImageColumnHeader));
    public static ActionsButton: ElementFinder = element(by.css("[title=Actions]"));

    public static GetRowTitleCell(rowTitle: string): ElementFinder {
        return element(by.cssContainingText("p", rowTitle));
    }

    public static GetItemActionsMenu(): ElementFinder {
        // const itemRow = ItemListMap.GetTableRow(rowTitle);
        // return itemRow.element(by.css("[title=Actions]"));
        return this.ActionsButton;
    }

    // private static GetTableRow(rowTitle: string): ElementFinder {
    //     return element(by.cssContainingText(".tree-node-level-1", rowTitle));
    // }
}
