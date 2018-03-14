import { Injectable, ClassProvider, Inject } from "@angular/core";
import { ToolBarItem, ToolBarItemsProvider, TOOLBARITEMS_TOKEN, VideoLibraryProxy, VIDEO_LIBRARY_PROXY } from "progress-sitefinity-adminapp-sdk/app/api/v1";

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;

@Injectable()
class SitefinityVideosToolbarItemProvider implements ToolBarItemsProvider {
    constructor(@Inject(VIDEO_LIBRARY_PROXY) private readonly videoLibraryProxy: VideoLibraryProxy) { }

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Sitefinity-videos",
            tooltip: "Sitefinity videos",
            ordinal: 6,
            exec: () => {
                const editor = editorHost.getKendoEditor();
                const currentRange = editor.getRange();

                this.videoLibraryProxy.selectVideo(true).subscribe(videos => {
                    if (videos.length) {
                        editor.selectRange(currentRange);
                        videos.forEach(video => {
                            const videoElement = document.createElement("video");

                            videoElement.src = video.url;
                            videoElement.width = DEFAULT_WIDTH;
                            videoElement.height = DEFAULT_HEIGHT;
                            editor.exec("inserthtml", { value: videoElement.outerHTML });
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
