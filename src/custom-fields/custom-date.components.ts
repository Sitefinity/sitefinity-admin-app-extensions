import { Component } from "@angular/core";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";


require("!style-loader!css-loader!./test.css");
/**
 * The component used to display the field in write mode.
 * One can use inline template & styles OR templateUrl & styleUrls, like here OR mixture of that. See -readonly.component.ts version for the read mode type.
 */
@Component({
    templateUrl: "./custom-date.components.html"
})
export class CustomDateWriteComponent extends FieldBase {
    public isReadOnly = false;
    public format: any = "dd/MM/yyyy"
    public dateBottomView: "year";
    public dateTopView: "decade";
    public dateValue = new Date();

    writeValue(value) {      
        if (typeof value === "string") {
            this.dateValue = new Date(value);
        } else {
            this.dateValue = value;
        }

        super.writeValue(value);
    }

    onDateChange(newValue: Date) {
        this.writeValue(newValue);
    }
}
