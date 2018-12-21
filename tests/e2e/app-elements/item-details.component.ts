require("jasmine-expect");
import { browser } from "protractor";
import { ItemDetailsMap } from "./item-details.map";
import { EC, TIME_TO_WAIT } from "../helpers/constants";
import { BrowserWaitForElement, BrowserVerifyAlert, BrowserWaitForElementHidden } from "../helpers/browser-helpers";
import { EditorPopupMap } from "./editor-popup.map";
import { ItemListMap } from "./item-list.map";

export class ItemDetails {
    static async VerifyHtmlToolbarWordCount(expectedContent: string): Promise<void> {
        const expectedCount = expectedContent.split(" ").length;
        await BrowserVerifyAlert(`Words count: ${expectedCount}`);
    }

    static async ExpandHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.HtmlFieldExpandButton);
        const htmlFieldExpandButton = ItemDetailsMap.HtmlFieldExpandButton;
        await htmlFieldExpandButton.click();
    }

    static async VerifyCustomTitleField(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.ExtendedTitleField);
        expect(await ItemDetailsMap.ExtendedTitleField.isPresent()).toBeTruthy("The title field extension class was not found");
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
