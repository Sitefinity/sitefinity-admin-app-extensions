require("jasmine-expect");
import { browser } from "protractor";
import { ItemDetailsMap } from "./item-details.map";
import { BrowserWaitForElement, BrowserVerifyAlert, BrowserWaitForElementHidden, SelectAllAndPasteText } from "../helpers/browser-helpers";
import { EditorPopupMap } from "./editor-popup.map";
import { ItemListMap } from "./item-list.map";

export class ItemDetails {
    static async VerifyHtmlToolbarWordCount(expectedContent: string): Promise<void> {
        const wordCountButtonClass = "k-i-Words-count";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(wordCountButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(wordCountButtonClass);
        await toolbarButton.click();
        const expectedCount = expectedContent.split(" ").length;
        await BrowserVerifyAlert(`Words count: ${expectedCount}`);
    }

    static async VerifyHtmlToolbarSpellCheck(): Promise<void> {
        const spellCheckButtonClass = "k-i-Spell-check";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(spellCheckButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(spellCheckButtonClass);
        await toolbarButton.click();
        await BrowserVerifyAlert(`Access denied due to invalid subscription key. Make sure to provide a valid key for an active subscription. Contact your administrator to resolve this issue.`);
    }

    static async VerifyEditorContent(expectedContent: string): Promise<void> {
        const editor = ItemDetailsMap.EditorInternalField;
        const content= await editor.getText();
        expect(content).toBe(expectedContent);
    }

    static async ChangeEditorContent(newContent: string) {
        const viewHTMLButtonClass = "k-i-html";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(viewHTMLButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(viewHTMLButtonClass);
        await toolbarButton.click();
        await BrowserWaitForElement(ItemDetailsMap.MonacoEditor);
        const monacoEditor = ItemDetailsMap.MonacoEditor;
        await monacoEditor.click();
        await SelectAllAndPasteText(newContent);
        const doneButton = ItemDetailsMap.DoneButton;
        await doneButton.click();
        await BrowserWaitForElement(ItemDetailsMap.PublishButton);
    }

    static async ClickHtmlToolbarSitefinityVideos(): Promise<void> {
        const wordCountButtonClass = "k-i-Sitefinity-videos";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(wordCountButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(wordCountButtonClass);
        await toolbarButton.click();
    }

    static async ExpandHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.HtmlFieldExpander);
        const htmlField = ItemDetailsMap.HtmlFieldExpander;
        await htmlField.click();
    }

    static async FocusHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.EditorInternalField);
        const editor = ItemDetailsMap.EditorInternalField;
        await editor.click();
    }

    static async VerifyCustomTitleField(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.TitleField);
        expect(await ItemDetailsMap.ExtendedTitleField.isPresent()).toBeTruthy("The title field extension class was not found");
    }

    static async ClickBackButton(acceptAlert: boolean = false): Promise<void> {
        await BrowserWaitForElement(ItemListMap.BackButton);
        await ItemListMap.BackButton.click();

        if (acceptAlert === true) {
            const alert = browser.switchTo().alert();
            await alert.accept();
        }
    }

    static async ClickEditorImmutableElement(elementText: string) {
        const element = ItemDetailsMap.EditorImmutableElement(elementText);
        await element.click();
        await BrowserWaitForElement(ItemDetailsMap.EditorCustomEditMenu);
    }

    static async ClickEditorMenuButton(buttonTitle: string) {
        const element = ItemDetailsMap.EditorMenuButton(buttonTitle);
        await element.click();
        await BrowserWaitForElementHidden(ItemDetailsMap.EditorCustomEditMenu);
    }

    static async VerifyAndClickSymbolListButton(): Promise<void> {
        const symbolListButtonClass = "k-i-insertsymbol";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(symbolListButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(symbolListButtonClass);
        await toolbarButton.click();
        await BrowserWaitForElement(EditorPopupMap.ToolPopup);
        const symbolButton = EditorPopupMap.SymbolCell;
        const editor = ItemDetailsMap.EditorInternalField;

        const contents = await editor.getText();
        await symbolButton.click();
        const contentAfterInsert = await editor.getText();
        // should hide the popup when symbol is clicked
        await BrowserWaitForElementHidden(EditorPopupMap.ToolPopup);

        // should have one more character after the symbol is inserted
        expect(contents.length).toBe(contentAfterInsert.length - 1);
    }
}
