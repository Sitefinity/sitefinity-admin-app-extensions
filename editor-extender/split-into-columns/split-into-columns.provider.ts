import { Injectable, ClassProvider } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ToolBuilder, ToolConfig } from "../../helpers/tool-builder";

require("!style-loader!css-loader!./split-into-columns.provider.css");

const TOOLBAR_BUTTON_DATA = {
    DEFAULT: {
        name: "splitintocolumns",
        tooltip: "Split into columns"
    }
};

declare var kendo;

@Injectable()
class SplitIntoColumnsProvider implements EditorConfigProvider {
    /**
     * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
     * Otherwise return an empty array.
     * Example: return [ "embed" ];
     * The above code will remove the embed toolbar item from the editor.
     * Documentation where you can find all tools' names: https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools
     *
     * @returns {string[]}
     * @memberof InsertSymbolProvider
     */
    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration overview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     *
     * @param {*} configuration
     * @returns The modified configuration.
     * @memberof InsertSymbolProvider
     */
    configureEditor(configuration: any) {
        configuration.serialization.semantic = true;

        const base = configuration.select;
        configuration.select = (e) => {
            base();
            this.selected(e);
        }
        return configuration;
    }

    selected(e) {
        console.log(e);
    }
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof InsertSymbolProvider
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        /**
         * The custom tool.
         */
        const DEFAULT_TOOL: ToolBarItem = {
            name: TOOLBAR_BUTTON_DATA.DEFAULT.name,
            tooltip: TOOLBAR_BUTTON_DATA.DEFAULT.tooltip,
            ordinal: 9,
            exec: () => { return; }
        };

        this.configureInsertSymbolTool();
        return [DEFAULT_TOOL];
    }

    private configureInsertSymbolTool() {
        const buttonTemplate = kendo.ui.editor.EditorUtils.buttonTemplate;
        const NS = "kendoEditor";

        const popupTemplateGenerator = function () {
            return `<div class='k-ct-popup split-popup'>
                        <div class='k-status'>Choose column layout</div>
                        <div data-value='1'>One</div>
                        <div data-value='2'>Two</div>
                        <div data-value='3'>Three</div>
                    </div>`;
        };

        const config: ToolConfig = {
            _activate: function () {
                let that = this;
                const element = that.popup().element;

                element.autoApplyNS(NS).on("down", function (e) {
                    e.preventDefault();
                    const selectedLayout = e.target;
                    const columnsToSplit = selectedLayout.getAttribute("data-value");
                    that._exec(columnsToSplit);
                });
            },
            _exec: function (columns) {
                const selection = this._editor.getSelection();
                const parent = selection.focusNode.parentElement;
                const parentStyle = parent.style;
                if (parent.tagName === "SPAN") {
                    parent.style.display = "inline-block";
                }
                if (selection.type === "Range") {
                    const text = selection.toString();
                    // TODO this won't work with multiple occurences
                    // replace original div

                    const p = document.createElement("p");
                    p.innerHTML = text;
                    p.style.columnCount = columns;
                    this._editor.exec("inserthtml", { value: p.outerHTML, skipCleaners: true });
                    return;
                }
                // if (selection.focusNode.data < selection.focusNode.parentElement.innerText) {

                // }
                // if (!!parentStyle.columnCount) {
                //     // already has a column count
                //     return;
                // }
                parentStyle.columnCount = columns;
                this._editor.trigger("change");

                this.popup().close();
            },
            _close: function () {
                this.popup().element.off("." + NS);
            }
        };

        const insertSymbolTool = ToolBuilder.createPopupTool(kendo, TOOLBAR_BUTTON_DATA.DEFAULT.name, config, null, popupTemplateGenerator);

        ToolBuilder.registerTool(kendo, insertSymbolTool, TOOLBAR_BUTTON_DATA.DEFAULT.name, buttonTemplate, true);
    }
}

export const SPLIT_INTO_COLUMNS_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: SplitIntoColumnsProvider
};
