import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import { USERNAME, PASSWORD, TIMEOUT, DYNAMIC_ITEM_HEADERS, TABLE_HEADERS_CONSTANTS, CONTENT_NEWS_URL, NEWS_TYPE_NAME, SAMPLE_TEXT_CONTENT, THEME_URL, FIRST_WORD_WITH_ERROR, SECOND_WORD_WITH_ERROR, SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS, SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS } from "../helpers/constants";
import { BrowserNavigate, BrowserWaitForElement, SelectAllAndPasteText } from "../helpers/browser-helpers";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { ServerConsoleLogs } from "./../helpers/common";
import { ItemListMap } from "../app-elements/item-list.map";
import { Theme } from "../app-elements/theme.component";

describe("Verify extensions", () => {
    const typeToTest = "News";
    const imageColumnHeader = "IMAGE";
    const itemToVerify = "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1";

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    afterEach(async (done: DoneFn) => {
        await ServerConsoleLogs();
        done();
    });

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
        await ItemDetails.ClickBackButton(true);
    });

    it("word count editor toolbar button ", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await SelectAllAndPasteText(SAMPLE_TEXT_CONTENT);
        await ItemDetails.VerifyHtmlToolbarWordCount(SAMPLE_TEXT_CONTENT);
    });

    it("videos toolbar button ", async () => {
        await ItemDetails.ClickHtmlToolbarSitefinityVideos();
        await VideosModal.VerifyModalTitle();
        await VideosModal.CancelModal();
        await ItemDetails.ClickBackButton(true);
        await BrowserWaitForElement(ItemListMap.CountLabel);
    });

    it("insert symbol", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await ItemDetails.VerifyAndClickSymbolListButton();
        await ItemDetails.ClickBackButton(true);
    });

    it("applied theme", async () => {
        await BrowserNavigate(THEME_URL);
        await Theme.SelectTheme("Sample");
        await Theme.UseSelectedTheme();

        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.VerifyThemeButtonColor();
    });

    xit("spell checker", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await ItemDetails.ChangeEditorContent(SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS);
        await ItemDetails.FocusHtmlField();
        await ItemDetails.VerifyHtmlToolbarSpellCheck();
        await ItemDetails.ClickEditorImmutableElement(FIRST_WORD_WITH_ERROR);
        await ItemDetails.ClickEditorMenuButton("Accept correction");
        await ItemDetails.ClickEditorImmutableElement(SECOND_WORD_WITH_ERROR);
        await ItemDetails.ClickEditorMenuButton("Discard");
        await ItemDetails.VerifyEditorContent(SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS);
    });
});
