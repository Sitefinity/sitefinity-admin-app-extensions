import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CUSTOM_FIELDS_PROVIDER } from "./custom-fields-provider";
import { FrameworkModule } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { AddressCustomFieldComponent } from "./address-custom-field/address-custom-field.component";
import { ADDRESS_CUSTOM_FIELDS_PROVIDER } from "./address-custom-field/address-custom-field-provider";
import { DynamicScriptLoaderService } from "./address-custom-field/script-service";


/**
 * The custom fields module.
 */
@NgModule({
    declarations: [
        CustomInputReadonlyComponent,
        CustomInputWriteComponent,
        AddressCustomFieldComponent
    ],
    entryComponents: [
        // The components need to be registered here as they are instantiated dynamically.
        CustomInputReadonlyComponent,
        CustomInputWriteComponent,
        AddressCustomFieldComponent
    ],
    providers: [
        CUSTOM_FIELDS_PROVIDER,
        ADDRESS_CUSTOM_FIELDS_PROVIDER,
        DynamicScriptLoaderService
    ],

    // import the framework module as it holds the components that the AdminApp uses
    // for a list of components see
    imports: [FormsModule, FrameworkModule, CommonModule]
})
export class CustomFieldsModule { }
