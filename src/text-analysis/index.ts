import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER } from "./text-analysis-toolbar-item-provider";

import { TextAnalysisComponent } from "./text-analysis.component";
import { FieldsChangeModule } from "src/fields-change";

@NgModule({
    declarations: [
        TextAnalysisComponent
    ],
    providers: [
        TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER
    ],
    imports: [
        FieldsChangeModule,
        HttpClientModule,
        CommonModule
    ]
})
export class TextAnalysisToolbarExtenderModule {
    /* empty */
}