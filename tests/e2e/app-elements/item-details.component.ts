require("jasmine-expect");
import { ItemDetailsMap } from "./item-details.map";
import { BrowserWaitForElement, BrowserVerifyAlert } from "../helpers/browser-helpers";

export class ItemDetails {

    static async VerifyHtmlToolbarWordCount(): Promise<void> {
        const wordCountButtonClass = "k-i-Words-count";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(wordCountButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(wordCountButtonClass);
        await toolbarButton.click();
        await BrowserVerifyAlert("Words count: 1115");
    }

    static async ClickHtmlToolbarSitefinityVideos(): Promise<void> {
        const wordCountButtonClass = "k-i-Sitefinity-videos";
        await BrowserWaitForElement(ItemDetailsMap.ToolbarButton(wordCountButtonClass));
        const toolbarButton = ItemDetailsMap.ToolbarButton(wordCountButtonClass);
        await toolbarButton.click();
    }

    static async ClickOnHtmlField(): Promise<void>  {
        await BrowserWaitForElement(ItemDetailsMap.HtmlField);
        const htmlField = ItemDetailsMap.HtmlField;
        await htmlField.click();
    }

    static async VerifyCustomTitleField(): Promise<void> {
        await BrowserWaitForElement(ItemDetailsMap.TitleField);
        expect(await ItemDetailsMap.ExtendedTitleField.isPresent()).toBeTruthy("The title field extension class was not found");
    }
}
