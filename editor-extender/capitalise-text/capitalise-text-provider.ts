import { ClassProvider, Injectable } from "@angular/core";
import { EDITOR_CONFIG_TOKEN, EditorConfigProvider, ToolBarItem } from "progress-sitefinity-adminapp-sdk/app/api";

require("!style-loader!css-loader!./capitalise-text.provider.css");

@Injectable()
class CapitaliseTextProvider implements EditorConfigProvider {
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const capitalise = () => {
            const editor = editorHost.getKendoEditor();
            let style = editor.getSelection().focusNode.parentElement.style;
            style.textTransform === "uppercase" ? style.textTransform = "lowercase" : style.textTransform = "uppercase";
            console.log(editorHost);
            // const editorValue = this.stripHTML(editor.value());
            // const capitalisedText = editorValue.toUpperCase();
        };

        /**
         * A custom toolbar item
         */
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Capitalise",
            tooltip: "Capitalise text",
            ordinal: 8,
            exec:  capitalise
        };

        return [CUSTOM_TOOLBAR_ITEM];
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
        configuration.pasteCleanup.span = false;
        return configuration;
    }

    // private stripHTML(html: string): string {
    //     const tmp = document.createElement("DIV");
    //     tmp.innerHTML = html;
    //     return tmp.textContent || tmp.innerText || "";
    // }

}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CAPITALISE_TEXT_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: CapitaliseTextProvider
};
