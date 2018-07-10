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
                const ltrButtonParent = jQuery(LTR_BUTTON_SELECTOR).parent()[0];
                this.handleExec(ltrButtonParent, editorHost, LTR_CLASS, () => this.handleButtonStylesOnLTRButtonClicked(editorHost));
            }
        };

        const SWITCH_RIGHT_TO_LEFT_TOOL: ToolBarItem = {
            name: TOOLBAR_BUTTONS_DATA.RTL.name,
            tooltip:  TOOLBAR_BUTTONS_DATA.RTL.tooltip,
            ordinal: 7,
            exec: () => {
                const rtlButtonParent = jQuery(RTL_BUTTON_SELECTOR).parent()[0];
                this.handleExec(rtlButtonParent, editorHost, RTL_CLASS, () => this.handleButtonStylesOnRTLButtonClicked(editorHost));
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
        if (currentNode.classList.contains(KENDO_EDITOR_CLASS)) {
            const wrapper: HTMLParagraphElement = document.createElement("p");
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
        const style = getComputedStyle(element, "");
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
                this.handleButtonStylesOnLTRButtonClicked(editorHost);
            } else if (parent.classList.contains(RTL_CLASS) && !parent.classList.contains(KENDO_EDITOR_CLASS)) {
                this.handleButtonStylesOnRTLButtonClicked(editorHost);
            } else {
                this.turnOffSelectedButtons(editorHost);
            }
        };

        editorElement.addEventListener("click", () => toggleToolbarButtonsSelectedClasses());
        editorElement.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (arrowKeycodes.has(ev.keyCode)) {
                toggleToolbarButtonsSelectedClasses();
            } else if (!editorElement.textContent) {
                this.turnOffSelectedButtons(editorHost);
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
     * @param {Function} doneCb Function that is called when the processing of the selection is done. It's called only when there is particular selection.
     * @returns {boolean}
     * @memberof SwitchTextDirectionProvider
     */
    private tryHandleSelection(toolbarButton, editorHost, classToAdd: string, doneCb: Function): boolean {
        const selection = editorHost.getKendoEditor().getSelection();
        const selectionDirection = this.getSelectionDirection(selection);
        const baseNode = selection.baseNode || selection.anchorNode;

        if (!selection.isCollapsed && selection.focusNode !== baseNode) {
            let node = selection.focusNode;

            while (selection.containsNode(node)) {
                if (toolbarButton.classList.contains(SELECTED_CLASS)) {
                    this.removeDirection(toolbarButton, node.parentElement, classToAdd);
                } else {
                    this.setDirection(node.parentElement, classToAdd);
                }

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

    /**
     * Handles toolbar button click.
     *
     * @private
     * @param {*} toolbarButton kendo toolbar button for rtl or ltr direction.
     * @param {*} editorHost The Kendo's editor object.
     * @param {string} dirClassToAdd Text direction class that will be added to the current element or the elements in the selection.
     * @param {Function} applyButtonStyles Function that applies styles to the toolbar buttons.
     * @memberof SwitchTextDirectionProvider
     */
    private handleExec(toolbarButton, editorHost, dirClassToAdd: string, applyButtonStyles: Function) {
        jQuery(EDIT_MENU_SELECTOR).hide();

        if (!this.tryHandleSelection(toolbarButton, editorHost, dirClassToAdd, () => applyButtonStyles())) {
            const elementContainer: HTMLElement = this.findParent(editorHost);

            if (toolbarButton.classList.contains(SELECTED_CLASS)) {
                this.removeDirection(toolbarButton, elementContainer, dirClassToAdd);
            } else {
                this.setDirection(elementContainer, dirClassToAdd);
                applyButtonStyles();
            }
        }
    }

    /**
     * Returns toolbar buttons to their normal state.
     *
     * @private
     * @param {*} editorHost The Kendo's editor object.
     * @memberof SwitchTextDirectionProvider
     */
    private turnOffSelectedButtons(editorHost) {
        this.getToolbarButton(editorHost, LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
        this.getToolbarButton(editorHost, RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
    }

    /**
     * Checks desired text direction and sets required styles.
     *
     * @private
     * @param {*} elementToStyle the element that has to be styled.
     * @param {*} classToAdd RTL or LTR class to be added to the element.
     * @memberof SwitchTextDirectionProvider
     */
    private setDirection(elementToStyle, classToAdd: string) {
        if (classToAdd === RTL_CLASS) {
            this.setDirectionStyles(elementToStyle, LTR_CLASS, "rtl", "right", RTL_CLASS );
        } else {
            this.setDirectionStyles(elementToStyle, RTL_CLASS, "ltr", "left", LTR_CLASS );
        }
    }

    /**
     * Removes text direction styles.
     *
     * @private
     * @param {*} toolbarButton kendo toolbar button for rtl or ltr direction.
     * @param {*} elementToStyle the element that has to be styled.
     * @param {*} classToRemove RTL or LTR class to be removed to the element.
     * @memberof SwitchTextDirectionProvider
     */
    private removeDirection(toolbarButton, elementToStyle, classToRemove: string) {
        this.setDirectionStyles(elementToStyle, classToRemove, null, null);
        toolbarButton.classList.remove(SELECTED_CLASS);
    }

    /**
     * Sets required styles for text direction.
     *
     * @private
     * @param {*} elementToStyle the element that has to be styled.
     * @param {*} classToAdd RTL or LTR class to be added to the element.
     * @param {*} classToRemove RTL or LTR class to be removed from the element.
     * @param {*} directionStyle rtl or ltr css direction property value to be set to the element.
     * @param {*} alignmentStyle right or left css text-align property value to be set to the element.
     * @memberof SwitchTextDirectionProvider
     */
    private setDirectionStyles(elementToStyle: any, classToRemove: string, directionStyle: string, alignmentStyle: string, classToAdd?: string) {
        elementToStyle.classList.remove(classToRemove);
        if (classToAdd) {
            elementToStyle.classList.add(classToAdd);
        }
        elementToStyle.style.direction = directionStyle;
        elementToStyle.style.textAlign = alignmentStyle;
    }
}

export const SWITCH_TEXT_DIRECTION_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SwitchTextDirectionProvider
};
