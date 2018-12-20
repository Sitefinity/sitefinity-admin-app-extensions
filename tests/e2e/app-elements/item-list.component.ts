require("jasmine-expect");

import { ItemListMap } from "./item-list.map";
import { BrowserWaitForElement } from "../helpers/browser-helpers";

const backgroundColorAttribute = "backgroundColor";
const expectedButtonColor = "rgba(0, 108, 217, 1)";

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

    static async VerifyThemeButtonColor() {
        await BrowserWaitForElement(ItemListMap.GetCreateItemButton());
        const actualButtonColor = await ItemListMap.GetCreateItemButton().getCssValue(backgroundColorAttribute);
        expect(actualButtonColor).toBe(expectedButtonColor);
    }

    private static async VerifyHeaders(headers: string[]) {
        const headersNumber = headers.length;
        try {
            expect(await ItemListMap.TableHeaders.count()).toBe(headersNumber);
            for (let i = 0; i < headersNumber; i++) {
                const innerText = await ItemListMap.TableHeaders.get(i).getAttribute("innerText");
                expect(innerText.toUpperCase().trim()).toBe(headers[i].toUpperCase());
            }
        } catch (e) {
            throw new Error("Table headers are not correct.");
        }
    }
}
