import { element, by, ElementFinder } from "protractor";

export class EditorPopupMap {
    public static ToolPopup: ElementFinder = element(by.css("div.k-ct-popup.symbol-popup"));

    public static SymbolCellElement(symbolTitle: string): ElementFinder {
        const elementFinder = element(by.css(`div.symbol-cell[title="${symbolTitle}"]`));
        return elementFinder;
    }
}
