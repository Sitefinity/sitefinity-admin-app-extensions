import { Component, ViewEncapsulation } from '@angular/core';
import { ActionContext, Dictionary, PropertyData, ValidationResult, WidgetEditor, WidgetMetadata } from 'progress-sitefinity-adminapp-sdk/app/api/v1';
import { Observable } from 'rxjs';

@Component({
    selector: "sf-content-editor",
    templateUrl: "./custom-widget-editor.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CustomWidgetEditorComponent implements WidgetEditor {
    initialize(widgetMetadata: WidgetMetadata): Observable<void> {
        throw new Error('Method not implemented.');
    }
    setValues(propValues: Dictionary): void {
        throw new Error('Method not implemented.');
    }
    validate(): Observable<ValidationResult> {
        throw new Error('Method not implemented.');
    }
    actionExecuting(context: ActionContext): Observable<void> {
        throw new Error('Method not implemented.');
    }
    getModifiedProperties(): PropertyData[] {
        throw new Error('Method not implemented.');
    }
}
