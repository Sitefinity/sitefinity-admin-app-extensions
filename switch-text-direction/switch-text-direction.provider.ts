import { Injectable, ClassProvider } from "@angular/core";
import { EditorConfigProvider, ToolBarItem, TOOLBARITEMS_TOKEN, groupToolbarButtons } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs";

// These classes are defined in the application's styles.
const RTL_CLASS = "-sf-direction-rtl";
const LTR_CLASS = "-sf-direction-ltr";
const SELECTED_CLASS = "k-state-selected";
const LTR_BUTTON_SELECTOR = ".k-i-Left-to-right";
const RTL_BUTTON_SELECTOR = ".k-i-Right-to-left";
const KENDO_EDITOR_CLASS = "k-editor";
const SF_EDITOR_TAG_NAME = "sf-editor";
const TOOLBAR_BUTTONS_DATA = {
    LTR: {
        name: "Left-to-right",
        tooltip: "Left-to-right"
    },
    RTL: {
        name: "Right-to-left",
        tooltip: "Right-to-left"
    }
};
const arrowKeycodes = new Set([37, 38, 39, 40]);

require("!style-loader!css-loader!./switch-text-direction.provider.css");

@Injectable()
class SwitchTextDirectionProvider implements EditorConfigProvider {
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        this.handleCursorMove(editorHost);

        const SWITCH_LEFT_TO_RIGHT_TOOL: ToolBarItem = {
            name: TOOLBAR_BUTTONS_DATA.LTR.name,
            tooltip: TOOLBAR_BUTTONS_DATA.LTR.tooltip,
            ordinal: 6,
            exec: () => {
                if (!this.tryHandleSelection(editorHost, LTR_CLASS, RTL_CLASS, () => this.handleButtonStylesOnLTRButtonClicked(editorHost))) {
                    const elementContainer: HTMLElement = this.findParent(editorHost);

                    elementContainer.classList.remove(RTL_CLASS);
                    elementContainer.classList.add(LTR_CLASS);
                    this.handleButtonStylesOnLTRButtonClicked(editorHost);
                }
            }
        };

        const SWITCH_RIGHT_TO_LEFT_TOOL: ToolBarItem = {
            name: TOOLBAR_BUTTONS_DATA.RTL.name,
            tooltip:  TOOLBAR_BUTTONS_DATA.RTL.tooltip,
            ordinal: 7,
            exec: () => {
                if (!this.tryHandleSelection(editorHost, RTL_CLASS, LTR_CLASS, () => this.handleButtonStylesOnRTLButtonClicked(editorHost))) {
                    const elementContainer: HTMLElement = this.findParent(editorHost);

                    elementContainer.classList.remove(LTR_CLASS);
                    elementContainer.classList.add(RTL_CLASS);
                }
            }
        };

        Observable
            .fromEvent(editorHost.context, "focusin")
            .first()
            .subscribe(() => {
                const toolbar = editorHost.getKendoEditor().toolbar.element;
                groupToolbarButtons(toolbar, RTL_BUTTON_SELECTOR, LTR_BUTTON_SELECTOR, false);
            });

        return [SWITCH_LEFT_TO_RIGHT_TOOL, SWITCH_RIGHT_TO_LEFT_TOOL];
    }

    getToolBarItemsNamesToRemove(): string[] {
        // If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
        // Otherwise return an empty array.
        // Example: return [ "embed" ];
        // The above code will remove the embed toolbar item from the editor.
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        configuration.pasteCleanup.span = false;
        return configuration;
    }

    private findParent(editorHost): HTMLElement {
        const editor = editorHost.getKendoEditor();
        let currentNode: HTMLElement = editor.getRange().startContainer;

        if (currentNode.nodeName === "#text") {
            currentNode = currentNode.parentElement;
        }

        // When the editor returns itself as current element, we should find the first child
        // where the actual content is. The hierarchy is sf-editor -> div.k-editor -> actual content
        if (currentNode.tagName && currentNode.tagName.toLocaleLowerCase() === SF_EDITOR_TAG_NAME) {
            return currentNode.firstElementChild.firstElementChild as HTMLElement;
        }

        while (this.isInlineElement(currentNode)) {
            currentNode = currentNode.parentElement;
        }

        // When the editor returns div.k-editor that means there isn't any formatting,
        // so we have to wrap the raw content in some element because otherwise we add
        // the class globally for the whole editor.
        if (currentNode.classList.contains(KENDO_EDITOR_CLASS)) {
            const wrapper: HTMLDivElement = document.createElement("div");
            wrapper.innerHTML = currentNode.innerHTML;
            currentNode.innerHTML = "";
            currentNode.appendChild(wrapper);
            currentNode = wrapper;
        }

        return currentNode;
    }

    private handleButtonStylesOnLTRButtonClicked(editorHost) {
        this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
        this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
    }

    private handleButtonStylesOnRTLButtonClicked(editorHost) {
        this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
        this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
    }

    private isInlineElement(element: HTMLElement) {
        const style = window.getComputedStyle(element, "");
        return style.display === "inline";
    }

    private getToolbarButton(editorHost, selector: string): HTMLElement {
        return editorHost
            .getKendoEditor()
            .toolbar
            .element[0]
            .querySelector(selector)
            .parentElement;
    }

    private handleCursorMove(editorHost) {
        const editorElement: HTMLElement = editorHost.context;
        const toggleToolbarButtonsSelectedClasses = () => {
            let parent = this.findParent(editorHost);

            if (!parent) {
                return;
            }

            // When the parent doesn't have classes, this means it is just a kendo wrapper.
            if (!parent.classList.length) {
                parent = parent.parentElement;
            }

            if (parent.classList.contains(LTR_CLASS)) {
                this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
                this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            } else if (parent.classList.contains(RTL_CLASS) && !parent.classList.contains(KENDO_EDITOR_CLASS)) {
                this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
                this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            } else {
                this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
                this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            }
        };

        editorElement.addEventListener("click", () => toggleToolbarButtonsSelectedClasses());
        editorElement.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (arrowKeycodes.has(ev.keyCode)) {
                toggleToolbarButtonsSelectedClasses();
            } else if (!editorElement.textContent) {
                this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
                this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            }
        });
    }

    private tryHandleSelection(editorHost, classToAdd: string, classToRemove: string, doneCb: Function): boolean {
        const selection = editorHost.getKendoEditor().getSelection();

        if (!selection.isCollapsed) {
            let node = selection.focusNode;

            while (selection.containsNode(node)) {
                node.parentElement.classList.remove(classToRemove);
                node.parentElement.classList.add(classToAdd);

                if (!node.parentElement.nextElementSibling || !node.parentElement.nextElementSibling.firstChild) {
                    break;
                }

                node = node.parentElement.nextElementSibling.firstChild;
            }

            doneCb();
            return true;
        }

        return false;
    }
}

export const SWITCH_TEXT_DIRECTION_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SwitchTextDirectionProvider
};
