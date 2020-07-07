import { BulkCommandExtenderBase, Command, EntityData, DataItem, ActionButton, ExecutionContext, ExecuteOnceInBulkCommand, BulkOperationResult, BULK_COMMAND_EXTENDER_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { LIST_SELECTED_ITEMS_OPERATION } from "./commands-provider";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

class ListSelectedItemsCommand implements Command, ExecuteOnceInBulkCommand {
    executeOnceInBulk: boolean = true;

    constructor(private dataItems: DataItem[]) { }

    execute(context: ExecutionContext): Observable<BulkOperationResult> {
        // tslint:disable-next-line: no-console
        console.log(`Selected items: ${this.dataItems.map(x => x.title).join(", ")}`);

        const result: BulkOperationResult = {
            success: true,
            failedItemsIds: [],
            succeededItemsIds: this.dataItems.map(x => x.key)
        };

        return of(result);
    }
}

@Injectable()
export class BulkCommandsExtender extends BulkCommandExtenderBase {
    /**
     * Determines if the content type can be processed by the extender.
     *
     * @param {EntityData} entityData Metadata for the content type.
     * @returns {boolean}
     * @memberof BulkCommandsExtender
     */
    isSupportedType(entityData: EntityData): boolean {
        return entityData.metadata.setName === "newsitems";
    }

    /**
     * Tries to handle operation for the action button clicked.
     *
     * @param {ActionButton} action The clicked action button.
     * @param {{dataItems: DataItem[], entityData: EntityData}} data The selected items from the list and metadata for current content type.
     * @returns {Command} The command to execute for the operation.
     * @memberof BulkCommandsExtender
     */
    tryHandleCommand(action: ActionButton, data: {dataItems: DataItem[], entityData: EntityData}): Command {
        if (action.name === LIST_SELECTED_ITEMS_OPERATION.name) {
            const command  = new ListSelectedItemsCommand(data.dataItems);
            return command;
        }
    }
}

export const BULK_COMMANDS_EXTENDER = {
    provide: BULK_COMMAND_EXTENDER_TOKEN,
    useClass: BulkCommandsExtender,
    multi: true
};
