import { Injectable, ClassProvider } from "@angular/core";

import { FIELDS_PROVIDER_TOKEN, FieldData, FieldsProvider, SettingsBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration, FieldTypes } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { CustomInputWriteComponent } from './custom-field-write.component';

/**
 * The fields provider provides the overridden fields back to the AdminApp.
 */
@Injectable()
export class WidgetEditorCustomFieldsProvider implements FieldsProvider {
    /**
     * This method gets called before each field is instantiated, allowing custom fields to be plugged in for any type.
     * @param fieldRegistryKey The metadata needed to determine which field to display.
     */
    overrideField(fieldRegistryKey: FieldData): FieldRegistration {

        // the fieldRegistryKey contains the typeName of the widget prefixed with "widget-"
        if (fieldRegistryKey.fieldType === FieldTypes.shortText && fieldRegistryKey.typeName && fieldRegistryKey.typeName.startsWith("widget-AllProperties"))
            return {
                writeComponent: CustomInputWriteComponent,
                settingsType: SettingsBase
            };
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const WIDGET_EDITOR_CUSTOM_FIELDS_PROVIDER: ClassProvider = {
    provide: FIELDS_PROVIDER_TOKEN,
    useClass: WidgetEditorCustomFieldsProvider,
    multi: true
};
