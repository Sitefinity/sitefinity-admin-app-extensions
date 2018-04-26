import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { COMMANDS_PROVIDER, PrintPreviewCommand } from "./commands-provider";
import { PrintPreviewComponent } from "./print-preview.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        PrintPreviewComponent
    ],
    entryComponents: [
        PrintPreviewComponent
    ],
    providers: [
        COMMANDS_PROVIDER,
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
