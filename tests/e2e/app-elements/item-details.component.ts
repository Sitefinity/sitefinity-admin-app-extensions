require("jasmine-expect");
import { browser, protractor, by } from "protractor";
import { ItemDetailsMap } from "./item-details.map";
import { BrowserWaitForElement, BrowserVerifyAlert, BrowserWaitForElementHidden, SelectAllAndTypeText, BrowserVerifyWordCountAlert } from "../helpers/browser-helpers";
import { EditorPopupMap } from "./editor-popup.map";
import { ItemListMap } from "./item-list.map";
import { EC, TIME_TO_WAIT, TITLE_ERROR, TITLE_VALID_TEXT } from "../helpers/constants";
import { ElementHasClass } from "../helpers/common";

export class ItemDetails {
    static async VerifyHtmlToolbarWordCount(): Promise<void> {
        await BrowserVerifyWordCountAlert();
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
        await BrowserWaitForElement(ItemDetailsMap.TitleError);

        // verify title has error
        let titleError = ItemDetailsMap.TitleError;
        expect(await titleError.isPresent()).toBeTruthy("The title field does not have an error");
        const errorContent = await titleError.getText();
        expect(errorContent.trim()).toBe(TITLE_ERROR);

        // verify title has char counter
        const charCounter = ItemDetailsMap.FieldCharCounter(ItemDetailsMap.TitleField);
        let counterPresent = await charCounter.isPresent();
        expect(counterPresent).toBeTrue();
        expect(await ElementHasClass(charCounter, "-error")).toBeTrue();

        const titleInput = ItemDetailsMap.TitleInput;
        await titleInput.click();
        await SelectAllAndTypeText(TITLE_VALID_TEXT);

        // click html field to loose focus from the title
        await ItemDetails.ExpandHtmlField();

        // verify char counter has no error
        const countersFound = await ItemDetailsMap.TitleField.all(by.css(".sf-input__char-counter"));
        counterPresent = countersFound.length > 0;
        expect(counterPresent).toBeFalse();

        // verify title has no error
        titleError = ItemDetailsMap.TitleError;
        const errorPresent = await titleError.isPresent();
        expect(errorPresent).toBeFalse();
    }

    static async VerifyCustomArrayOfGUIDsField(fieldValue: string): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.ArrayOfGUIDsInput);
        let customFieldInput = ItemDetailsMap.ArrayOfGUIDsInput;
        const customFieldContent = await customFieldInput.getAttribute('value');
        expect(customFieldContent.trim()).toBe(fieldValue);
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

    static async ClickToolbarButtonByTitle(buttonTitle: string): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButtonByTitle(buttonTitle));
        const toolbarButton = ItemDetailsMap.ToolbarButtonByTitle(buttonTitle);
        await toolbarButton.click();
    }

    static async VerifyAndClickSymbolListButton(): Promise<void> {
        await BrowserWaitForElement(EditorPopupMap.ToolPopup);
        const editor = ItemDetailsMap.EditorInternalField;
        const contentsBeforeInsert = await editor.getText();

        const symbolButton = EditorPopupMap.SymbolCell;
        await symbolButton.click();

        const contentAfterInsert = await editor.getText();

        // should hide the popup when symbol is clicked
        await BrowserWaitForElementHidden(EditorPopupMap.ToolPopup);

        // should have one more character after the symbol is inserted
        expect(contentAfterInsert.length).toBe(contentsBeforeInsert.length + 1);
    }
}
