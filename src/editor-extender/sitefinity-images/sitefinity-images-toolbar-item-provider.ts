import { Injectable, ClassProvider, Inject } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN, SelectorService, SelectorOptions, SELECTOR_SERVICE, DataItem } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

const TRAILING_BREAK = "<br class='k-br'>";

require("!style-loader!css-loader!./sitefinity-images-toolbar-item-provider.css");

export const ensureTrailingBreaks = (html: string): string => {
    return `${TRAILING_BREAK}${html}${TRAILING_BREAK}`;
};

/**
 * A custom toolbar provider implementation for inserting existing images in the editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class ImagesToolbarItemProvider implements ToolBarItemsProvider {
    constructor(@Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService) { }

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Sitefinity-images",
            tooltip: "Sitefinity images",
            ordinal: 7,
            exec: () => {
                const editor = editorHost.getKendoEditor();

                // Save editor's current range, so we can insert
                // later the HTML at this position.
                const currentRange = editor.getRange();
                const selectorOptions: SelectorOptions = {
                    multiple: true
                };

                // open the selector and subscribe to the result
                this.selectorService.openImageLibrarySelector(selectorOptions).subscribe(images => {
                    if (images.length) {
                        // Restore editor's saved position.
                        editor.selectRange(currentRange);
                        images.forEach((img: DataItem) => {
                            const imageElement = document.createElement("img");
                            imageElement.src = img.data.ThumbnailUrl;

                            // Insert the HTML and trigger editor's change, so the
                            // HTML can be saved.
                            editor.paste(ensureTrailingBreaks(imageElement.outerHTML));
                            editor.trigger("change");
                        });
                    }
                });
            }
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        // If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
        // Otherwise return an empty array.
        // Example: return [ "embed" ];
        // The above code will remove the embed toolbar item from the editor.
        return [];
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const IMAGE_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: ImagesToolbarItemProvider
};
