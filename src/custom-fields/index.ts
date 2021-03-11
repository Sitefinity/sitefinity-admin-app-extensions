import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CUSTOM_FIELDS_PROVIDER } from "./custom-fields-provider";
import { ArrayOfGUIDsReadonlyComponent } from "./array-of-guids/array-of-guids-readonly.component";
import { ArrayOfGUIDsWriteComponent } from "./array-of-guids/array-of-guids-write.component";
import { FrameworkModule } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The custom fields module.
 */
@NgModule({
    declarations: [
        CustomInputReadonlyComponent,
        CustomInputWriteComponent,
        ArrayOfGUIDsReadonlyComponent,
        ArrayOfGUIDsWriteComponent
    ],
    entryComponents: [
        // The components need to be registered here as they are instantiated dynamically.
        CustomInputReadonlyComponent,
        CustomInputWriteComponent,
        ArrayOfGUIDsReadonlyComponent,
        ArrayOfGUIDsWriteComponent
    ],
    providers: [
        CUSTOM_FIELDS_PROVIDER
    ],

    // import the framework module as it holds the components that the AdminApp uses
    // for a list of components see
    imports: [FormsModule, FrameworkModule]
})
export class CustomFieldsModule { }
