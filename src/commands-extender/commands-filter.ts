import { CommandsFilter, CommandsData, COMMANDS_FILTER_TOKEN, CommandModel, CommandsTarget } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { Injectable } from "@angular/core";

@Injectable()
class CustomCommandsFilter implements CommandsFilter  {
    filter(operations: CommandModel[], data: CommandsData): CommandModel[] {
        if (data.dataItem.metadata.setName === "newsitems" && data.target === CommandsTarget.Edit) {
            return operations.filter(x => x.name !== "Preview");
        }

        return operations;
    }
}

export const CUSTOM_COMMANDS_FILTER = {
    provide: COMMANDS_FILTER_TOKEN,
    useClass: CustomCommandsFilter,
    multi: true
};
