import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { COMMANDS_PROVIDER } from "./commands-provider";
import { PrintPreviewComponent } from "./print-preview.component";
import { PrintPreviewCommand } from "./print-preview.command";
import { CUSTOM_COMMANDS_FILTER } from "./commands-filter";
import { ListSelectedItemsCommand } from "./list-selected-items.command";
import { NotificationCommand } from "./notification.command";

import { AuthGuard, ConfigurationGuard } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { SfInputModule } from "@progress/sitefinity-component-framework"


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
        CUSTOM_COMMANDS_FILTER,
        PrintPreviewCommand,
        ListSelectedItemsCommand,
        NotificationCommand
    ],
    imports: [
        RouterModule.forChild([{ path: "print-preview", component: PrintPreviewComponent, canActivate: [ConfigurationGuard, AuthGuard] }]),
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        SfInputModule
    ]
})
export class CommandsExtenderModule {
    /* empty */
}
