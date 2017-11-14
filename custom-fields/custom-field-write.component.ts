import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs/Observable";
import { Status } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StatusType } from "progress-sitefinity-adminapp-sdk/app/api/v1";

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
