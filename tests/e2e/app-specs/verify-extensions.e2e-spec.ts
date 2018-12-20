import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import { BrowserNavigate, SelectAllAndPasteText, BrowserVerifyConsoleOutput, BrowserWaitForElement } from "../helpers/browser-helpers";
import { USERNAME, PASSWORD, TIMEOUT, DYNAMIC_ITEM_HEADERS, TABLE_HEADERS_CONSTANTS, CONTENT_NEWS_URL, NEWS_TYPE_NAME, SAMPLE_TEXT_CONTENT, THEME_URL, FIRST_WORD_WITH_ERROR, SECOND_WORD_WITH_ERROR, SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS, SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS } from "../helpers/constants";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { Theme } from "../app-elements/theme.component";
import { ItemDetailsMap } from "../app-elements/item-details.map";
import { ItemListMap } from "../app-elements/item-list.map";

describe("Verify extensions", () => {
    const itemToVerify = "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1";

    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        done();
    }, TIMEOUT);

    // afterEach(async (done: DoneFn) => {
    //     await ServerConsoleLogs();
    //     done();
    // });

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
        await ItemDetails.ClickBackButton(true);
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
        await ItemDetails.ClickEditorPopupMenuButton("Accept correction");
        await ItemDetails.ClickEditorImmutableElement(SECOND_WORD_WITH_ERROR);
        await ItemDetails.ClickEditorPopupMenuButton("Discard");
        await ItemDetails.VerifyEditorContent(SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS);
    });

    it("item hooks", async () => {
        await BrowserNavigate(CONTENT_NEWS_URL);
        await ItemList.ClickOnItem(itemToVerify);
        await BrowserVerifyConsoleOutput(itemToVerify);
    });
});
