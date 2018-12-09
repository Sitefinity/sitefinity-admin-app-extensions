import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import { USERNAME, PASSWORD, TIMEOUT, CONTENT_NEWS_URL, SAMPLE_TEXT_CONTENT } from "../helpers/constants";
import { BrowserNavigate, SelectAllAndPasteText, BrowserVerifyConsoleOutput, BrowserWaitForElement } from "../helpers/browser-helpers";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { ItemListMap } from '../app-elements/item-list.map';

describe("Verify extensions", () => {
    const itemToVerify = "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1";

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    it("images column", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.VerifyImageColumn();
    });

    it("print preview", async () => {
        await ItemList.ClickPrintPreview();
        await PrintPreview.VerifyPrintPreview(itemToVerify);
    });

    it("custom title field", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.VerifyCustomTitleField();
    });

    it("word count editor toolbar button", async () => {
        await ItemDetails.ExpandHtmlField();
        await SelectAllAndPasteText(SAMPLE_TEXT_CONTENT);
        await ItemDetails.ClickToolbarButtonByTitle("Words count");
        await ItemDetails.VerifyHtmlToolbarWordCount(SAMPLE_TEXT_CONTENT);
    });

    it("embed video editor toolbar button", async () => {
        await ItemDetails.ClickToolbarButtonByTitle("Sitefinity videos");
        await VideosModal.VerifyModalTitle();
        await VideosModal.CancelModal();
        await ItemDetails.ClickBackButton(true);
        await BrowserWaitForElement(ItemListMap.ImageColumn);
    });

    it("insert symbol", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await ItemDetails.ClickToolbarButtonByTitle("Insert symbol");
        await ItemDetails.VerifyAndClickSymbolListButton();
    });

    it("item hooks", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await BrowserVerifyConsoleOutput(itemToVerify);
    });
});
