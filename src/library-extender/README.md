# Custom Digital Assets Management provider

> IMPORTANT - Please note that there is a known limitation, you cannot use the Angular binding syntax {{item.data.CreatedBy}}, when creating component HTML templates, you must use another binding, for example [textContent]="item.data.CreatedBy", or [innerHtml]="item.data.Content".

You can add custom DAM providers if the one you are using is not supported by default from Sitefinity - Frontify and Cloudinary.
**Note:** There must be only one enabled DAM provider on the server

In order to register new provider you need to create new provider which extends **DamProviderBase**.
There are two abstract methods that need to be implemented because they are specific for each provider:
* #### isSupported - Use this method to determine if your provider supports the one that is enabled on the server. As parameter it receives the name of the provider which is defined server-side.
```javascript
isSupported(providerTypeName: string): boolean {
	return providerTypeName === "CustomProviderName";
}
```
* #### loadMediaSelector - Use this method to instantiate the widget which is used to select and import asses from your DAM.
It must convert all selected assets to a specific interface **DamAsset**, add them to an array and call __assetsSelected__ method of the base class.
```javascript
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

All the rest of the import will be handled from the base class.
