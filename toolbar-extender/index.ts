import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EXTERNAL_TOOLBAR_ITEMS_PROVIDER } from "./toolbar-items-provider";

@NgModule({
    providers: [
        EXTERNAL_TOOLBAR_ITEMS_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
