import { Component } from "@angular/core";
import { FieldBase } from "sitefinity-admin-app/app/api/v1/custom-fields/field-base";
import { Observable } from "rxjs/Observable";
import { Status } from "sitefinity-admin-app/app/api/v1/custom-fields/field-status";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StatusType } from "sitefinity-admin-app/app/api/v1/custom-fields/field-status-type";

@Component({
    template: require("./custom-field-write.component.html"),
    styles: [
        `
            .custom-input {
                height: 100px;
                border: 2px solid green;
            }
        `
    ]
})
export class CustomInputWriteComponent extends FieldBase { }
