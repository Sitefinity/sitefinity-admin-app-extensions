import { CommandProvider, CommandsData, COMMANDS_TOKEN, CommandsTarget, CommandModel, CommandCategory } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { Observable, of } from "rxjs";
import { ClassProvider, Injectable } from "@angular/core";
import { PreviewCommand } from './preview.command';

/**
 * The category name in which to place the custom commands.
 */
const CUSTOM_CATEGORY_NAME = "Custom";

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
export const CUSTOM_PREVIEW_COMMAND: CommandModel = {
    name: "CustomPreview",
    title: "Custom Preview",
    category: CUSTOM_CATEGORY_NAME,
    ordinal: -1
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

        this.addPreviewCommand(data, commands);

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

    private addPreviewCommand(data: CommandsData, commands: CommandModel[]) {
        // we wish to inject this command only in the edit item view
        if (data.target === CommandsTarget.Edit) {
            const previewCommand = Object.assign({}, CUSTOM_PREVIEW_COMMAND);

            // assign an injection token or just the class
            previewCommand.token = {
                type: PreviewCommand,

                // assign custom properties to be passed in the context
                properties: {
                    dataItem: data.dataItem
                }
            };

            commands.push(previewCommand);
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
