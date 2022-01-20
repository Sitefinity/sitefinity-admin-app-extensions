import { NgModule } from "@angular/core";
import { CUSTOM_NOTIFICATION_ICON_PROVIDER } from "./custom-notification-icon-provider";

/**
 * The notifications icons extender module.
 */
@NgModule({
    providers: [
        CUSTOM_NOTIFICATION_ICON_PROVIDER
    ]
})
export class NotificationsIconsExtenderModule { /* empty */ }
