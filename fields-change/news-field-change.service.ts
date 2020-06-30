import { FieldChangeService, FieldWrapper, FIELDS_CHANGE_SERVICE_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Injectable } from "@angular/core";

const NEWS_TYPE_FULL_NAME = "Telerik.Sitefinity.News.Model.NewsItem";
const TITLE_FIELD_NAME = "Title";
const RITCH_TEXT_EDITOR_FIELD_NAME = "Content";

@Injectable()
export class NewsFieldsChangeService implements FieldChangeService {
    /**
     * Method called when on of the field changes.
     *
     * @param {string} changedFieldName The name of the field that was changed.
     * @param {*} changedValue The new value of the field.
     * @param {FieldWrapper[]} fields All fields in the form.
     * @memberof FieldsChangeService
     */
    processChange(changedFieldName: string, changedValue: any, fields: FieldWrapper[]): void {
        // When the title field is changed, we want to update the long text field with the same value(mirroring).
        if (changedFieldName === TITLE_FIELD_NAME) {
            const ritchTextEditorField = fields.find(x => x.fieldModel.key === RITCH_TEXT_EDITOR_FIELD_NAME);

            ritchTextEditorField.writeValue(changedValue);
        }
    }

    /**
     * Determines if this service can process the changed field.
     *
     * @param {string} typeFullName The CLR full name of the item(ex: Telerik.Sitefinity.News.Model.NewsItem)
     * @returns {boolean} Wheter the field can be processed.
     * @memberof FieldsChangeService
     */
    canProcess(typeFullName: string): boolean {
        return typeFullName === NEWS_TYPE_FULL_NAME;
    }
}

export const NEWS_FIELDS_CHANGE_PROVIDER = {
    multi: true,
    provide: FIELDS_CHANGE_SERVICE_TOKEN,
    useClass: NewsFieldsChangeService
};
