import { ClassProvider } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./toolbar-items-provider.css");

class CustomToolBarItemsProvider implements ToolBarItemsProvider {
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
}

/**
 * The provider registration for Angular's DI
 */
export const EXTERNAL_TOOLBAR_ITEMS_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: CustomToolBarItemsProvider
};
