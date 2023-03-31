# Custom system notification icon

## Implementation

Each system notification coming from Sitefinity has a property **NotificationKey**. This property is used to build the class of the icon for the specific notification. Whether you create your own custom notifications, or you are working with the ones already registered in Sitefinity, you can use this property, and depending on its value, change the icon of the notification.

In order to do that, you have to register your own notification icon provider by inheriting from the **SystemNotificationIconProvider**. This will force you to implement the `parseIcon()` method, which will actually build the icon class, depending on the **NotificationKey**.

## Example

    const DEFAULT_ICON = "check";
    const FIRST_CUSTOM_ICON = "user";
    const VIDEO_PUBLISHED_ICON = "film";
    const NEW_FORM_RESPONSE_ICON = "form-response";

	@Injectable()
	export class CustomSystemNotificationIconProvider implements SystemNotificationIconProvider {
		parseIcon(key: string): string {
			switch (key) {
				// custom icons
				case "user-created":
					return FIRST_CUSTOM_ICON;
				case "video-published":
					return VIDEO_PUBLISHED_ICON;
				// override the default form resoinse notification icon
				case "subscribed-responses":
					return NEW_FORM_RESPONSE_ICON;
				// override the default icon
				default:
					return DEFAULT_ICON;
			}
		}
	}

In the above example, **"check"**, **"user"** and **"film"** are font awesome icons. The **key** argument, passed to the `parseIcon()` function is the **NotificationKey**, coming from Sitefinity. Here are covered the following scenarios: 

1. The first two cases will be handled if you have declared custom notification with keys "user-created" or "video-published".
2. The "subscribed-responses" is actually the default **NotificationKey** in Sitefinity, for form responses. So, in this case you can override its default icon class.
3. If you choose to have a default case, you can override the default Sitefinity notification icon.

Please, refer to this example, for information on, how can you write and register your own notification icon providers.