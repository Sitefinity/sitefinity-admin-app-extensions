import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { CUSTOM_TREE_COMPONENT_PROVIDER } from "./related-data-custom-tree-node-component-provider";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

@NgModule({
    declarations: [
        RelatedDataCustomComponent
    ],
    entryComponents: [
        RelatedDataCustomComponent
    ],
    providers: [
        CUSTOM_TREE_COMPONENT_PROVIDER,
        DatePipe
    ],
    imports: [
        CommonModule
    ]
})
export class RelatedDateExtenderModule { /* empty */ }
