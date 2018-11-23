require("jasmine-expect");
import { browser } from "protractor";
import { protractor } from "protractor/built/ptor";
import { ItemDetailsMap } from "./item-details.map";
import { BrowserWaitForElement, BrowserVerifyAlert, BrowserWaitForElementHidden } from "../helpers/browser-helpers";
import { EditorPopupMap } from "./editor-popup.map";
import { EC } from "../helpers/constants";
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

    static async SelectAllAndPasteText(text: string): Promise<void> {
        await browser.actions().keyDown(protractor.Key.CONTROL).sendKeys("a").perform();
        await browser.actions().keyUp(protractor.Key.CONTROL).perform();
        await browser.actions().sendKeys(text).perform();
    }

    static async VerifyCustomTitleField(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.TitleField);
        expect(await ItemDetailsMap.ExtendedTitleField.isPresent()).toBeTruthy("The title field extension class was not found");
    }

    static async ClickBackButton(handleAlert: boolean = false): Promise<void> {
        await browser.wait(EC.elementToBeClickable(ItemListMap.BackButton), 2000, "Back button is not clickable");
        expect(await ItemListMap.BackButton.isDisplayed()).toBeTruthy();
        await ItemListMap.BackButton.click();

        if (handleAlert === true) {
            const alert = browser.switchTo().alert();
            await alert.accept();
        }
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
