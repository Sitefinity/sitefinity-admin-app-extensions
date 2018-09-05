import { BrowserWaitForElement } from "../helpers/browser-helpers";
import { VideosModalMap } from "./videos-modal.map";

require("jasmine-expect");

export class VideosModal {
    private static expectedModalTitle = "Select videos";

    static async CancelModal(): Promise<void> {
        await BrowserWaitForElement(VideosModalMap.CancelButton);
        const cancelButton = VideosModalMap.CancelButton;
        await cancelButton.click();
    }

    static async VerifyModalTitle(): Promise<void> {
        await BrowserWaitForElement(VideosModalMap.TitleField);
        const actualModalTitle = await VideosModalMap.TitleField.getText();
        expect(actualModalTitle).toBe(this.expectedModalTitle, "Unexpected embed Sitefinity videos modal title");
    }
}
