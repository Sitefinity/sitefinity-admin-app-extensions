import { Injectable, ClassProvider, Inject } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN, SelectorService, SelectorOptions, SELECTOR_SERVICE } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./sitefinity-videos-toolbar-item-provider.css");

const TRAILING_BREAK = "<br class='k-br'>";

export const ensureTrailingBreaks = (html: string): string => {
    return `${TRAILING_BREAK}${html}${TRAILING_BREAK}`;
};

/**
 * A custom toolbar provider implementation for inserting existing videos in the editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class VideosToolbarItemProvider implements ToolBarItemsProvider {
    constructor(@Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService) { }

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Sitefinity-videos",
            tooltip: "Sitefinity videos",
            ordinal: 6,
            exec: () => {
                const editor = editorHost.getKendoEditor();

                // Save editor's current range, so we can insert
                // later the HTML at this position.
                const currentRange = editor.getRange();
                const selectorOptions: SelectorOptions = {
                    multiple: true
                };

                // open the selector and subscribe to the result
                this.selectorService.openVideoLibrarySelector(selectorOptions).subscribe(videos => {
                    if (videos.length) {
                        // Restore editor's saved position.
                        editor.selectRange(currentRange);
                        videos.forEach(video => {
                            const videoElement = document.createElement("video");

                            // Disable video playing, but show controls,
                            // so the video can be playable on the frontend.
                            videoElement.contentEditable = "false";
                            videoElement.src = video.url;
                            videoElement.setAttribute("controls", "true");

                            // Insert the HTML and trigger editor's change, so the
                            // HTML can be saved.
                            editor.paste(ensureTrailingBreaks(videoElement.outerHTML));
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
export const VIDEO_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: VideosToolbarItemProvider
};
