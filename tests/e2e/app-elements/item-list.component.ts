require("jasmine-expect");

import { ItemListMap } from "./item-list.map";
import { BrowserWaitForElement } from "../helpers/browser-helpers";

export class ItemList {
    static async VerifyImageColumn() {
        await BrowserWaitForElement(ItemListMap.ImageColumn);
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
}
