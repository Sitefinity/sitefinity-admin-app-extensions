# Custom Digital Assets Management provider

> IMPORTANT - Please note that there is a known limitation, you cannot use the Angular binding syntax {{item.data.CreatedBy}}, when creating component HTML templates, you must use another binding, for example [textContent]="item.data.CreatedBy", or [innerHtml]="item.data.Content".

You can add custom DAM providers if the one you are using is not supported by default from Sitefinity - Frontify and Cloudinary.
    
    Note: There must be only one enabled DAM provider on the server - In your case ths should be the server-side implementation of your custom DAM provider.

In order to register new provider you need to create new class which extends **DamProviderBase**.
```typescript
import { ClassProvider, Injectable } from "@angular/core";
import { DamProviderBase, DAM_PROVIDER_TOKEN, EntityData } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { DamAsset } from "@progress/sitefinity-adminapp-sdk/app/api/v1/dam/dam-asset";

declare var cloudinary: any;

const CUSTOM_MEDIA_CANNOT_BE_LOADED = "Custom media selector cannot be loaded.";
const CUSTOM_PROVIDER_TYPE_NAME = "CloudinaryBlobStorageProvider";

@Injectable()
class CustomDamProvider extends DamProviderBase {
    isSupported(providerTypeName: string): boolean {
        ...
    }
    
    loadMediaSelector(damWrapper: HTMLElement, mediaEntityData: EntityData, allowMultiSelect: boolean): void {
        ...
    }
}    
```
There are two abstract methods that need to be implemented because they are specific for each provider:
* #### isSupported - Use this method to determine if your provider supports the one that is enabled on the server. As parameter it receives the name of the provider which is defined server-side.
```typescript
isSupported(providerTypeName: string): boolean {
	return providerTypeName === "CustomProviderName";
}
```
* #### loadMediaSelector - Use this method to instantiate the widget which is used to select and import asses from your DAM.
It must convert all selected assets to a specific interface **DamAsset**, add them to an array and call __assetsSelected__ method of the base class.
```typescript
loadMediaSelector(damWrapper: HTMLElement, mediaEntityData: EntityData, allowMultiSelect: boolean): void {
    if (!this.areSettingsPropertiesValid()) {
        this.error("Custom media selector cannot be loaded.");
        return;
    }

    this.loadDynamicScript(this.getPropertyValue("ScriptUrl")).subscribe(() => {
        if (typeof cloudinary === "undefined") {
            this.error("Custom media selector cannot be loaded.");
            return;
        }

        let config = {
            cloud_name: this.getPropertyValue("CloudName"),
            api_key: this.getPropertyValue("ApiKey"),
            multiple: allowMultiSelect,
            inline_container: `.${damWrapper.className.replace(/\s/g, ".")}`,
            remove_header: true,
            integration: {
                type: "custom_progress_sitefinity_connector_for_frontify",
                platform: "admin app extensions",
                version: "1.0",
                environment: null
            }
        };

        const handlers = {
            insertHandler: this.insertHandler.bind(this),
            errorHandler: this.error.bind(this)
        };

        try {
            const mediaLibrary = cloudinary.createMediaLibrary(config, handlers);
            mediaLibrary.show(config);
        } catch (error) {
            this.error(error);
        }
    }, () => {
        this.error("Custom media selector cannot be loaded.");
    });
}
```

Create ClassProvider for your custom DAM provider and register it in library-extender/index.ts:
```typescript
export const CUSTOM_DAM_PROVIDER: ClassProvider = {
    multi: true,
    provide: DAM_PROVIDER_TOKEN,
    useClass: CustomDamProvider
};
```
After the implementation is complete when click on insert image/document in the rich editor or click to relate media item the widget of the DAM provider will open into the dialog.
