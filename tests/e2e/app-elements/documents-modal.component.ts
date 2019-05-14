import { BrowserWaitForElement } from "../helpers/browser-helpers";
import { VideosModalMap } from "./videos-modal.map";
import { by, element, ElementFinder } from 'protractor';

require("jasmine-expect");

export class DocumentsModal {
    private static expectedModalTitle = "Select a document";    
    private static DocumenElement: ElementFinder = element(by.css("sf-thumbnail"));
    private static EditorElement: ElementFinder = element(by.css("sf-editor"));

    static async CancelModal(): Promise<void> {
        await BrowserWaitForElement(VideosModalMap.CancelButton);
        const cancelButton = VideosModalMap.CancelButton;
        await cancelButton.click();
    }

    static async UseSelected(): Promise<void> {
        const documentText = await DocumentsModal.DocumenElement.getAttribute("ng-reflect-title");
        await BrowserWaitForElement(VideosModalMap.UseSelectedButton);
        const useSelectedButton = VideosModalMap.UseSelectedButton;
        await useSelectedButton.click();

        await BrowserWaitForElement(DocumentsModal.EditorElement);
       
        const editorText = await DocumentsModal.EditorElement.getText();

        expect(editorText).toContain(documentText);
    }

    static async VerifyModalTitle(): Promise<void> {
        await BrowserWaitForElement(VideosModalMap.TitleField);
        const actualModalTitle = await VideosModalMap.TitleField.getText();
        expect(actualModalTitle).toBe(this.expectedModalTitle, "Unexpected embed Sitefinity videos modal title");
    }

    static async ClickOnThumbnail(): Promise<void> {
        await BrowserWaitForElement(DocumentsModal.DocumenElement);
        await DocumentsModal.DocumenElement.click();
    }
}
