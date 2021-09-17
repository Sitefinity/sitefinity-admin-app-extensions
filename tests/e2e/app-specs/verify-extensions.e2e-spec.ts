import { initAuth } from "../helpers/authentication-manager";
import { ItemList } from "../app-elements/item-list.component";
import {
    BrowserNavigate,
    SelectAllAndTypeText,
    BrowserVerifyConsoleOutput,
    BrowserWaitForElement,
    BrowserWaitForTextToBePresent,
    BrowserWaitForElementToBeClickable,
    BrowserGetUrl
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
    CONTENT_PAGE_URL,
    TITLE_VALID_TEXT
} from "../helpers/constants";
import { PrintPreview } from "../app-elements/print-preview.component";
import { ItemDetails } from "../app-elements/item-details.component";
import { VideosModal } from "../app-elements/videos-modal.component";
import { Theme } from "../app-elements/theme.component";
import { ItemListMap } from "../app-elements/item-list.map";
import dynamicModuleOperations from "../setup/dynamic-module-operations";
import { generateModuleMock, generateDynamicItemMock, includeInSiteMock } from "../setup/module-mock";
import { setTypeNamePlural } from "../helpers/set-typename-plural";
import { ItemDetailsMap } from "../app-elements/item-details.map";

const dynamicModuleMock = generateModuleMock();
const dynamicTypeName = setTypeNamePlural(dynamicModuleMock.ContentTypeItemTitle).toLowerCase();
const dynamicItemMock = generateDynamicItemMock(dynamicTypeName, "Some item");
const moduleName = dynamicModuleMock.ContentTypeName;
const includeInSitePayload = includeInSiteMock(moduleName);
let moduleId: string;

const ENTITY_MAP = new Map<string, any>()
    .set(NEWS_TYPE_NAME, {
        url: CONTENT_NEWS_URL,
        title: "Quantum Photo Contest"
    })
    .set(PAGES_TYPE_NAME, {
        url: PAGES_URL,
        title: "Home"
    })
    .set(dynamicTypeName, {
        url: `${CONTENT_PAGE_URL}${dynamicTypeName}`,
        title: dynamicItemMock.data.Title
    });

describe("Verify extensions", () => {
    beforeAll(async (done: DoneFn) => {
        await initAuth(USERNAME, PASSWORD);
        moduleId = await dynamicModuleOperations.initiateDynamicModule(dynamicModuleMock);
        await dynamicModuleOperations.createDynamicModuleItem(dynamicItemMock);
        await dynamicModuleOperations.includeDynamicModuleToSite(includeInSitePayload);
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
            let browserUrl = await BrowserGetUrl();
            await BrowserNavigate(url);
            browserUrl = await BrowserGetUrl();
            await ItemList.VerifyImageColumn();
        });

        it(`print preview [${entity}]`, async () => {
            await ItemList.ClickPrintPreview();
            await PrintPreview.VerifyPrintPreview(itemToVerify);
        });

        // TODO: Add item hooks test for pages when create edit screens are available
    });

    it(`custom title field [${NEWS_TYPE_NAME}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(NEWS_TYPE_NAME).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(NEWS_TYPE_NAME).title);
        await ItemDetails.VerifyCustomTitleField();
        await ItemDetails.ClickBackButton(true);
    });

    it(`word count editor toolbar button [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.FocusHtmlField();
        await SelectAllAndTypeText(SAMPLE_TEXT_CONTENT);
        await ItemDetails.ClickToolbarButtonByTitle("Words count");
        await ItemDetails.VerifyHtmlToolbarWordCount();
        await ItemDetails.ClickBackButton(true);
    });

    it(`embed video editor toolbar button [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.FocusHtmlField();
        await ItemDetails.ClickToolbarButtonByTitle("Sitefinity videos");
        await VideosModal.VerifyModalTitle();
        await VideosModal.CancelModal();
        await ItemDetails.ClickBackButton();
        await BrowserWaitForElement(ItemListMap.ImageColumn);
    });

    it(`insert symbol [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.FocusHtmlField();
        await ItemDetails.ClickToolbarButtonByTitle("Insert symbol", true);
        await ItemDetails.VerifyAndClickSymbolListButton();
        await ItemDetails.ClickBackButton(true);
    });

    it("fields change service", async () => {
        await BrowserNavigate(ENTITY_MAP.get(NEWS_TYPE_NAME).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(NEWS_TYPE_NAME).title);

        await BrowserWaitForElement(ItemDetailsMap.TitleInput);

        await ItemDetailsMap.TitleInput.click();
        await SelectAllAndTypeText(TITLE_VALID_TEXT);

        await BrowserWaitForTextToBePresent(ItemDetailsMap.EditorInternalField, TITLE_VALID_TEXT);
        await ItemDetails.VerifyEditorContent(TITLE_VALID_TEXT);

        await ItemDetails.ClickBackButton(true);
    });

    it(`applied theme [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(THEME_URL);
        await Theme.SelectTheme("Sample");
        await Theme.UseSelectedTheme();

        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.VerifyThemeButtonColor();
    });

    xit(`spell checker [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.FocusHtmlField();
        await ItemDetails.ChangeEditorContent(SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS);
        await ItemDetails.FocusHtmlField();
        await ItemDetails.VerifyHtmlToolbarSpellCheck();
        await ItemDetails.ClickEditorImmutableElement(FIRST_WORD_WITH_ERROR);
        await ItemDetails.ClickEditorPopupMenuButton("Accept correction");
        await ItemDetails.ClickEditorImmutableElement(SECOND_WORD_WITH_ERROR);
        await ItemDetails.ClickEditorPopupMenuButton("Discard");
        await ItemDetails.VerifyEditorContent(SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS);
    });

    it("bulk command", async () => {
        await BrowserNavigate(ENTITY_MAP.get(NEWS_TYPE_NAME).url);
        await ItemList.SelectListRows(2);
        await BrowserWaitForElement(ItemListMap.BulkActionsMenuButton);
        await ItemListMap.BulkActionsMenuButton.click();
        await BrowserWaitForElement(ItemListMap.BulkDropdown);
        await ItemList.ClickActionFromBulkDropdown("List selected items");
        await BrowserVerifyConsoleOutput(["Selected items:"]);
    });

    it("remove column", async () => {
        await BrowserNavigate(ENTITY_MAP.get(NEWS_TYPE_NAME).url);
        await ItemList.VerifyColumnDoesntExist("LAST MODIFIED");
    });

    it("verify image column position in news", async () => {
        await BrowserNavigate(ENTITY_MAP.get(NEWS_TYPE_NAME).url);
        await ItemList.VerifyColumnPosition("Image", 1);
    })

    it(`item hooks [${dynamicTypeName}]`, async () => {
        // verify create
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnCreate();
        await ItemDetails.WaitForPublishButton();
        await BrowserVerifyConsoleOutput(["new item"]);
        await ItemDetails.ClickBackButton();

        // verify edit
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.WaitForPublishButton();
        await ItemDetails.FocusHtmlField(); // wait for fields to load
        await BrowserVerifyConsoleOutput(ENTITY_MAP.get(dynamicTypeName).title);
    });

    it(`custom array of guids field [${dynamicTypeName}]`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.VerifyCustomArrayOfGUIDsField(dynamicItemMock.data.ArrayOfGuidsField.join(","));
        await ItemDetails.ClickBackButton(false);
    });

    it("grid item hooks", async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);

        // onInit, afterViewInit hooks
        const createbutton = await ItemListMap.GetCreateItemButton();
        await BrowserWaitForElement(createbutton);
        await BrowserVerifyConsoleOutput(["Grid items initializing", "After grid init"]);

        // enter edit item, so the grid will be destroyed and onDestroy hook will be calle
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.WaitForPublishButton();

        // destroy hook
        await BrowserVerifyConsoleOutput(["Grid items unloading"]);
    });

    it(`edit item hooks`, async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);
        await ItemDetails.WaitForPublishButton();

        // onInit, afterViewInit hooks
        await BrowserVerifyConsoleOutput(["Item initializing", "After edit item init"]);

        await ItemDetails.FocusHtmlField();
        await ItemDetails.ChangeEditorContent("New content");
        await ItemDetails.ClickMainWorkflowButton();
        await BrowserWaitForElementToBeClickable(ItemDetailsMap.BackButton);
        await BrowserVerifyConsoleOutput(["Item changed"]);

        // item changes hook
        await ItemDetails.ClickBackButton();
        const createbutton = await ItemListMap.GetCreateItemButton();
        await BrowserWaitForElement(createbutton);
        await BrowserVerifyConsoleOutput(["Item unloading"]);
    });

    it("verify custom tree node components", async () => {
        await BrowserNavigate(ENTITY_MAP.get(dynamicTypeName).url);
        await ItemList.ClickOnItem(ENTITY_MAP.get(dynamicTypeName).title);

        await ItemDetails.VerifyCustomTreeNodeComponent();
    })
});
