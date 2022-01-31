import { ClassProvider, Injectable, NgZone } from "@angular/core";
import { EntityData, DamAsset, DamProviderBase, DAM_PROVIDER_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

declare var cloudinary: any;

const CUSTOM_MEDIA_CANNOT_BE_LOADED = "Custom media selector cannot be loaded.";
const CUSTOM_PROVIDER_TYPE_NAME = "CloudinaryBlobStorageProvider";
const CLOUDINARY_ID_QUERY_PARAM = "sf_cl_id";
const CLOUDINARY_VERSION_QUERY_PARAM = "sf_cl_version";

// example implementation for custom provider based on Cloudinary
@Injectable()
 class CustomDamProvider extends DamProviderBase {
    constructor(zone: NgZone) {
        super(zone);
    }

    isSupported(providerTypeName: string): boolean {
        // validate the configured provider name equals with the custom implemented
        return providerTypeName === CUSTOM_PROVIDER_TYPE_NAME;
    }

    loadMediaSelector(damWrapper: HTMLElement, mediaEntityData: EntityData, allowMultiSelect: boolean): void {
        // first validate the settings coming from the server
        if (!this.areSettingsPropertiesValid()) {
            this.error(CUSTOM_MEDIA_CANNOT_BE_LOADED);
            return;
        }

        this.loadDynamicScript(this.getPropertyValue("ScriptUrl")).subscribe(() => {
            // if script is loaded successfully 'cloudinary' variable must be initialized
            if (typeof cloudinary === "undefined") {
                this.error(CUSTOM_MEDIA_CANNOT_BE_LOADED);
                return;
            }

            // create configuration specific for Cloudinary
            const config = {
                cloud_name: this.getPropertyValue("CloudName"),
                api_key: this.getPropertyValue("ApiKey"),
                multiple: allowMultiSelect,
                inline_container: `.${damWrapper.className.replace(/\s/g, ".")}`,
                remove_header: true,
                integration: {
                    type: "custom_progress_sitefinity_connector_for_cloudinary",
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
                // instantiate and open widget
                cloudinary.openMediaLibrary(config, handlers);
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
                // convert selected DAM assets to DamAsset interface
                const damAsset: DamAsset = this.getDamAsset(asset);
                damAssets.push(damAsset);
            });

            // pass converted assets to base class
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
        asset.format = asset.format || this.getExtensionFromFileName(title);
        title = this.getFileNameWithoutExtension(title);

        let url: string = asset.secure_url;
        if (asset.derived && asset.derived.length) {
            url = asset.derived[0].secure_url;
            asset.format = this.getExtensionFromFileName(url) || asset.format;
        }

        const appendSymbol = url.indexOf("?") === -1 ? "?" : "&";
        url += `${appendSymbol}${CLOUDINARY_ID_QUERY_PARAM}=${asset.public_id}&${CLOUDINARY_VERSION_QUERY_PARAM}=${asset.version}`;

        const damAsset: DamAsset = {
            title: title,
            mimeType: null,
            extension: `.${asset.format}`,
            width: Math.floor(asset.width) || null,
            height: Math.floor(asset.height) || null,
            size: Math.floor(asset.bytes),
            url: url
        };

        return damAsset;
    }

    private getExtensionFromFileName(fileName: string): string {
        const nameArray = fileName.split(".");
        if (nameArray.length > 1) {
            return nameArray.pop();
        }

        return "";
    }

    private getFileNameWithoutExtension(fileName: string): string {
        const nameArray = fileName.split(".");
        if (nameArray && nameArray.length) {
            return nameArray[0];
        }

        return fileName;
    }
}

export const CUSTOM_DAM_PROVIDER: ClassProvider = {
    multi: true,
    provide: DAM_PROVIDER_TOKEN,
    useClass: CustomDamProvider
};
