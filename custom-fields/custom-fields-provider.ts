import { Injectable, ClassProvider } from "@angular/core";

import { FIELDS_PROVIDER_TOKEN, FieldData, FieldsProvider } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CustomShortTextSettings } from "./custom-field.settings";

/**
 * The fields provider provides the overridden fields back to the AdminApp.
 */
@Injectable()
export class CustomFieldsProvider implements FieldsProvider {

    /**
     * This method gets called before each field is instantiated, allowing custom fields to be plugged in for any type.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    overrideField(fieldRegistryKey: FieldData): FieldRegistration {
        const registration: FieldRegistration = this.findRegistration(fieldRegistryKey);
        return registration;
    }

    /**
     * This method finds an implementation of the field to be overridden.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    private findRegistration(fieldRegistryKey: FieldData): FieldRegistration {
        // Message is the property name and widget is the filter for when the designer is opened
        if (fieldRegistryKey.fieldName === 'Message' && fieldRegistryKey.typeName.startsWith('widget')) {
            return {
                writeComponent: CustomInputWriteComponent,
                readComponent: CustomInputReadonlyComponent,
                settingsType: CustomShortTextSettings
            }
        }

        return null;
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_FIELDS_PROVIDER: ClassProvider = {
    provide: FIELDS_PROVIDER_TOKEN,
    useClass: CustomFieldsProvider,
    multi: true
};
