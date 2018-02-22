import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EXTERNAL_OPERATIONS_PROVIDER } from "./toolbar-items-provider";

@NgModule({
    providers: [
        EXTERNAL_OPERATIONS_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class ToolbarExtenderModule {
    /* empty */
}
