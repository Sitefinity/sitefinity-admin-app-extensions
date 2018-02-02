import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CUSTOM_FIELDS_PROVIDER } from "./custom-fields-provider";

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
