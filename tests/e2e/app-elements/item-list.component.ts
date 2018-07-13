require("jasmine-expect");

import { removeQueryParams } from "../helpers/common";
import { ItemListMap } from './item-list.map';
import { BrowserWaitForElement, BrowserGetUrl } from "../helpers/browser-helpers";
import { CONTENT_PAGE_URL, DEFAULT_ITEMS_NUMBER } from "../helpers/constants";

export class ItemList {

    async verifyBasicUIElements(typeName: string, itemTitlePlural: string) {
        await BrowserWaitForElement(ItemListMap.CountLabel);
        var trimmedUrl = await removeQueryParams(BrowserGetUrl());
        var expectedUrl = CONTENT_PAGE_URL + typeName.toLowerCase();
        expect(trimmedUrl).toBe(expectedUrl);
        expect(await ItemListMap.TitleTag.isDisplayed()).toBeTruthy();
        expect(await ItemListMap.TitleTag.getText()).toBe(itemTitlePlural);
    }

    async verifyBasicGridElements(itemTitle: string, headers: string[], allItems: number, currentLoadedItems = DEFAULT_ITEMS_NUMBER) {
        await BrowserWaitForElement(ItemListMap.TitleTag);
        await this.verifyHeaders(headers);
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

    async clickPrintPreview(title: string) {
        var actionButton = ItemListMap.GetItemActionsMenu(title);

        await actionButton.click();
        await BrowserWaitForElement(ItemListMap.PrintPreviewButton);
        await ItemListMap.PrintPreviewButton.click();
    }

    async clickOnItem(title: string) {
        await BrowserWaitForElement(ItemListMap.CountLabel);
        var item = ItemListMap.GetTableRow(title);
        await item.click();
    }

    private async verifyHeaders(headers: string[]) {
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
