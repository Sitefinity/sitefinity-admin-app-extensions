import { NgModule } from "@angular/core";
import { DecExtensibilityLoaderCellComponent } from "./dec-cell.component";
import { COLUMNS_PROVIDER } from "./columns-provider";

@NgModule({
    declarations: [
        DecExtensibilityLoaderCellComponent
    ],
    entryComponents: [
        DecExtensibilityLoaderCellComponent
    ],
    providers: [
        COLUMNS_PROVIDER
    ]
})
export class DecExtensionLoaderModule { /* empty */ }
