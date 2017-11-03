import { Injectable, ClassProvider } from "@angular/core";
import { ValidatorFn } from "@angular/forms";

import { FieldsProvider, FieldRegistryKey, Entity } from "sitefinity-admin-app/app/api";
import { FieldRegistration } from "sitefinity-admin-app/app/api/v1/custom-fields/field-registration";
import { RegistrationPair } from "./registration-pair";
import { CustomInputReadonlyComponent } from "./custom-field-readonly.component";
import { CustomInputWriteComponent } from "./custom-field-write.component";
import { CustomShortTextSettings } from "./custom-field.settings";

@Injectable()
export class CustomFieldsProvider extends FieldsProvider {
    private customFieldsMappings: RegistrationPair[];

    constructor() {
        super();
        this.customFieldsMappings = [];

        this.registerCustomComponents();
    }

    getFieldRegistration(fieldRegistryKey: FieldRegistryKey, entity: Entity): FieldRegistration {
        const registration: FieldRegistration = this.findRegistration(fieldRegistryKey);

        if (!registration) {
            const defaultRegistration: FieldRegistration = super.getFieldRegistration(fieldRegistryKey, entity);
            return defaultRegistration;
        }

        return registration;
    }

    private findRegistration(fieldRegistryKey: FieldRegistryKey): FieldRegistration {
        for (const pair of this.customFieldsMappings) {
            if (fieldRegistryKey.fieldName === pair.key.fieldName &&
                fieldRegistryKey.fieldType === pair.key.fieldType &&
                fieldRegistryKey.typeName === pair.key.typeName) {
                    return pair.registration;
            }
        }

        return null;
    }

    private registerCustomComponents(): void {
        const customInputKey: FieldRegistryKey = {
            fieldName: "Title",
            fieldType: "sf-short-text-default",
            typeName: "titleonlies"
        };
        const customInputRegistration: FieldRegistration = {
            writeComponent: CustomInputWriteComponent,
            readComponent: CustomInputReadonlyComponent,
            settingsType: CustomShortTextSettings
        };
        const customFieldRegistrationPair: RegistrationPair = { key: customInputKey, registration: customInputRegistration };

        this.customFieldsMappings.push(customFieldRegistrationPair);
    }
}

export const CUSTOM_FIELDS_PROVIDER: ClassProvider = {
    provide: FieldsProvider,
    useClass: CustomFieldsProvider
};
