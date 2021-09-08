import { ClassProvider, Injector, Inject, ComponentRef, Injectable } from '@angular/core';
import { EditorConfigProvider, SelectorService, SELECTOR_SERVICE, ToolBarItem, TOOLBARITEMS_TOKEN } from '@progress/sitefinity-adminapp-sdk/app/api/v1';
import { TextAnalysisComponent } from "./text-analysis.component";

require("!style-loader!css-loader!./toolbar.css");

@Injectable()
class TextAnalysisToolBarItemProvider implements EditorConfigProvider {
    protected textAnalysisComponent: ComponentRef<TextAnalysisComponent>;

    constructor(
        @Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService,
        @Inject(Injector) private injector: Injector) { }

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof TextAnalysisToolBarItemsProvider
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        var textAnalyticsNode = document.createElement("div");
        textAnalyticsNode.id = "text-analytics";
        editorHost[0].parentElement.appendChild(textAnalyticsNode);

        const TEXT_ANALYSIS_TOOLBAR_ITEM: ToolBarItem = {
            name: "text-analysis",
            tooltip: "Text Analysis",
            ordinal: 999,
            exec: () => {
                this.selectorService.openDialog({
                    componentData: {
                        type: TextAnalysisComponent,
                        properties: {
                            editorHost: editorHost
                        }
                    },
                    commands: []
                }).subscribe(() => {
                });
            }
        };

        return [TEXT_ANALYSIS_TOOLBAR_ITEM];
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
}

/**
 * The provider registration for Angular's DI
 */
export const TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: TextAnalysisToolBarItemProvider
};