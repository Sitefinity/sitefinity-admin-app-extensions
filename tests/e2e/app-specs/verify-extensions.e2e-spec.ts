import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import { USERNAME, PASSWORD, TIMEOUT, DYNAMIC_ITEM_HEADERS, TABLE_HEADERS_CONSTANTS, CONTENT_NEWS_URL, NEWS_TYPE_NAME, THEME_URL } from "../helpers/constants";
import { BrowserNavigate } from "../helpers/browser-helpers";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { Theme } from "../app-elements/theme.component";

describe("Verify extensions", () => {
    const typeToTest = "News";
    const imageColumnHeader = "IMAGE";
    const itemToVerify = "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1";

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    it("images column", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.VerifyBasicUIElements(NEWS_TYPE_NAME, typeToTest);

        const extensionHeaders = DYNAMIC_ITEM_HEADERS.map((header) => { return header === TABLE_HEADERS_CONSTANTS.DATE_CREATED ? imageColumnHeader : header; });
        await ItemList.VerifyBasicGridElements(typeToTest, extensionHeaders, 34);
    });

    it("print preview ", async () => {
        await ItemList.ClickPrintPreview(itemToVerify);
        await PrintPreview.VerifyPrintPreview(itemToVerify);
    });

    it("custom title field ", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.VerifyCustomTitleField();
    });

    it("word count editor toolbar button ", async () => {
        await ItemDetails.ClickOnHtmlField();
        await ItemDetails.VerifyHtmlToolbarWordCount();
    });

    it("videos toolbar button ", async () => {
        await ItemDetails.ClickHtmlToolbarSitefinityVideos();
        await VideosModal.VerifyModalTitle();
        await VideosModal.CancelModal();
    });

    it("insert symbol", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ClickOnHtmlField();
        await ItemDetails.VerifyAndClickSymbolListButton();
    });

    // Should be enabled when Custom theme for Iris is in master.
    xit("applied theme", async () => {
        await BrowserNavigate(THEME_URL);
        await Theme.SelectTheme("Sample");
        await Theme.UseSelectedTheme();
        await Theme.ValidateButtonColor();
    });
});
