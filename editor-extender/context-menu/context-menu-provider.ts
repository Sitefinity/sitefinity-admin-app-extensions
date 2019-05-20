import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { EditorContextMenu, EditorContextMenuProps } from "./context-menu";
import { CommandBase } from "./command-button";
import { StaticReactWrapper } from "./static-react-wrapper";

@Injectable()
class ContextMenuProvider implements EditorConfigProvider {
    private static editor;
    private static reactWrapper: StaticReactWrapper<EditorContextMenuProps, EditorContextMenu>;

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof InsertSymbolProvider
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        ContextMenuProvider.editor = editorHost;
        return [];
    }

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
        const selectCallback = configuration.select;
        const cb = () => {
            selectCallback();
            ContextMenuProvider.moveMenuTooltip();
        };
        const node = this.injectTooltip();
        ContextMenuProvider.editor[0].parentNode.appendChild(node);
        configuration.select = cb;
        return configuration;
    }

    /**
     * Injects the holder and the menu tooltip into the editor DOM.
     */
    private injectTooltip() {
        const wrapper = new StaticReactWrapper<EditorContextMenuProps, EditorContextMenu>();
        wrapper.wrappedComponent = EditorContextMenu;
        ContextMenuProvider.reactWrapper = wrapper;

        const node = this.generateDummyHolder();
        wrapper.rootDom = node;
        wrapper.update( {position: {x: 0, y: 0}, commands: this.defineCommands(), isVisible: false} );
        return node;
    }

    /**
     * Caclulates the current selection position.
     */
    private static getSelectionPosition() {
        let x = 0;
        let y = 0;
        const sel = window.getSelection();
        if (sel.rangeCount && sel.type === "Range") {
            const range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects()) {
                range.collapse(true);
                const rect = range.getClientRects()[0];
                if (rect) {
                    y = rect.top;
                    x = rect.left + rect.width / 2;
                }
            }
        }

        return { x, y };
    }

    /**
     * Calculates the position of the menu and sends the values to the component props.
     */
    private static moveMenuTooltip() {
        const position = {x: 0, y: 0};
        const pos = ContextMenuProvider.getSelectionPosition();
        const editorpos = ContextMenuProvider.editor[0].getBoundingClientRect();
        let isVisible = true;
        if (!pos.x || !pos.y) {
            isVisible = false;
        }
        position.x = pos.x - editorpos.x;
        position.y = pos.y - editorpos.y;
        ContextMenuProvider.reactWrapper.update({ position, isVisible });
    }

    /**
     * Generates the root node that would host the context menu.
     */
    private generateDummyHolder() {
        const node = document.createElement("div");
        node.style.position = "absolute";
        node.style.top = "0px";
        node.style.left = "0px";
        node.style.height = "0%";
        node.style.width = "0%";
        node.style.pointerEvents = "box-none";
        return node;
    }

    /**
     * Creates the commands for the context menu.
     */
    private defineCommands(): CommandBase[] {
        const executable = (action) => {
            ContextMenuProvider.editor.getKendoEditor().focus();
            ContextMenuProvider.editor.getKendoEditor().exec(action);
        };

        const bold = {
            icon: "bold",
            execute: () => {
                executable("bold");
            }
        };

        const italic = {
            icon: "italic",
            execute: () => {
                executable("italic");
            }
        };

        const underline = {
            icon: "underline",
            execute: () => {
                executable("underline");
            }
        };

        const sup = {
            icon: "superscript",
            execute: () => {
                executable("superscript");
            }
        };

        const sub = {
            icon: "subscript",
            execute: () => {
                executable("subscript");
            }
        };

        const clean = {
            name: "clear",
            execute: () => {
                executable("cleanFormatting");
            }
        };

        const separator = {name: null, execute: null, isSeparator: true};

        return [bold, italic, underline, separator, sup, sub, separator, clean];
    }
}

export const CONTEXT_MENU_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: ContextMenuProvider
};
