import { NgModule } from "@angular/core";

import { FrameworkModule } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { CHART_FIELDS_PROVIDER } from "./chart-fields-provider";
import { ChartFieldComponent } from "./chart-field.component";
import { ChartComponent } from "./chart.component";

/**
 * The custom fields module.
 */
@NgModule({
    declarations: [
        ChartFieldComponent,
        ChartComponent
    ],
    entryComponents: [
        // The components need to be registered here as they are instantiated dynamically.
        ChartFieldComponent,
        ChartComponent
    ],
    providers: [
        CHART_FIELDS_PROVIDER
    ],

    // import the framework module as it holds the components that the AdminApp uses
    // for a list of components see
    imports: [FrameworkModule]
})
export class ExtensionsDemoModule { }
