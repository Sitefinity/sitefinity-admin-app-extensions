import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the field in write mode.
 * One can use inline temlpate & styles OR templateUrl & styleUrls, like here OR mixture of that. See -readonly.component.ts version for the read mode type.
 */
@Component({
    templateUrl: "./custom-field-write.component.html",
    styleUrls: [ "./custom-field-write.component.css" ]
})
export class CustomInputWriteComponent extends FieldBase { }
