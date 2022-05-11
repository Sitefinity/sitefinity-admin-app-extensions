import { Component } from "@angular/core";

/**
 * The component used to display the field in write mode.
 */
@Component({
    templateUrl: "./array-of-guids-write.component.html"
})
export class ArrayOfGUIDsWriteComponent  {
    writeValue(value: any) {
        // if (typeof value === "string") {
        //     var arrayValue = value ? value.split(",").map(item => item.trim()) : [];
        //     super.writeValue(arrayValue);
        // } else {
        //     super.writeValue(value);
        // }
    }
}
