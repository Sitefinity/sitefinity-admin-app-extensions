import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Component({
    template: require("./custom-field-readonly.component.html"),
    styles: [
        `
            .custom-input {
                height: 100px;
                border: 2px solid red;
            }
        `
    ]
})
export class CustomInputReadonlyComponent extends FieldBase { }
