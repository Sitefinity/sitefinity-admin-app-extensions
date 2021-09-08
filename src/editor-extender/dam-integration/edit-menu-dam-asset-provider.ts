import { ClassProvider, Injectable } from "@angular/core";
import { EditMenuProvider, EDIT_MENU_TOKEN, EditMenuSection, EditMenuButton } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

@Injectable()
class EditMenuDamAssetProvider implements EditMenuProvider {
    getButtons(element: HTMLElement): Array<EditMenuSection> {
        if (element instanceof HTMLImageElement && element.attributes["cloudinary-id"]) {
            const spellCheckButtons = this.createSpellCheckButtons(element);
            return spellCheckButtons;
        }

        return [];
    }

    private createSpellCheckButtons(element: HTMLElement): Array<EditMenuSection> {
        const assetId = element.attributes["cloudinary-id"].value;

        const acceptButton: EditMenuButton = {
            name: "edit",
            action: () => {
                (window as any).damAssetToRemove = element;
                (window as any).dam.show({ asset: { resource_id: assetId }});
            },
            text: null,
            tooltip: "Edit",
            isActive: false,
            closeMenuOnClick: true
        };

        return [
            new EditMenuSection(acceptButton)
        ];
    }
}

export const EDIT_MENU_DAM_ASSET_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDIT_MENU_TOKEN,
    useClass: EditMenuDamAssetProvider
};
