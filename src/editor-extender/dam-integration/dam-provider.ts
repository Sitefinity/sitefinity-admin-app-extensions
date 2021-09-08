import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

require("!style-loader!css-loader!./dam-provider.css");

declare var cloudinary;
const TRAILING_BREAK = "<br class='k-br'>";

@Injectable()
class DAMProvider implements EditorConfigProvider {
    private editor;
    private currentRange;
    private editorHost;
    private readonly cloudinaryConfig = {
        cloud_name: 'niki94',
        api_key: '928637728381856',
        multiple: false,
    };

    getToolBarItems(editorHost: any): ToolBarItem[] {
        this.editorHost = editorHost;

        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Cloudinary-selector",
            tooltip: "Cloudinary selector",
            ordinal: 5,
            exec: () => {
                this.getEditor();
                (window as any).dam.show({folder: {}});
            }
        };

        this.loadScript();
        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    configureEditor(configuration: any) {
        return configuration;
    }

    private loadScript() {
        let body = <HTMLDivElement> document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://media-library.cloudinary.com/global/all.js';
        script.async = true;
        script.defer = true;
        script.onload = this.onScriptLoad.bind(this);
        body.appendChild(script);
    }

    private onScriptLoad() {
        (window as any).dam = cloudinary.createMediaLibrary(this.cloudinaryConfig, { insertHandler: this.onImageInsert.bind(this) });
    }

    private onImageInsert(data: any) {
        this.removeCurrentAsset();

        let url;
        const asset = data.assets[0];
        if (asset.derived) {
            if (asset.derived instanceof Array) {
                url = asset.derived[0].url;
            } else {
                url = asset.derived.url;
            }
        } else {
            url = asset.url;
        }

        if(!this.editor) {
            this.getEditor();
        }

        this.editor.selectRange(this.currentRange);
        const imageElement = document.createElement("img");
        imageElement.src = url;
        imageElement.setAttribute("data-sf-ec-immutable", "");
        imageElement.setAttribute("custom-edit-menu", "1");
        imageElement.setAttribute("cloudinary-id", `${asset.resource_type}/${asset.type}/${asset.public_id}`);
        this.editor.paste(`${TRAILING_BREAK}${imageElement.outerHTML}${TRAILING_BREAK}`);
        this.editor.trigger("change");
    }

    private removeCurrentAsset() {
        if ((window as any).damAssetToRemove) {
            (window as any).damAssetToRemove.remove();
        }
    }

    private getEditor() {
        this.editor = this.editorHost.getKendoEditor();
        this.currentRange = this.editor.getRange();
    }
}

export const DAM_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: DAMProvider
};
