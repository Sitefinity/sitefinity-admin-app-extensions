import { ClassProvider } from '@angular/core';
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN } from 'progress-sitefinity-adminapp-sdk/app/api/v1';

class CustomToolBarItemsProvider implements ToolBarItemsProvider {
    getToolBarItems(editorHost: any, tools: any[]): void {
        const wordsCount = () => {  
            const editor = editorHost.getKendoEditor();
            const count = editor.value() ? editor.value().split(' ').length : 0;

            alert(`Words count: ${count}!`);
        }

        /**
         * A custom toolbar item
         */
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Alert",
            tooltip: "Alert",
            exec: (e) => {
                e.preventDefault();
                e.stopPropagation();
                wordsCount();
            }
        };

        tools.unshift(CUSTOM_TOOLBAR_ITEM);
    }
}

/**
 * The provider registration for Angular's DI
 */
export const EXTERNAL_OPERATIONS_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: CustomToolBarItemsProvider
};
