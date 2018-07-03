import { Injectable, ClassProvider } from "@angular/core";
import { ToolBarItemsProvider, ToolBarItem, TOOLBARITEMS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// These classes are defined in the application's styles.
const RTL_CLASS = "-sf-direction-rtl";
const LTR_CLASS = "-sf-direction-ltr";
const SELECTED_CLASS = "k-state-selected";
const LTR_BUTTON_SELECTOR = ".k-i-Left-to-right";
const RTL_BUTTON_SELECTOR = ".k-i-Right-to-left";

require("!style-loader!css-loader!./switch-text-direction.provider.css");

@Injectable()
class SwitchTextDirectionProvider implements ToolBarItemsProvider {
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const SWITCH_LEFT_TO_RIGHT_TOOL: ToolBarItem = {
            name: "Left-to-right",
            tooltip: "Left-to-right",
            ordinal: 6,
            exec: () => {
                const elementContainer: HTMLElement = this.findParent(editorHost);

                elementContainer.classList.remove(RTL_CLASS);
                elementContainer.classList.add(LTR_CLASS);
                this.getToolbarButton(LTR_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
                this.getToolbarButton(RTL_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            }
        };

        const SWITCH_RIGHT_TO_LEFT_TOOL: ToolBarItem = {
            name: "Right-to-left",
            tooltip: "Right-to-left",
            ordinal: 7,
            exec: () => {
                const elementContainer: HTMLElement = this.findParent(editorHost);

                elementContainer.classList.remove(LTR_CLASS);
                elementContainer.classList.add(RTL_CLASS);
                this.getToolbarButton(RTL_BUTTON_SELECTOR).classList.add(SELECTED_CLASS);
                this.getToolbarButton(LTR_BUTTON_SELECTOR).classList.remove(SELECTED_CLASS);
            }
        };

        return [SWITCH_LEFT_TO_RIGHT_TOOL, SWITCH_RIGHT_TO_LEFT_TOOL];
    }

    getToolBarItemsNamesToRemove(): string[] {
        // If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
        // Otherwise return an empty array.
        // Example: return [ "embed" ];
        // The above code will remove the embed toolbar item from the editor.
        return [];
    }

    private findParent(editorHost): HTMLElement {
        const editor = editorHost.getKendoEditor();
        let currentNode = editor.getRange().startContainer.parentElement;

        while (this.isInlineElement(currentNode)) {
            currentNode = currentNode.parentElement;
        }

        return currentNode;
    }

    private isInlineElement(element: HTMLElement) {
        const style = window.getComputedStyle(element, "");
        return style.display === "inline";
    }

    private getToolbarButton(selector: string): HTMLElement {
        return document.querySelector(selector).parentElement;
    }
}

export const SWITCH_TEXT_DIRECTION_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SwitchTextDirectionProvider
};
