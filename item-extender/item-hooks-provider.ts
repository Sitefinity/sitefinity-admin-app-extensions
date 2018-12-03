import { Injectable, ClassProvider } from "@angular/core";
import { ItemHooksProvider, ITEM_HOOKS_PROVIDER_TOKEN, DataItem } from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Injectable()
class CustomItemHooksProvider implements ItemHooksProvider {
    onItemLoaded(item: DataItem): void {
        console.log(`Item is loaded: ${item.data.Title}`);
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const ITEM_HOOKS_PROVIDER: ClassProvider = {
    multi: true,
    provide: ITEM_HOOKS_PROVIDER_TOKEN,
    useClass: CustomItemHooksProvider
};
