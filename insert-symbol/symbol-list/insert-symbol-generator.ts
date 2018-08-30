
export const DATA_ATTRIBUTE_NAME = "data-value";

/**
 * Represents a helper class for importing a symbol list JSON and  generating html to populate the tool's popup.
 */
export class InsertSymbolGenerator {
    private symbolConfig;

    constructor (symbolList) {
        this.symbolConfig = symbolList;
    }

    /**
     * Generates html from a JSON list of symbol models.
     */
    generateHtml(): string {
        let html = "";

        this.symbolConfig.forEach((symbol: SymbolModel) => {
            html = html + this.generateCell(symbol);
        });

        return html;
    }

    private generateCell(symbol: SymbolModel): string {
        return `<div class="symbol-cell" ${DATA_ATTRIBUTE_NAME}='${symbol.value}' title="${symbol.tooltip}">${symbol.value}</div>`;
    }
}

class SymbolModel {
    name: string;
    value: string;
    escapedValue: string;
    tooltip: string;
}
