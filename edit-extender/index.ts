import { NgModule } from "@angular/core";
import { CUSTOM_EDIT_EXTENDER_PROVIDER } from "./edit-extender-provider";
import { ErrorListComponent } from "./error-list/error-list.component";

const EDIT_EXTENDER_COMPONENTS = [
    ErrorListComponent
];

/**
 * The edit a content item extender module.
 */
@NgModule({
    declarations: [
        ...EDIT_EXTENDER_COMPONENTS
    ],
    providers: [
        CUSTOM_EDIT_EXTENDER_PROVIDER
    ],
    entryComponents: [
        ...EDIT_EXTENDER_COMPONENTS
    ]
})
export class EditExtenderModule { /* empty */ }
