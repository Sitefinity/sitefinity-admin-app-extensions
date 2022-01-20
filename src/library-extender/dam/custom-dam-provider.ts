import { ClassProvider, Injectable } from "@angular/core";
import { DamProviderBase, DAM_PROVIDER_TOKEN, EntityData } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { DamAsset } from "@progress/sitefinity-adminapp-sdk/app/api/v1/dam/dam-asset";

declare var cloudinary: any;

const CUSTOM_MEDIA_CANNOT_BE_LOADED = "Custom media selector cannot be loaded.";
const CUSTOM_PROVIDER_TYPE_NAME = "CloudinaryBlobStorageProvider";

@Injectable()
class CustomDamProvider extends DamProviderBase {
    isSupported(providerTypeName: string): boolean {
        return providerTypeName === CUSTOM_PROVIDER_TYPE_NAME;
    }

    loadMediaSelector(damWrapper: HTMLElement, mediaEntityData: EntityData, allowMultiSelect: boolean): void {
        if (!this.areSettingsPropertiesValid()) {
            this.error(CUSTOM_MEDIA_CANNOT_BE_LOADED);
            return;
        }

        alert("load custom dam provider wowowo");

        this.loadDynamicScript(this.getPropertyValue("ScriptUrl")).subscribe(() => {
            if (typeof cloudinary === "undefined") {
                this.error(CUSTOM_MEDIA_CANNOT_BE_LOADED);
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
            this.error(CUSTOM_MEDIA_CANNOT_BE_LOADED);
        });
    }

    private insertHandler(data): void {
        this.mediaSelected();
        const damAssets: DamAsset[] = [];
        if (data.assets) {
            data.assets.forEach(asset => {
                const damAsset: DamAsset = this.getDamAsset(asset);

                damAssets.push(damAsset);
            });

            this.assetsSelected(damAssets);
        } else {
            this.error("FAILED_TO_INSERT_MEDIA_ASSET");
        }
    }

    private areSettingsPropertiesValid(): boolean {
        if (!this.settings) {
            return false;
        }

        const cloudName = this.getPropertyValue("CloudName");
        if (!cloudName) {
            return false;
        }

        const scriptUrl = this.getPropertyValue("ScriptUrl");
        if (!scriptUrl) {
            return false;
        }

        const apiKey = this.getPropertyValue("ApiKey");
        if (!apiKey) {
            return false;
        }

        return true;
    }

    private getDamAsset(asset: any): DamAsset {
        const slashIndex = asset.public_id.lastIndexOf("/");
        let title = asset.public_id.substring(slashIndex + 1);
        const dotIndex = title.indexOf(".");
        if (dotIndex > - 1) {
            asset.format = asset.format ?? title.substring(dotIndex + 1);
            title = title.substring(0, dotIndex);
        }

        const damAsset: DamAsset = {
            id: asset.public_id,
            title: title,
            mimeType: null,
            extension: `.${asset.format}`,
            width: parseInt(asset.width) || null,
            height: parseInt(asset.height) || null,
            size: parseInt(asset.bytes),
            url: asset.secure_url
        };

        return damAsset;
    }
}

export const CUSTOM_DAM_PROVIDER: ClassProvider = {
    multi: true,
    provide: DAM_PROVIDER_TOKEN,
    useClass: CustomDamProvider
};
