import { NgModule } from "@angular/core";
import { TestService } from "./test-service";

/**
 * The custom fields module.
 */
@NgModule({
    providers: [
        TestService
    ]
})
export class ServicesModule { }
