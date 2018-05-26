import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Command, ExecutionContext } from "progress-sitefinity-adminapp-sdk/app/api/v1";


/**
 * Serves as a command that gets invoked when the print preview action
 * in the actions menu is clicked.
 */
@Injectable()
export class PrintPreviewCommand implements Command {

    /**
     * Initializes a new instance of the PrintPreviewCommand.
     * @param router The router that is used to navigate.
     */
    constructor(protected router: Router) { }

    /**
     * This method gets invoked when the print preview action is clicked.
     * @param context The context that contains the data item and the custom properties from the CommandProvider.
     */
    execute(context: ExecutionContext): Observable<any> {

        // get the data item from the context.
        const dataItem = context.data.dataItem;

        // construct the query params so the component that we navigate to
        // will know which data item to fetch
        const currentQueryParams = {
            entitySet: dataItem.metadata.setName,
            id: dataItem.key,
            provider: dataItem.provider
        };

        // navigate to the print-preview route using the query params.
        // return an observable here, because this might be a time consuming operation
        const url = `/print-preview`;
        const navPromise = this.router.navigate([url], { queryParams: currentQueryParams });
        return Observable.fromPromise(navPromise);
    }
}
