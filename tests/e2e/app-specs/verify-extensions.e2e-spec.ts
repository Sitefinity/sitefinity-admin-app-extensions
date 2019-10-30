import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import {
    BrowserNavigate,
    SelectAllAndTypeText,
    BrowserVerifyConsoleOutput,
    BrowserWaitForElement
} from "../helpers/browser-helpers";
import {
    USERNAME,
    PASSWORD,
    TIMEOUT,
    CONTENT_NEWS_URL,
    SAMPLE_TEXT_CONTENT,
    THEME_URL,
    FIRST_WORD_WITH_ERROR,
    SECOND_WORD_WITH_ERROR,
    SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS,
    SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS,
    PAGES_URL,
    NEWS_TYPE_NAME,
    PAGES_TYPE_NAME,
    BASE_URL
} from "../helpers/constants";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { Theme } from "../app-elements/theme.component";
import { ItemListMap } from "../app-elements/item-list.map";
import dynamicModuleOperations from '../setup/dynamic-module-operations';
import { generateModuleMock } from '../setup/module-mock';
import { setTypeNamePlural } from '../helpers/set-typename-plural';

const ENTITY_MAP = new Map<string, any>()
    .set(NEWS_TYPE_NAME, {
        url: CONTENT_NEWS_URL,
        title: "Building an Appointment Tracking App by using Telerik’s WP Cloud Components - Part 1"
    })
    .set(PAGES_TYPE_NAME, {
        url: PAGES_URL,
        title: "Home"
    });

const dynamicModuleMock = generateModuleMock();
const dynamicItemTitlePlural = setTypeNamePlural(dynamicModuleMock.ContentTypeItemTitle).toLowerCase();
let moduleId: string;

describe("Verify extensions", () => {
    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        moduleId = await dynamicModuleOperations.initiateDynamicModule(dynamicModuleMock);
        done();
    }, TIMEOUT);

    afterAll(async (done: DoneFn) => {
        await dynamicModuleOperations.deleteDynamicModule(moduleId);
        done();
    });

    // afterEach(async (done: DoneFn) => {
    //     await ServerConsoleLogs();
    //     done();
    // });

    // tslint:disable-next-line:forin
    Array.from(ENTITY_MAP.keys()).forEach(entity => {
        const url = ENTITY_MAP.get(entity).url;
        const itemToVerify = ENTITY_MAP.get(entity).title;

        it(`images column [${entity}]`, async () => {
            await BrowserNavigate(url);
            await ItemList.VerifyImageColumn();
        });

        it(`print preview [${entity}]`, async () => {
            await ItemList.ClickPrintPreview();
            await PrintPreview.VerifyPrintPreview(itemToVerify);
        });

        // TODO: Add item hooks test for pages when create edit screens are available
    });

    const entity = NEWS_TYPE_NAME;
    const url = ENTITY_MAP.get(entity).url;
    const itemToVerify = ENTITY_MAP.get(entity).title;

    it(`custom title field [${entity}]`, async () => {
        await BrowserNavigate(url);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.VerifyCustomTitleField();
        await ItemDetails.ClickBackButton(true);
    });

    it(`word count editor toolbar button [${entity}]`, async () => {
        await BrowserNavigate(url);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await SelectAllAndTypeText(SAMPLE_TEXT_CONTENT);
        await ItemDetails.ClickToolbarButtonByTitle("Words count");
        await ItemDetails.VerifyHtmlToolbarWordCount();
        await ItemDetails.ClickBackButton(true);
    });

    it(`embed video editor toolbar button [${entity}]`, async () => {
        await BrowserNavigate(url);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await ItemDetails.ClickToolbarButtonByTitle("Sitefinity videos");
        await VideosModal.VerifyModalTitle();
        await VideosModal.CancelModal();
        await ItemDetails.ClickBackButton();
        await BrowserWaitForElement(ItemListMap.ImageColumn);
    });

    it(`insert symbol [${entity}]`, async () => {
        await BrowserNavigate(url);
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.ExpandHtmlField();
        await ItemDetails.ClickToolbarButtonByTitle("Insert symbol");
        await ItemDetails.VerifyAndClickSymbolListButton();
        await ItemDetails.ClickBackButton(true);
    });

    it(`applied theme [${entity}]`, async () => {
        await BrowserNavigate(THEME_URL);
        await Theme.SelectTheme("Sample");
        await Theme.UseSelectedTheme();

        await BrowserNavigate(url);
        await ItemList.VerifyThemeButtonColor();
    });

    xit(`spell checker [${entity}]`, async () => {
        await BrowserNavigate(url);
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

    it(`item hooks [${entity}]`, async () => {
        // verify create
        await BrowserNavigate(url);
        await ItemList.ClickOnCreate();
        await ItemDetails.WaitForPublishButton();
        await BrowserVerifyConsoleOutput("new item");
        await ItemDetails.ClickBackButton();

        // verify edit
        await ItemList.ClickOnItem(itemToVerify);
        await ItemDetails.WaitForPublishButton();
        await ItemDetails.FocusHtmlField(); // wait for fields to load
        await BrowserVerifyConsoleOutput(itemToVerify);
    });

    it("custom array of guids field", async () => {
        const dynamicModuleUrl = `${BASE_URL}adminapp/content/${dynamicItemTitlePlural}`;
        const dynamicItemTitle = "Some random title"
        const dynamicItem = {
            typeName: dynamicItemTitlePlural,
            data: {
                "Title": dynamicItemTitle,
                "UrlName": "some-url",
                "ArrayOfGuidsField": ["2c379b03-5427-44bb-8880-d3e8d16e83a5","00beeddf-1fff-43aa-8630-c3fd310d016c"]
            }

        };
        const expectedValue = "2c379b03-5427-44bb-8880-d3e8d16e83a5,00beeddf-1fff-43aa-8630-c3fd310d016c";

        await dynamicModuleOperations.createDynamicModuleItem(dynamicItem);

        await BrowserNavigate(dynamicModuleUrl);
        await ItemList.ClickOnItem(dynamicItemTitle);
        await ItemDetails.VerifyCustomArrayOfGUIDsField(expectedValue);
        await ItemDetails.ClickBackButton(false);
    });
});
