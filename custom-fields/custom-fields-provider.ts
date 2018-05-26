import { Injectable, ClassProvider } from "@angular/core";

import { FIELDS_PROVIDER_TOKEN, FieldData, FieldsProvider } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { RegistrationPair } from "./registration-pair";
import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CustomShortTextSettings } from "./custom-field.settings";

/**
 * The fields provider provides the overridden fields back to the AdminApp.
 */
@Injectable()
export class CustomFieldsProvider implements FieldsProvider {
    private customFieldsMappings: RegistrationPair[];

    constructor() {
        this.customFieldsMappings = [];

        this.registerCustomComponents();
    }

    /**
     * This method gets called before each field is instantiated, allowing custom fields to be plugged in for any type.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    overrideField(fieldRegistryKey: FieldData): FieldRegistration {
        const registration: FieldRegistration = this.findRegistration(fieldRegistryKey);
        return registration;
    }

    /**
     * This method finds an implmentation of the field to be overridden.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    private findRegistration(fieldRegistryKey: FieldData): FieldRegistration {
        for (const pair of this.customFieldsMappings) {
            if (fieldRegistryKey.fieldName === pair.key.fieldName &&
                fieldRegistryKey.fieldType === pair.key.fieldType &&
                fieldRegistryKey.typeName === pair.key.typeName) {
                    return pair.registration;
            }
        }

        return null;
    }

    /**
     * Initializes the custom field(component) registrations.
     */
    private registerCustomComponents(): void {

        // The field name is the name which identifies the field uniquely.
        // The typename is the OData entity set name. It matches the url segment when navigating
        // to the list view of the specific type.
        const customInputKey: FieldData = {
            fieldName: "Title",
            fieldType: "sf-short-text-default",
            typeName: "newsitems"
        };

        // The result field registration that will be returened to the AdminApp.
        const customInputRegistration: FieldRegistration = {
            writeComponent: CustomInputWriteComponent,
            readComponent: CustomInputReadonlyComponent,
            settingsType: CustomShortTextSettings
        };

        const customFieldRegistrationPair: RegistrationPair = {
             key: customInputKey,
             registration: customInputRegistration
        };

        this.customFieldsMappings.push(customFieldRegistrationPair);
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
