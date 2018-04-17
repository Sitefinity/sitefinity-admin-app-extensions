import { CommandProvider, CommandsData, Command, COMMANDS_TOKEN, CommandsTarget, CommandModel, CommandCategory, ExecutionContext } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs";
import { ClassProvider, Injectable } from "@angular/core";
import { Router } from "@angular/router";

const CUSTOM_CATEGORY_NAME = "Custom";
const CUSTOM_COMMAND_BASE: CommandModel = {
    name: "Custom",
    title: "Print preview",
    ordinal: -1,
    category: CUSTOM_CATEGORY_NAME
};

const CUSTOM_CATEGORY: CommandCategory = {
    name: "Custom",
    title: "Custom commands"
};

class DynamicItemIndexCommandProvider implements CommandProvider {
    getCommands(data: CommandsData): Observable<CommandModel[]> {
        const commands = [];
        if (data.target === CommandsTarget.List && data.dataItem) {
            const previewCommand = Object.assign({}, CUSTOM_COMMAND_BASE);
            previewCommand.token = {
                type: PrintPreviewCommand,
                properties: {
                    dataItem: data.dataItem
                }
            }

            commands.push(previewCommand);
        }

        return Observable.of(commands);
    }

    getCategories(data: CommandsData): Observable<CommandCategory[]> {
        return Observable.of([CUSTOM_CATEGORY]);
    }
}

@Injectable()
export class PrintPreviewCommand implements Command {   
    constructor(protected router: Router) {}

    execute(context: ExecutionContext): Observable<any> {
        const dataItem = context.data.dataItem;
        const currentQueryParams = {
            entitySet: dataItem.metadata.setName,
            id: dataItem.key,
            provider: dataItem.provider
        }
        const url = `/print-preview`;
        this.router.navigate([url], { queryParams: currentQueryParams });
        return Observable.of(null);
    }
}

export const OPERATIONS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexCommandProvider,
    multi: true,
    provide: COMMANDS_TOKEN
};
