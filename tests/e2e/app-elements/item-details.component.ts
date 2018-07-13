require("jasmine-expect");
import { ItemDetailsMap } from './item-details.map';
import { BrowserWaitForElement } from "../helpers/browser-helpers";


export class ItemDetails {

    async verifyCustomTitleField() {
        await BrowserWaitForElement(ItemDetailsMap.TitleField);
        expect(await ItemDetailsMap.ExtendedTitleField.isPresent()).toBeTruthy("The title field extension class was not found");
    }
}
