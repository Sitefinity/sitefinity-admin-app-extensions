import { NgModule } from "@angular/core";
import { CUSTOM_SYSTEM_NOTIFICATION_ICON_PROVIDER } from "./custom-system-notification-icon-provider";

/**
 * The notifications icons extender module.
 */
@NgModule({
    providers: [
        CUSTOM_SYSTEM_NOTIFICATION_ICON_PROVIDER
    ]
})
export class SystemNotificationsIconsExtenderModule { /* empty */ }
