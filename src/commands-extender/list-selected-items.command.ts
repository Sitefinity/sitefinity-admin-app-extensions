import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Command, ExecutionContext, ExecuteOnceInBulkCommand, BulkOperationResult } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * Serves as a command that gets invoked when the list items bulk action
 * in the actions menu is clicked.
 */
@Injectable()
export class ListSelectedItemsCommand implements Command, ExecuteOnceInBulkCommand {

    /**
     * Indicates the command is executed once and not for every item selected.
     */
    executeOnceInBulk: boolean = true;

    /**
     * This method gets invoked when the list items action is clicked.
     * @param context The context that contains data for the executed bulk action.
     */
    execute(context: ExecutionContext): Observable<BulkOperationResult> {
        // get the selected items from the context.
        const selectedItems = context.data.selectedItems;

        // tslint:disable-next-line: no-console
        console.log(`Custom bulk command executed. Selected items: ${selectedItems.map(x => x.title).join(", ")}`);

        const result: BulkOperationResult = {
            success: true,
            failedItemsIds: [],
            succeededItemsIds: selectedItems.map(x => x.key)
        };

        return of(result);
    }
}
