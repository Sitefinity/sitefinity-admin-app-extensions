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
const EDIT_MENU_SELECTOR = "sf-edit-menu";
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
enum SelectionDirection {
    topToBottom,
    bottomToTop
}

declare var jQuery: any;

require("!style-loader!css-loader!./switch-text-direction.provider.css");

@Injectable()
class SwitchTextDirectionProvider implements EditorConfigProvider {
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof SwitchTextDirectionProvider
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        this.handleCursorMove(editorHost);

        const SWITCH_LEFT_TO_RIGHT_TOOL: ToolBarItem = {
            name: TOOLBAR_BUTTONS_DATA.LTR.name,
            tooltip: TOOLBAR_BUTTONS_DATA.LTR.tooltip,
            ordinal: 6,
            exec: () => {
                jQuery(EDIT_MENU_SELECTOR).hide();

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
                jQuery(EDIT_MENU_SELECTOR).hide();

                if (!this.tryHandleSelection(editorHost, RTL_CLASS, LTR_CLASS, () => this.handleButtonStylesOnRTLButtonClicked(editorHost))) {
                    const elementContainer: HTMLElement = this.findParent(editorHost);

                    elementContainer.classList.remove(LTR_CLASS);
                    elementContainer.classList.add(RTL_CLASS);
                    this.handleButtonStylesOnRTLButtonClicked(editorHost);
                }
            }
        };

        // Should group the direction buttons once the editor is loaded and focused.
        Observable
            .fromEvent(editorHost.context, "focusin")
            .first()
            .subscribe(() => {
                const toolbar = editorHost.getKendoEditor().toolbar.element;
                groupToolbarButtons(toolbar, RTL_BUTTON_SELECTOR, LTR_BUTTON_SELECTOR, false);
            });

        return [SWITCH_LEFT_TO_RIGHT_TOOL, SWITCH_RIGHT_TO_LEFT_TOOL];
    }

    /**
     * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
     * Otherwise return an empty array.
     * Example: return [ "embed" ];
     * The above code will remove the embed toolbar item from the editor.
     *
     * @returns {string[]}
     * @memberof SwitchTextDirectionProvider
     */
    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     *
     * @param {*} configuration
     * @returns The modified configuration.
     * @memberof SwitchTextDirectionProvider
     */
    configureEditor(configuration: any): any {
        configuration.pasteCleanup.span = false;
        return configuration;
    }

    /**
     * Finds the parent element of the one that is the carret on.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @returns {HTMLElement}
     * @memberof SwitchTextDirectionProvider
     */
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
        if (currentNode.classList.contains(KENDO_EDITOR_CLASS) &&
            currentNode.firstElementChild instanceof HTMLElement &&
            !this.isInlineElement(currentNode.firstElementChild as HTMLElement)) {
            const wrapper: HTMLDivElement = document.createElement("div");
            wrapper.innerHTML = currentNode.innerHTML;
            currentNode.innerHTML = "";
            currentNode.appendChild(wrapper);
            currentNode = wrapper;
        }

        return currentNode;
    }

    /**
     * Make the LTR button selected, and the RTL button unselected.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @memberof SwitchTextDirectionProvider
     */
    private handleButtonStylesOnLTRButtonClicked(editorHost: any) {
        this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
        this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
    }

    /**
     * Make the RTL button selected, and the LTR button unselected.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @memberof SwitchTextDirectionProvider
     */
    private handleButtonStylesOnRTLButtonClicked(editorHost) {
        this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
        this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
    }

    /**
     * Determines if the passed element has display: inline.
     *
     * @private
     * @param {HTMLElement} element The element which will be checked.
     * @returns True if the element is inline, otherwise false.
     * @memberof SwitchTextDirectionProvider
     */
    private isInlineElement(element: HTMLElement) {
        const style = window.getComputedStyle(element, "");
        return style.display === "inline";
    }

    /**
     * Retrieves toolbar button by given class.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @param {string} selector The selector for which the button will be queried.
     * @returns {HTMLElement}
     * @memberof SwitchTextDirectionProvider
     */
    private getToolbarButton(editorHost, selector: string): HTMLElement {
        return editorHost
            .getKendoEditor()
            .toolbar
            .element[0]
            .querySelector(selector)
            .parentElement;
    }

    /**
     * When the carret's position is changed by clicking in the editor or
     * by navigating with the arrows, the toolbar's buttons should have
     * the correct selected state, depending on the direction of the element
     * on which the carret is.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @memberof SwitchTextDirectionProvider
     */
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

    /**
     * When there is selection, all the selected nodes should have the specified
     * direction.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @param {string} classToAdd The class that should be added on each of the nodes that are in the selection.
     * @param {string} classToRemove The class that should be removed on each of the nodes that are in the selection.
     * @param {Function} doneCb Function that is called when the processing of the selection is done. It's called only when there is particular selection.
     * @returns {boolean}
     * @memberof SwitchTextDirectionProvider
     */
    private tryHandleSelection(editorHost, classToAdd: string, classToRemove: string, doneCb: Function): boolean {
        const selection = editorHost.getKendoEditor().getSelection();
        const selectionDirection = this.getSelectionDirection(selection);
        const baseNode = selection.baseNode || selection.anchorNode;

        if (!selection.isCollapsed && selection.focusNode !== baseNode) {
            let node = selection.focusNode;

            while (selection.containsNode(node)) {
                node.parentElement.classList.remove(classToRemove);
                node.parentElement.classList.add(classToAdd);

                if (selectionDirection === SelectionDirection.topToBottom) {
                    if (!node.parentElement.previousElementSibling || !node.parentElement.previousElementSibling.firstChild) {
                        break;
                    }

                    node = node.parentElement.previousElementSibling.firstChild;
                } else {
                    if (!node.parentElement.nextElementSibling || !node.parentElement.nextElementSibling.firstChild) {
                        break;
                    }

                    node = node.parentElement.nextElementSibling.firstChild;
                }
            }

            doneCb();
            return true;
        }

        return false;
    }

    /**
     * Determines when the selections starts from top to bottom
     * or from bottom to top.
     *
     * @private
     * @param {*} selection Current selection.
     * @returns {SelectionDirection} Selection's direction.
     * @memberof SwitchTextDirectionProvider
     */
    private getSelectionDirection(selection): SelectionDirection {
        const focusNode: HTMLElement = selection.focusNode;

        // Workaround for firefox. The slection API does not provide baseNode. The alternative is anchorNode.
        const baseNode: HTMLElement = selection.baseNode || selection.anchorNode;
        const positionA = focusNode.compareDocumentPosition(baseNode);
        const positionB = baseNode.compareDocumentPosition(focusNode);
        const isBefore = positionB > positionA;

        if (isBefore) {
            return SelectionDirection.topToBottom;
        }

        return SelectionDirection.bottomToTop;
    }
}

export const SWITCH_TEXT_DIRECTION_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SwitchTextDirectionProvider
};
