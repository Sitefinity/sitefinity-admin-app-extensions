import { CommandProvider, OperationsData, Command, OPERATIONS_TOKEN, OperationsTarget, UrlService, URL_SERVICE, CommandModel } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs";
import { ClassProvider, Inject } from "@angular/core";
import { ExecutionContext } from "progress-sitefinity-adminapp-sdk/app/api/v1/operations/execution-context";

/**
 * A custom commad
 */
const CUSTOM_COMMAND_BASE: any = {
    Name: "Custom",
    Title: "Print preview",
    Ordinal: -1,
    Category: {
        Name: "Custom",
        Title: "Custom commands"
    },
    Description: null,
    Link: null
};

class DynamicItemIndexCommandProvider implements CommandProvider {
    getCommands(data: OperationsData): Observable<CommandModel[]> {
        const commands = [];
        if (data.target === OperationsTarget.List && data.dataItem) {
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
}

export class PrintPreviewCommand implements Command {   
    constructor(@Inject(URL_SERVICE) private urlService: UrlService) {}

    execute(context: ExecutionContext): Observable<any> {
        const dataItem = context.data.dataItem;
        const url = `/print-preview?entitySet=${dataItem.metadata.setName}&id=${dataItem.key}` + (dataItem.provider ? `&provider=${dataItem.provider}` : ``);
        window.open(this.urlService.getAbsoluteUrl(url), "_blank");
        return null;
    }
}

export const OPERATIONS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexCommandProvider,
    multi: true,
    provide: OPERATIONS_TOKEN
};
