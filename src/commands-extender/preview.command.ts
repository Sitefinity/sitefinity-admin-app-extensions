import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { Command, ExecutionContext } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * Serves as a command that gets invoked when the notification action button is clicked
 */
@Injectable()
export class PreviewCommand implements Command {
    constructor(protected router: Router) { }

    /**
     * This method gets invoked when the notification action button is clicked
     * @param context The context that contains the data item and the custom properties from the CommandProvider.
     */
    execute(context: ExecutionContext): Observable<any> {

        // A URL of your choice
        window.open("https://www.google.com", "_blank");

        return of(true);
    }
}
