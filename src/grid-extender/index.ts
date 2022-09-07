import { NgModule } from "@angular/core";
import { ImageComponent } from "./image.component";
import { COLUMNS_PROVIDER } from "./columns-provider";

/**
 * The grid extender module.
 */
@NgModule({
    declarations: [
        ImageComponent
    ],
    providers: [
        COLUMNS_PROVIDER
    ]
})
export class GridExtenderModule { /* empty */ }
