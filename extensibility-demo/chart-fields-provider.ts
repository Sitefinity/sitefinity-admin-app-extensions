import { Injectable, ClassProvider } from "@angular/core";
import { FIELDS_PROVIDER_TOKEN, FieldData, FieldsProvider, FieldRegistration, SettingsBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ChartFieldComponent } from "./chart-field.component";

@Injectable()
export class ChartFieldsProvider implements FieldsProvider {
    overrideField(data: FieldData): FieldRegistration {
        if (data.typeName === "demos" && data.fieldName === "ChartData") {
            const fieldRegistration: FieldRegistration = {
                writeComponent: ChartFieldComponent,
                readComponent: ChartFieldComponent,
                settingsType: SettingsBase
            };
            return fieldRegistration;
        }
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CHART_FIELDS_PROVIDER: ClassProvider = {
    provide: FIELDS_PROVIDER_TOKEN,
    useClass: ChartFieldsProvider,
    multi: true
};
