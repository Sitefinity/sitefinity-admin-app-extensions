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
    entryComponents: [
        // The component needs to be registered here as it is instantiated dynamically.
        ImageComponent
    ],
    providers: [
        COLUMNS_PROVIDER
    ]
})
export class GridExtenderModule { /* empty */ }
