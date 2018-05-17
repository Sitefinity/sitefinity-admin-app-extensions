import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// One can use inline temlate & styles OR templateUrl & styleUrs, like here OR mixture of that. See -read.component.ts version for alternative
@Component({
    templateUrl: "./custom-field-write.component.html",
    styleUrls: [ "./custom-field-write.component.css" ]
})
export class CustomInputWriteComponent extends FieldBase { }
