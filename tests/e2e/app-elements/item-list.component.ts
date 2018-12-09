require("jasmine-expect");

import { removeQueryParams } from "../helpers/common";
import { ItemListMap } from "./item-list.map";
import { BrowserWaitForElement, BrowserGetUrl } from "../helpers/browser-helpers";
import { CONTENT_PAGE_URL, DEFAULT_ITEMS_NUMBER } from "../helpers/constants";

export class ItemList {

    static async VerifyBasicUIElements(typeName: string, itemTitlePlural: string) {
        await BrowserWaitForElement(ItemListMap.CountLabel);
        const trimmedUrl = await removeQueryParams(BrowserGetUrl());
        const expectedUrl = CONTENT_PAGE_URL + typeName.toLowerCase();
        expect(trimmedUrl).toBe(expectedUrl);
        expect(await ItemListMap.TitleTag.isDisplayed()).toBeTruthy();
        expect(await ItemListMap.TitleTag.getText()).toBe(itemTitlePlural);
    }

    static async VerifyImageColumn() {
        await BrowserWaitForElement(ItemListMap.ImageColumn);
    }

    static async VerifyBasicGridElements(itemTitle: string, headers: string[], allItems: number, currentLoadedItems = DEFAULT_ITEMS_NUMBER) {
        await BrowserWaitForElement(ItemListMap.TitleTag);
        await ItemList.VerifyHeaders(headers);
        expect(await ItemListMap.CountLabel.isDisplayed()).toBeTruthy();
        expect(await ItemListMap.TableElements.count()).toBe(currentLoadedItems);

        let expectedItemCountLabel: string;
        if (allItems <= currentLoadedItems) {
            expectedItemCountLabel = allItems + " " + itemTitle.toLowerCase();
        } else {
            expectedItemCountLabel = DEFAULT_ITEMS_NUMBER + " from " + allItems + " " + itemTitle.toLowerCase();
        }
        expectedItemCountLabel = (allItems > 1) ? `${expectedItemCountLabel}` : expectedItemCountLabel;

        expect(await ItemListMap.CountLabel.getText()).toBe(expectedItemCountLabel);
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
