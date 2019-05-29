import { element, by, ElementFinder } from "protractor";

export class EditorPopupMap {
    public static ToolPopup: ElementFinder = element(by.css(".k-ct-popup.symbol-popup"));
    public static SymbolCell: ElementFinder = element.all(by.css(".symbol-cell")).first();
}
