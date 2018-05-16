import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Component({
    templateUrl: "./custom-field-readonly.component.html",
    styles: [`
        .custom-title-input {
            border: 0;
            padding: 0;
            font-weight: 700;
            font-size: 3em;
            width: 100%;
            color: #666;
        }
        `]
})
export class CustomInputReadonlyComponent extends FieldBase { }
