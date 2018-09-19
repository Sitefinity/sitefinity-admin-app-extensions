require("jasmine-expect");
import { PrintPreviewMap } from "./print-preview.map";
import { BrowserWaitForElement } from "../helpers/browser-helpers";

export class PrintPreview {

    static async VerifyPrintPreview(title: string) {
        await BrowserWaitForElement(PrintPreviewMap.PrintPreviewText);
        const previewText = await PrintPreviewMap.PrintPreviewText.getText();
        expect(previewText).toBe(title, "The preview text was rendered but was unexpected");
    }
}
