import { Component } from "@angular/core";
import { FieldBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * The component used to display the field in read only mode.
 */
@Component({
    templateUrl: "./array-of-guids-readonly.component.html"
})
export class ArrayOfGUIDsReadonlyComponent extends FieldBase { }
