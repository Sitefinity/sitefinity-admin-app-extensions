import { NgModule } from "@angular/core";
import { ImageComponent } from "./image.component";
import { COLUMNS_PROVIDER } from "./columns-provider";

@NgModule({
    declarations: [
        ImageComponent
    ],
    entryComponents: [
        ImageComponent
    ],
    providers: [
        COLUMNS_PROVIDER
    ]
})
export class GridExtenderModule { /* empty */ }
