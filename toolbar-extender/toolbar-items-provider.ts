import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./toolbar-items-provider.css");

/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class CustomToolBarItemsProvider implements ToolBarItemsProvider {

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const wordsCount = () => {
            const editor = editorHost.getKendoEditor();
            const count = editor.value() ? editor.value().split(" ").length : 0;

            alert(`Words count: ${count}`);
        };

        /**
         * A custom toolbar item
         */
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Words-count",
            tooltip: "Words count",
            ordinal: 5,
            exec: wordsCount
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        return ["embed"];
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const EXTERNAL_TOOLBAR_ITEMS_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: CustomToolBarItemsProvider
};
