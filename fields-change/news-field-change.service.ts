import { FieldsChangeService, FieldWrapper, FIELDS_CHANGE_SERVICE_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Injectable } from "@angular/core";

const NEWS_TYPE_FULL_NAME = "Telerik.Sitefinity.News.Model.NewsItem";
const TITLE_FIELD_NAME = "Title";
const RITCH_TEXT_EDITOR_FIELD_NAME = "Content";

@Injectable()
export class NewsFieldsChangeService implements FieldsChangeService {
    processChange(changedFieldName: string, changedValue: any, fields: FieldWrapper[]): void {
        if (changedFieldName === TITLE_FIELD_NAME) {
            const ritchTextEditorField = fields.find(x => x.fieldModel.key === RITCH_TEXT_EDITOR_FIELD_NAME);

            ritchTextEditorField.writeValue(changedValue);
        }
    }

    canProcess(typeFullName: string): boolean {
        return typeFullName === NEWS_TYPE_FULL_NAME;
    }
}

export const NEWS_FIELDS_CHANGE_PROVIDER = {
    multi: true,
    provide: FIELDS_CHANGE_SERVICE_TOKEN,
    useClass: NewsFieldsChangeService
};
