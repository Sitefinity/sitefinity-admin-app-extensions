import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { COMMANDS_PROVIDER } from "./commands-provider";
import { CUSTOM_COMMANDS_FILTER } from "./commands-filter";
import { PreviewCommand } from "./preview.command";

/**
 * The command extender module.
 */
@NgModule({
    providers: [
        COMMANDS_PROVIDER,
        CUSTOM_COMMANDS_FILTER,
        PreviewCommand
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class CommandsExtenderModule {
    /* empty */
}
