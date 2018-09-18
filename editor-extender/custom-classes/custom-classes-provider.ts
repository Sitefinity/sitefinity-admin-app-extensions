import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header


/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class CustomClassesProvider implements EditorConfigProvider {
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        return [];
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
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        debugger;
        configuration.tools[0] = {name: "formatting", items: [
            {text: "Heading 1", value: "h1"},
            {text: "Heading 2", value: "h2"},
            {text: "Heading 3", value: "h3"},
            {text: "Heading 4", value: "h4"},
            {text: "Heading 5", value: "h5"},
            {text: "Heading 6", value: "h6"},
            {text:"Button Primary","value":"span.btn btn-primary"},
            {text:"Button Success","value":"span.btn btn-success"}
            ]};
        return configuration;
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_CLASSES_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: CustomClassesProvider
};
