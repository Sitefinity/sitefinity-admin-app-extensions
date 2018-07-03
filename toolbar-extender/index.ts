import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EDITOR_CONFIG_PROVIDER } from "./editor-config-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-videos-toolbar-item-provider";
import { SWITCH_TEXT_DIRECTION_PROVIDER } from "../switch-text-direction/switch-text-direction.provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        EDITOR_CONFIG_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER,
        SWITCH_TEXT_DIRECTION_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
