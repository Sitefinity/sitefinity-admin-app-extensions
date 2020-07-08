import { CommandsFilter, CommandsData, COMMANDS_FILTER_TOKEN, CommandModel } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Injectable } from "@angular/core";

@Injectable()
class NewsCommandsFilter implements CommandsFilter  {
    filter(operations: CommandModel[], data: CommandsData): CommandModel[] {
        if (data.dataItem.metadata.setName === "newsitems") {
            return operations.filter(x => x.name !== "Delete");
        }
    }
}

export const NEWS_COMMANDS_FILTER = {
    provide: COMMANDS_FILTER_TOKEN,
    useClass: NewsCommandsFilter,
    multi: true
};
