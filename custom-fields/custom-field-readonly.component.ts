import { Component } from "@angular/core";
import { FieldBase } from "../node_modules/iris/app/api/v1/custom-fields/field-base";

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
