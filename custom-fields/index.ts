import { NgModule } from "@angular/core";
import { FieldsProvider } from "sitefinity-admin-app/app/api";
import { FormsModule } from "@angular/forms";

import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CustomFieldsProvider, CUSTOM_FIELDS_PROVIDER } from "./custom-fields-provider";

@NgModule({
    declarations: [
        CustomInputReadonlyComponent,
        CustomInputWriteComponent
    ],
    entryComponents: [
        CustomInputReadonlyComponent,
        CustomInputWriteComponent
    ],
    providers: [
        CUSTOM_FIELDS_PROVIDER
    ],
    imports: [FormsModule]
})
export class CustomFieldsModule { }
