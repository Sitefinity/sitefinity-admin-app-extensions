import { NgModule } from "@angular/core";
import { NEWS_FIELDS_CHANGE_PROVIDER } from "./news-field-change.service";

@NgModule({
    providers: [
        NEWS_FIELDS_CHANGE_PROVIDER
    ]
})
export class FieldsChangeModule {
}
