require("jasmine-expect");

import { ItemListMap } from "./item-list.map";
import { BrowserWaitForElement } from "../helpers/browser-helpers";
import { by } from "protractor";

const backgroundColorAttribute = "backgroundColor";
const expectedButtonColor = "rgba(0, 108, 217, 1)";

export class ItemList {
    static async VerifyImageColumn() {
        await BrowserWaitForElement(ItemListMap.ImageColumn);
    }

    static async ClickActionFromBulkDropdown(actionTitle: string) {
        const actionButtons = ItemListMap.BulkDropdown.all(by.css("div[role='option']"));
        const operationButton = actionButtons.filter(async x => (await x.getText()).includes(actionTitle));

        await operationButton.click();
    }

    static async SelectListRows(rowsCount: number) {
        await BrowserWaitForElement(ItemListMap.RowsCheckboxes.first());

        for (let i = 0; i < rowsCount; i++) {
            await ItemListMap.RowsCheckboxes.get(i).click();
        }
    }

    static async VerifyColumnDoesntExist(columnTitle: string) {
        await BrowserWaitForElement(ItemListMap.GetColumnByName("Title"));
        const cols = ItemListMap.Columns.filter(async x => ((await x.getText()).includes(columnTitle)));
        expect((await cols).length).toBe(0, `Column '${columnTitle}' should not exist.`);
    }

    static async VerifyColumnPosition(columnTitle: string, columnPosition: number) {
        await BrowserWaitForElement(ItemListMap.GetColumnByName(columnTitle));
        const columns = await ItemListMap.Columns;
        // toUpperCase because of css rule
        expect(await columns[columnPosition].getText()).toBe(columnTitle.toUpperCase())
    }

    static async ClickPrintPreview() {
        const actionButton = ItemListMap.GetItemActionsMenu();
        await actionButton.click();
        await BrowserWaitForElement(ItemListMap.PrintPreviewButton);
        await ItemListMap.PrintPreviewButton.click();
    }

    static async ClickOnItem(title: string) {
        await BrowserWaitForElement(ItemListMap.GetRowTitleCell(title));
        const item = ItemListMap.GetRowTitleCell(title);
        await item.click();
    }

    static async ClickOnCreate() {
        await BrowserWaitForElement(ItemListMap.GetCreateItemButton());
        const create = ItemListMap.GetCreateItemButton();
        await create.click();
    }

    static async VerifyThemeButtonColor() {
        await BrowserWaitForElement(ItemListMap.GetCreateItemButton());
        const actualButtonColor = await ItemListMap.GetCreateItemButton().getCssValue(backgroundColorAttribute);
        expect(actualButtonColor).toBe(expectedButtonColor);
    }
}
