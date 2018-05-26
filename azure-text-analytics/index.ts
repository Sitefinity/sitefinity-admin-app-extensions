import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TEXT_ANALYTICS_TOOLBAR_ITEM_PROVIDER } from "./text-analytics-provider";

/**
 * The toolbar extender module
 */
@NgModule({
    providers: [
        TEXT_ANALYTICS_TOOLBAR_ITEM_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})
export class TextAnalyticsModule {}
