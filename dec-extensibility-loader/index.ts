import { NgModule } from "@angular/core";
import { DecExtensibilityInsightsCellComponent } from "./dec-insights-cell.component";
import { COLUMNS_PROVIDER } from "./columns-provider";
import { DecExtensibilityDetailsViewComponent } from "./dec-insights-details-view.component";

@NgModule({
    declarations: [
        DecExtensibilityInsightsCellComponent,
        DecExtensibilityDetailsViewComponent
    ],
    entryComponents: [
        DecExtensibilityInsightsCellComponent,
        DecExtensibilityDetailsViewComponent
    ],
    providers: [
        COLUMNS_PROVIDER
    ]
})
export class DecExtensionLoaderModule { /* empty */ }
