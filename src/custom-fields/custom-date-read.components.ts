import { Component } from "@angular/core";
import { CustomDateWriteComponent } from './custom-date.components';

require("!style-loader!css-loader!./test.css");
/**
 * The component used to display the field in write mode.
 * One can use inline template & styles OR templateUrl & styleUrls, like here OR mixture of that. See -readonly.component.ts version for the read mode type.
 */
@Component({
    templateUrl: "./custom-date.components.html"
})
export class CustomDateReadComponent extends CustomDateWriteComponent {
    constructor() {
        super();
        this.isReadOnly = true;
    }
}
