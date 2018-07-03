import { Injectable, ClassProvider } from "@angular/core";
import { ToolBarItemsProvider, ToolBarItem, TOOLBARITEMS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// These classes are defined in the application's styles.
const RTL_CLASS = "-sf-direction-rtl";
const LTR_CLASS = "-sf-direction-ltr";

require("!style-loader!css-loader!./switch-text-direction.provider.css");

@Injectable()
class SwitchTextDirectionProvider implements ToolBarItemsProvider {
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const SWITCH_LEFT_TO_RIGHT_TOOL: ToolBarItem = {
            name: "Left-to-right",
            tooltip: "Left-to-right",
            ordinal: 7,
            exec: () => {
                const elementContainer: HTMLElement = this.findParent(editorHost);

                elementContainer.classList.remove(RTL_CLASS);
                elementContainer.classList.add(LTR_CLASS);
            }
        };

        const SWITCH_RIGHT_TO_LEFT_TOOL: ToolBarItem = {
            name: "Right-to-left",
            tooltip: "Right-to-left",
            ordinal: 6,
            exec: () => {
                const elementContainer: HTMLElement = this.findParent(editorHost);

                elementContainer.classList.remove(LTR_CLASS);
                elementContainer.classList.add(RTL_CLASS);
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
        const node = editor.getRange().startContainer.parentElement;

        return node;
    }
}

export const SWITCH_TEXT_DIRECTION_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SwitchTextDirectionProvider
};
