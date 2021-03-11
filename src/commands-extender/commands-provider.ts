import { CommandProvider, CommandsData, COMMANDS_TOKEN, CommandsTarget, CommandModel, CommandCategory } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { Observable, of } from "rxjs";
import { ClassProvider, Injectable } from "@angular/core";
import { PrintPreviewCommand } from "./print-preview.command";
import { ListSelectedItemsCommand } from "./list-selected-items.command";
import { NotificationCommand } from './notification.command';

/**
 * The category name in which to place the custom commands.
 */
const CUSTOM_CATEGORY_NAME = "Custom";

/**
 * The command model containing the metadata of the command.
 * The ordinal indicates where to place the command in the dropdown.
 */
const CUSTOM_COMMAND_BASE: CommandModel = {
    name: "Custom",
    title: "Print preview",
    ordinal: -1,
    category: CUSTOM_CATEGORY_NAME
};

/**
 * The category model.
 */
const CUSTOM_CATEGORY: CommandCategory = {
    name: CUSTOM_CATEGORY_NAME,
    title: "Custom commands"
};

/**
 * The command model containing the metadata of the command.
 */
export const LIST_SELECTED_ITEMS_COMMAND: CommandModel = {
    name: "List",
    title: "List selected items",
    category: CUSTOM_CATEGORY_NAME,
    ordinal: CUSTOM_COMMAND_BASE.ordinal + 1
};

/**
 * The command model containing the metadata of the command.
 */
export const NOTIFICATION_COMMAND: CommandModel = {
    name: "Notification",
    title: "Show notification",
    category: CUSTOM_CATEGORY_NAME,
    ordinal: CUSTOM_COMMAND_BASE.ordinal + 1
};

/**
 * The command provider provides the necessary commands back to the AdminApp.
 */
@Injectable()
class DynamicItemIndexCommandProvider implements CommandProvider {

    /**
     * The method that gets invoked asking for the command models when the action menu is constructed.
     * @param data The data needed to determine the types of command to return
     * and where to place them - in the list or in edit mode
     */
    getCommands(data: CommandsData): Observable<CommandModel[]> {

        // the commands to be returned
        const commands: CommandModel[] = [];

        this.addPrintPreviewCommand(data, commands);
        this.addListSelectedItemsCommand(data, commands);
        this.addNotificationCommand(data, commands);

        // return an observable here, because generating the actions might be a time consuming operation
        return of(commands);
    }

    /**
     * The method that gets invoked asking for the category models when the action menu is constructed.
     * Categories are used to group similar commands in the action menu
     * @param data The data needed to determine the types of command to return and where to place them - in the list or in edit mode
     */
    getCategories(data: CommandsData): Observable<CommandCategory[]> {
        return of([CUSTOM_CATEGORY]);
    }

    private addPrintPreviewCommand(data: CommandsData, commands: CommandModel[]) {
        // we wish to inject this command only in the list view
        if (data.target === CommandsTarget.List && data.dataItem) {
            const previewCommand = Object.assign({}, CUSTOM_COMMAND_BASE);

            // assign an injection token or just the class
            previewCommand.token = {
                type: PrintPreviewCommand,

                // assign custom properties to be passed in the context
                properties: {
                    dataItem: data.dataItem
                }
            };

            commands.push(previewCommand);
        }
    }

    private addListSelectedItemsCommand(data: CommandsData, commands: CommandModel[]) {
        if (data.target === CommandsTarget.Bulk) {
            const bulkCommand = Object.assign({}, LIST_SELECTED_ITEMS_COMMAND);

            bulkCommand.token = {
                type: ListSelectedItemsCommand
            };

            commands.push(bulkCommand);
        }
    }

    private addNotificationCommand(data: CommandsData, commands: CommandModel[]) {
        // we wish to inject this command only in the edit item view
        if (data.target === CommandsTarget.Edit) {
            const notificationCommand = Object.assign({}, NOTIFICATION_COMMAND);

            // assign an injection token or just the class
            notificationCommand.token = {
                type: NotificationCommand,

                // assign custom properties to be passed in the context
                properties: {
                    dataItem: data.dataItem
                }
            };

            commands.push(notificationCommand);
        }
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const COMMANDS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexCommandProvider,
    multi: true,
    provide: COMMANDS_TOKEN
};
