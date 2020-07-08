import { ExecuteOnceInBulkCommand, ExecutionContext } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable, of } from "rxjs";
import { Component } from "@angular/core";

@Component({
    selector: "sf-list-selected-items",
    template: ""
})
export class ListSelectedItemsComponent implements ExecuteOnceInBulkCommand {
    executeOnceInBulk: boolean = true;

    execute(context: ExecutionContext): Observable<any> {
        // tslint:disable-next-line: no-console
        // console.log(`Selected items: ${context.data.dataItems.map(x => x.title).join(", ")}`);

        // const result: BulkOperationResult = {
        //     success: true,
        //     failedItemsIds: [],
        //     succeededItemsIds: context.data.dataItems.map(x => x.key)
        // };

        console.log(context);
        return of({ success: true });
    }
}
