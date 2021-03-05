import { Component } from "@angular/core";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the field in write mode.
 * One can use inline template & styles OR templateUrl & styleUrls, like here OR mixture of that. See -readonly.component.ts version for the read mode type.
 */
@Component({
    templateUrl: "./custom-field-write.component.html",
    styleUrls: [ "./custom-field-write.component.css" ]
})
export class CustomInputWriteComponent extends FieldBase {
    processErrors(errors: { [key: string]: any }) {

        // the pattern validator in the custom-field.settings file sets a pattern object
        // that holds information regarding the validation. If the pattern property exists
        // the validation has not passed and we can return an error message
        if (errors.pattern) {
            return ["Invalid email !"];
        }

        return [];
    }
}
