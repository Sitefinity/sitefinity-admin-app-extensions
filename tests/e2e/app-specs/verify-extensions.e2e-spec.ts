import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from '../app-elements/item-list.component';
import { USERNAME, PASSWORD, TIMEOUT, DYNAMIC_ITEM_HEADERS, TABLE_HEADERS_CONSTANTS, CONTENT_NEWS_URL, NEWS_TYPE_NAME } from "../helpers/constants";
import { BrowserNavigate } from '../helpers/browser-helpers';
import { PrintPreview } from '../app-elements/print-preview.component';
import { ItemDetails } from '../app-elements/item-details.component';

describe("Verify extensions", () => {
    const itemList = new ItemList();
    const printPreview  = new PrintPreview();
    const itemDetails  = new ItemDetails();

    const typeToTest = "News";
    const imageColumnHeader = "IMAGE";
    const itemToVerify = "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1"

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    it("images column", async () => {
        BrowserNavigate(CONTENT_NEWS_URL);
        await itemList.verifyBasicUIElements(NEWS_TYPE_NAME, typeToTest);

        var extensionHeaders = DYNAMIC_ITEM_HEADERS.map((header) => { return header === TABLE_HEADERS_CONSTANTS.DATE_CREATED ? imageColumnHeader : header })
        await itemList.verifyBasicGridElements(typeToTest, extensionHeaders, 34);
    });

    it("print preview ", async () => {
        await itemList.clickPrintPreview(itemToVerify);
        await printPreview.verifyPrintPreview(itemToVerify);
    });

    it("custom title field ", async () => {
        BrowserNavigate(CONTENT_NEWS_URL);
        await itemList.clickOnItem(itemToVerify);
        await itemDetails.verifyCustomTitleField();
    });
});
