import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EDITOR_CONFIG_PROVIDER } from "./editor-config-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-videos-toolbar-item-provider";
import { SWITCH_TEXT_DIRECTION_PROVIDER } from "../switch-text-direction/switch-text-direction.provider";
import { EDITOR_SPELL_CHECK_PROVIDER } from "./editor-spell-check-provider";
import { EDIT_MENU_SPELL_CHECK_PROVIDER } from "./edit-menu-spell-check-provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        EDITOR_CONFIG_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER,
        SWITCH_TEXT_DIRECTION_PROVIDER,
        EDITOR_SPELL_CHECK_PROVIDER,
        EDIT_MENU_SPELL_CHECK_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
