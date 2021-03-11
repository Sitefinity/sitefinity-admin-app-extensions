import { Component } from "@angular/core";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the field in write mode.
 */
@Component({
    templateUrl: "./array-of-guids-write.component.html"
})
export class ArrayOfGUIDsWriteComponent extends FieldBase {
    writeValue(value: any) {
        if (typeof value === "string") {
            var arrayValue = value ? value.split(",").map(item => item.trim()) : [];
            super.writeValue(arrayValue);
        } else {
            super.writeValue(value);
        }
    }
}
