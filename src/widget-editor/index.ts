import { NgModule } from "@angular/core";
import { WIDGET_EDITOR_CUSTOM_FIELDS_PROVIDER } from './widget-editor-custom-fields-provider';

/**
 * The widget editor extender module.
 */
@NgModule({
    providers: [
        WIDGET_EDITOR_CUSTOM_FIELDS_PROVIDER
    ]
})
export class WidgetEditorExtenderModule { /* empty */ }
