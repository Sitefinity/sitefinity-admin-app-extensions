import { Injectable, ClassProvider } from "@angular/core";
import { EditorComponentContext, EditorViewComponent, WidgetEditorViewProvider, WIDGET_VIEW_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { CustomWidgetEditorComponent } from './custom-widget-editor.component';

/**
 * The WidgetEditorViewProvider class provides the pluggability point to override the views for the auto generated designers.
 */
@Injectable()
export class CustomWidgetEditorViewProvider implements WidgetEditorViewProvider {
    overrideView(context: EditorComponentContext): EditorViewComponent {
        if (context.widgetName === "AllProperties") {
            return {
                componentData: { type: CustomWidgetEditorComponent }
            };
        }
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_WIDGET_EDITOR_VIEW_TOKEN: ClassProvider = {
    useClass: CustomWidgetEditorViewProvider,
    multi: true,
    provide: WIDGET_VIEW_TOKEN
};
