require("jasmine-expect");
import { browser, protractor, by, element } from "protractor";
import { ItemDetailsMap } from "./item-details.map";
import { BrowserWaitForElement, BrowserVerifyAlert, BrowserWaitForElementHidden, SelectAllAndTypeText, BrowserWaitForElementToBeClickable } from "../helpers/browser-helpers";
import { EditorPopupMap } from "./editor-popup.map";
import { ItemListMap } from "./item-list.map";
import { EC, TIME_TO_WAIT, TITLE_ERROR, TITLE_VALID_TEXT } from "../helpers/constants";
import { ElementHasClass } from "../helpers/common";

export class ItemDetails {
    static async VerifyHtmlToolbarWordCount(): Promise<void> {
        await BrowserVerifyAlert(/Words count: \d+/);
    }

    static async VerifyHtmlToolbarSpellCheck(): Promise<void> {
        const spellCheckButtonTitle = "Spell check";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButtonByTitle(spellCheckButtonTitle));
        const toolbarButton = ItemDetailsMap.ToolbarButtonByTitle(spellCheckButtonTitle);
        await toolbarButton.click();
        await BrowserVerifyAlert(`Access denied due to invalid subscription key. Make sure to provide a valid key for an active subscription. Contact your administrator to resolve this issue.`);
    }

    static async VerifyEditorContent(expectedContent: string): Promise<void> {
        const editor = ItemDetailsMap.EditorInternalField;
        const content = await editor.getText();
        expect(content).toBe(expectedContent);
    }

    static async ChangeEditorContent(newContent: string) {
        const viewHTMLButtonTitle = "View HTML";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButtonByTitle(viewHTMLButtonTitle));
        const toolbarButton = ItemDetailsMap.ToolbarButtonByTitle(viewHTMLButtonTitle);
        await toolbarButton.click();
        await BrowserWaitForElement(ItemDetailsMap.MonacoEditor);
        const monacoEditor = ItemDetailsMap.MonacoEditor;
        await monacoEditor.click();
        await SelectAllAndTypeText(newContent);
        await browser.actions().sendKeys(protractor.Key.DELETE).perform();
        await browser.actions().sendKeys(protractor.Key.DELETE).perform();
        const doneButton = ItemDetailsMap.DoneButton;
        await doneButton.click();
        await BrowserWaitForElement(ItemDetailsMap.PublishButton);
    }

    static async WaitForPublishButton(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.PublishButton);
    }

    static async ClickMainWorkflowButton(buttonName: string = "Publish"): Promise<void> {
        const button = element(by.cssContainingText("button", buttonName));

        await BrowserWaitForElement(button);
        return button.click();
    }

    static async ClickHtmlToolbarSitefinityVideos(): Promise<void> {
        const wordCountButtonTitle = "Words count";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButtonByTitle(wordCountButtonTitle));
        const toolbarButton = ItemDetailsMap.ToolbarButtonByTitle(wordCountButtonTitle);
        await toolbarButton.click();
    }

    static async ExpandHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.HtmlFieldExpandButton);
        const htmlFieldExpandButton = ItemDetailsMap.HtmlFieldExpandButton;
        await htmlFieldExpandButton.click();
    }

    static async FocusHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.EditorInternalField);
        const editor = ItemDetailsMap.EditorInternalField;
        await editor.click();
    }

    static async VerifyCustomTitleField(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.TitleField);

        // Click title to trigger validation
        let titleInput = ItemDetailsMap.TitleInput;
        await titleInput.click();

        // Click navigation header loose focus from the title and verify validation error
        await ItemDetailsMap.HeaderTitle.click();
        await BrowserWaitForElement(ItemDetailsMap.TitleError);

        let titleError = ItemDetailsMap.TitleError;
        await browser.wait(EC.presenceOf(titleError), TIME_TO_WAIT, "The title field does not have an error");

        const errorContent = await titleError.getText();
        expect(errorContent.trim()).toBe(TITLE_ERROR);

        // verify title has char counter
        const charCounter = ItemDetailsMap.FieldCharCounter(ItemDetailsMap.TitleField);
        await browser.wait(EC.presenceOf(charCounter), TIME_TO_WAIT, "The title field does not have an error");

        const isError = await ElementHasClass(charCounter, "-error");
        expect(isError).toBe(true, "The character counter element doesn't have the error class set");

        titleInput = ItemDetailsMap.TitleInput;
        await titleInput.click();
        await SelectAllAndTypeText(TITLE_VALID_TEXT);

        // Click navigation header loose focus from the title
        await ItemDetailsMap.HeaderTitle.click();

        // verify char counter has no error
        const countersFindExpression = ItemDetailsMap.TitleField.element(by.css(".sf-input__char-counter"));
        await browser.wait(EC.not(EC.visibilityOf(countersFindExpression)), TIME_TO_WAIT, "Counter still visible");

        // verify title has no error
        titleError = ItemDetailsMap.TitleError;
        await browser.wait(EC.not(EC.visibilityOf(titleError)), TIME_TO_WAIT, "Custom extension error is still present");
    }

    static async VerifyCustomArrayOfGUIDsField(fieldValue: string): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.ArrayOfGUIDsInput);
        let customFieldInput = ItemDetailsMap.ArrayOfGUIDsInput;
        const customFieldContent = await customFieldInput.getAttribute('value');
        expect(customFieldContent.trim()).toBe(fieldValue);
    }

    static async VerifyCustomTreeNodeComponent(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.AddRelatedDataNewsItemsButton);
        await ItemDetailsMap.AddRelatedDataNewsItemsButton.click();
        await BrowserWaitForElement(ItemDetailsMap.FirstRelatedDataItem);
        const createdOn = await ItemDetailsMap.FirstRelatedDataItem.element(by.css("span[data-sftest=\"custom-created-by\"]"));
        const createdBy = await ItemDetailsMap.FirstRelatedDataItem.element(by.css("span[data-sftest=\"custom-created-on\"]"));

        expect(createdOn).toBeTruthy();
        expect(createdBy).toBeTruthy();
    }

    static async ClickBackButton(acceptAlert: boolean = false): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.BackButton);
        await ItemDetailsMap.BackButton.click();

        if (acceptAlert === true) {
            browser.waitForAngularEnabled(false);
            await browser.wait(EC.alertIsPresent(), TIME_TO_WAIT, "Expected alert is not shown.");
            await browser.switchTo().alert().accept();
            await BrowserWaitForElement(ItemListMap.TitleTag);
            browser.waitForAngularEnabled(true);
        }
    }

    static async ClickEditorImmutableElement(elementText: string) {
        const element = ItemDetailsMap.EditorImmutableElement(elementText);
        await element.click();
        await BrowserWaitForElement(ItemDetailsMap.EditorCustomEditMenu);
    }

    static async ClickEditorPopupMenuButton(buttonTitle: string) {
        const element = ItemDetailsMap.EditorMenuButton(buttonTitle);
        await element.click();
        await BrowserWaitForElementHidden(ItemDetailsMap.EditorCustomEditMenu);
    }

    static async ClickToolbarButtonByTitle(buttonTitle: string, waitForAnimation: boolean = false): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButtonByTitle(buttonTitle));
        const toolbarButton = ItemDetailsMap.ToolbarButtonByTitle(buttonTitle);
        await toolbarButton.click();

        if (waitForAnimation) {
            // Implicit wait is needed because many of these buttons have kendo animations causing instability
            await browser.sleep(1000);
        }
    }

    static async VerifyAndClickSymbolListButton(): Promise<void> {
        await BrowserWaitForElement(EditorPopupMap.ToolPopup);
        const editor = ItemDetailsMap.EditorInternalField;
        const contentsBeforeInsert = await editor.getText();

        const symbolButton = EditorPopupMap.SymbolCellElement("QUOTATION MARK");
        await BrowserWaitForElementToBeClickable(symbolButton);
        await symbolButton.click();

        const contentAfterInsert = await editor.getText();

        // should hide the popup when symbol is clicked
        await BrowserWaitForElementHidden(EditorPopupMap.ToolPopup);

        // should have one more character after the symbol is inserted
        expect(contentAfterInsert.length).toBe(contentsBeforeInsert.length + 1);
    }
}
