import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EXTERNAL_TOOLBAR_ITEMS_PROVIDER } from "./toolbar-items-provider";
import { VIDEO_TOOLBAR_ITEM_PROVIDER } from "../sitefinity-videos/sitefinity-videos-toolbar-item-provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        EXTERNAL_TOOLBAR_ITEMS_PROVIDER,
        VIDEO_TOOLBAR_ITEM_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
