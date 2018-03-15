import { Injectable, ClassProvider, Inject } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN, SelectorService, SelectorOptions, SELECTOR_SERVICE } from "progress-sitefinity-adminapp-sdk/app/api/v1";

require("./sf-video-toolbar.css");

const TRAILING_BREAK = "<br class='k-br'>";

export const ensureTrailingBreaks = (html: string): string => {
    return `${TRAILING_BREAK}${html}${TRAILING_BREAK}`;
};

@Injectable()
class SitefinityVideosToolbarItemProvider implements ToolBarItemsProvider {
    constructor(@Inject(SELECTOR_SERVICE) private readonly videoLibraryProxy: SelectorService) { }

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Sitefinity-videos",
            tooltip: "Sitefinity videos",
            ordinal: 6,
            exec: () => {
                const editor = editorHost.getKendoEditor();
                const currentRange = editor.getRange();
                const selectorOptions: SelectorOptions = {
                    multiple: true
                };

                this.videoLibraryProxy.openVideoLibrarySelector(selectorOptions).subscribe(videos => {
                    if (videos.length) {
                        editor.selectRange(currentRange);
                        videos.forEach(video => {
                            const videoElement = document.createElement("video");

                            videoElement.src = video.url;
                            videoElement.controls = true;
                            videoElement.setAttribute("data-sf-ec-immutable", "");
                            editor.exec("inserthtml", { value:  ensureTrailingBreaks(videoElement.outerHTML) });
                        });
                    }
                });
            }
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }
}

/**
 * The provider registration for Angular's DI
 */
export const SITEFINITY_VIDEO_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: SitefinityVideosToolbarItemProvider
};
