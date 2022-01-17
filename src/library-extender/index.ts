import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CUSTOM_DAM_PROVIDER } from "./dam/custom-dam-provider";

/**
 * The Lib extender module.
 */
@NgModule({
    providers: [
        CUSTOM_DAM_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class LibraryExtenderModule {
    /* empty */
}
