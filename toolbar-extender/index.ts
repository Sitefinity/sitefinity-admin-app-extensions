import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EDITOR_CONFIG_PROVIDER } from "./editor-config-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-videos-toolbar-item-provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        EDITOR_CONFIG_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
