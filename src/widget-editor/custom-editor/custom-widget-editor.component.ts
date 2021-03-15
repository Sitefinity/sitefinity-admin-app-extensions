import { ChangeDetectorRef } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActionContext, Dictionary, PropertyData, ValidationResult, WidgetEditor, WidgetMetadata } from '@progress/sitefinity-adminapp-sdk/app/api/v1';
import { Observable, of } from 'rxjs';

@Component({
    selector: "sf-content-editor",
    templateUrl: "./custom-widget-editor.component.html",
    encapsulation: ViewEncapsulation.None
})
export class CustomWidgetEditorComponent implements WidgetEditor {
    heading: string;
    private _value: string;

    /**
     *
     */
    constructor(private detector: ChangeDetectorRef) {

    }

    initialize(widgetMetadata: WidgetMetadata): Observable<void> {
        this.heading = `${widgetMetadata.caption}`;
        this.setValues(widgetMetadata.propertyValues);
        return new Observable((subscriber) => {
            subscriber.next();
        });
    }
    setValues(propValues: Dictionary): void {
        this.propertiesValue = JSON.stringify(propValues);
    }
    validate(): Observable<ValidationResult> {
        return of({
            isValid: true
        });
    }
    actionExecuting(context: ActionContext): Observable<void> {
        return new Observable((subscriber) => {
            subscriber.next();
        });
    }
    getModifiedProperties(): PropertyData[] {
        const parsedObject = JSON.parse(this.propertiesValue);
        return Object.keys(parsedObject).map((key) => {
            return {
                Name: key,
                Value: parsedObject[key]
            }
        });
    }

    get propertiesValue() {
        return JSON.stringify(this._value, null, 2);
    }

    set propertiesValue(v) {
        try {
            this._value = JSON.parse(v);
            this.detector.detectChanges();
        } catch (e) {
            console.log("error occured while you were typing the JSON");
        }
    }
}
