import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WORD_COUNT_PROVIDER } from "./word-count/word-count-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "./sitefinity-videos/sitefinity-videos-toolbar-item-provider";
import { SWITCH_TEXT_DIRECTION_PROVIDER } from "./switch-text-direction/switch-text-direction.provider";
import { INSERT_SYMBOL_PROVIDER } from "./insert-symbol/insert-symbol.provider";
import { CUSTOM_CLASSES_PROVIDER } from "./custom-classes/custom-classes-provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        WORD_COUNT_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER,
        SWITCH_TEXT_DIRECTION_PROVIDER,
        INSERT_SYMBOL_PROVIDER,
        CUSTOM_CLASSES_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class EditorExtenderModule {
    /* empty */
}
