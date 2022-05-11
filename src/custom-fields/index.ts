import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CUSTOM_FIELDS_PROVIDER } from "./custom-fields-provider";
import { CommonModule } from "@angular/common";

import { SfInputModule } from "@progress/sitefinity-component-framework"

/**
 * The custom fields module.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SfInputModule
    ],
    declarations: [
        CustomInputReadonlyComponent,
        CustomInputWriteComponent
    ],
    providers: [
        CUSTOM_FIELDS_PROVIDER
    ]
})
export class CustomFieldsModule { }
