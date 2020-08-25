import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WORD_COUNT_PROVIDER } from "./word-count/word-count-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-videos/sitefinity-videos-toolbar-item-provider";
import { SWITCH_TEXT_DIRECTION_PROVIDER } from "./switch-text-direction/switch-text-direction.provider";
import { INSERT_SYMBOL_PROVIDER } from "./insert-symbol/insert-symbol.provider";
import { EDIT_MENU_SPELL_CHECK_PROVIDER } from "./spell-check/edit-menu-spell-check-provider";
import { EDITOR_SPELL_CHECK_PROVIDER } from "./spell-check/editor-spell-check-provider";
import { IMAGE_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-images/sitefinity-images-toolbar-item-provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        WORD_COUNT_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER,
        SWITCH_TEXT_DIRECTION_PROVIDER,
        INSERT_SYMBOL_PROVIDER,
        EDITOR_SPELL_CHECK_PROVIDER,
        EDIT_MENU_SPELL_CHECK_PROVIDER,
        IMAGE_TOOLBAR_ITEM_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class EditorExtenderModule {
    /* empty */
}
