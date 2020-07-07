import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { COMMANDS_PROVIDER } from "./commands-provider";
import { PrintPreviewComponent } from "./print-preview.component";
import { PrintPreviewCommand } from "./print-preview.command";
import { BULK_COMMANDS_EXTENDER } from "./bulk-commands-extender";

/**
 * The command extender module.
 */
@NgModule({
    declarations: [
        PrintPreviewComponent
    ],
    entryComponents: [
        PrintPreviewComponent
    ],
    providers: [
        COMMANDS_PROVIDER,
        BULK_COMMANDS_EXTENDER,
        PrintPreviewCommand
    ],
    imports: [
        RouterModule.forChild([{ path: "print-preview", component: PrintPreviewComponent }]),
        CommonModule,
        HttpClientModule
    ]
})
export class CommandsExtenderModule {
    /* empty */
}
