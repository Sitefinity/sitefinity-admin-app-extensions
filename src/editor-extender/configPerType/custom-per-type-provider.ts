import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";


/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class CustomPerTypeProvider implements EditorConfigProvider {
    fieldTypeName = "r2"
    shouldHide = false;

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {

        //// We need to get the parent element of type "sf-form-field-wrapper" and check its name
        this.shouldHide = this.findParentWrapper(editorHost[0]);
        return []
    }

    getToolBarItemsNamesToRemove(): string[] {
        /**
         * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
         * Otherwise return an empty array.
         * Example: return [ "embed" ];
         * The above code will remove the embed toolbar item from the editor.
         * Documentation where you can find all tools' names: https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools
         */
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration overview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        if (this.shouldHide) {
            let createLink: any = null;
            configuration.tools.forEach(element => {
                if (element.name === "createLink") {
                    createLink = element;
                }
                
            });
            configuration.tools = [createLink];
        }
        return configuration;
    }

    private findParentWrapper(element) {
        let parent = element.parentElement;
        while(parent) {
            if(parent.attributes["ng-reflect-name"]?.value === this.fieldTypeName) {
                return true;
            }
            parent = parent.parentElement
        }
        return false;
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_PER_TYPE_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: CustomPerTypeProvider
};
