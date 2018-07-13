import { ClassProvider, Injectable } from "@angular/core";
import { EditMenuProvider, EDIT_MENU_TOKEN, EditMenuSection, EditMenuButton } from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Injectable()
class EditMenuSpellCheckProvider implements EditMenuProvider {
    getButtons(element: HTMLElement): Array<EditMenuSection> {
        if (element instanceof HTMLSpanElement && element.attributes["suggestion"]) {
            const spellCheckButtons = this.createSpellCheckButtons(element);
            return spellCheckButtons;
        }

        return [];
    }

    private createSpellCheckButtons(element: HTMLElement): Array<EditMenuSection> {
        const suggestion = element.attributes["suggestion"].value;
        const acceptButton: EditMenuButton = {
            name: "check",
            action: () => {
                element.outerHTML = suggestion;
                element.dispatchEvent(new Event("mousedown"));
            },
            text: `${suggestion} - ${Math.round( element.attributes["certainty"].value * 100)}%`,
            tooltip: "Make correction",
            includeUrl: true,
            isActive: false
        };

        const cancelButton: EditMenuButton = {
            name: "times",
            action: () => {
                element.outerHTML = element.innerText;
            },
            text: "",
            tooltip: "Discard correction",
            includeUrl: false,
            isActive: false
        };

        return [
            new EditMenuSection(acceptButton),
            new EditMenuSection(cancelButton)
        ];
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const EDIT_MENU_SPELL_CHECK_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDIT_MENU_TOKEN,
    useClass: EditMenuSpellCheckProvider
};
