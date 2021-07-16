import { Injectable, ClassProvider } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { ItemHooksProvider, ITEM_HOOKS_PROVIDER_TOKEN, DataItem, EditLifecycleHookParam, ListLifecycleHookParam } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

@Injectable()
class CustomItemHooksProvider implements ItemHooksProvider {
    onItemLoaded(item: DataItem): void {
        if (item.data) {
            // tslint:disable-next-line:no-console
            console.log(`Item is loaded: ${item.data.Title}`);
        } else {
            // tslint:disable-next-line:no-console
            console.log(`A new item is being created`);
        }
    }

    onEditItemChanged(data: EditLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Item changed: ${data.item?.data?.Title || "No item"}`);
    }

    onEditItemInitializing(data: EditLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Item initializing: ${data.item?.data?.Title || "No item"}`);
    }

    onEditItemUnloading(data: EditLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Item unloading: ${data.item?.data?.Title || "No item"}`);
    }

    afterEditItemInit(data: EditLifecycleHookParam): Observable<void> {
        return this.executeOperation(`After edit item init: ${data.item?.data?.Title || "No item"}`);
    }

    onGridItemsChanged(data: ListLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Grid items changing: ${data.items?.length ? data.items.map(x => x.data.Title) : "No items"}`);
    }

    onGridItemsInitializing(data: ListLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Grid items initializing: ${data.items?.length ? data.items.map(x => x.data.Title) : "No items"}`);
    }

    onGridItemsUnloading(data: ListLifecycleHookParam): Observable<void> {
        return this.executeOperation(`Grid items unloading: ${data.items?.length ? data.items.map(x => x.data.Title) : "No items"}`);
    }

    afterGridInit(data: ListLifecycleHookParam): Observable<void> {
        return this.executeOperation(`After grid init: ${data.items?.length ? data.items.map(x => x.data.Title) : "No items"}`);
    }

    private executeOperation(message: string): Observable<void> {
        const result$ = new ReplaySubject<void>();

        // tslint:disable-next-line: no-console
        console.log(message);
        result$.next();

        return result$.asObservable();
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
