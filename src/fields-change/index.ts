import { NgModule } from "@angular/core";
import { FieldHolderService } from "./field-holder.service";
import { NEWS_FIELDS_CHANGE_PROVIDER } from "./news-field-change.service";

@NgModule({
    providers: [
        NEWS_FIELDS_CHANGE_PROVIDER,
        FieldHolderService,
    ],
})
export class FieldsChangeModule {
}
