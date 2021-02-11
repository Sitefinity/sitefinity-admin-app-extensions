import { Injectable, ClassProvider } from "@angular/core";
import { ItemHooksProvider, ITEM_HOOKS_PROVIDER_TOKEN, DataItem } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable, ReplaySubject } from "rxjs";

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

    onEditItemChanged(item: DataItem): Observable<void> {
        return this.executeAsyncOperation(`Item changed: ${item?.data?.Title || 'No item'}`);
    }

    onEditItemInitializing(item: DataItem): Observable<void> {
        return this.executeAsyncOperation(`Item initializing: ${item?.data?.Title || 'No item'}`);
    }

    onEditItemUnloading(item: DataItem): Observable<void> {
        return this.executeAsyncOperation(`Item unloading: ${item?.data?.Title || 'No item'}`);
    }

    onGridItemsChanged(items: DataItem[]): Observable<void> {
        return this.executeAsyncOperation(`Grid items changing: ${items?.length ? items.map(x => x.data.Title) : 'No items'}`);
    }

    onGridItemsInitializing(items: DataItem[]): Observable<void> {
        return this.executeAsyncOperation(`Grid items initializing: ${items?.length ? items.map(x => x.data.Title) : 'No items'}`);
    }

    onGridItemsUnloading(items: DataItem[]): Observable<void> {
        return this.executeAsyncOperation(`Grid items unloading: ${items?.length ? items.map(x => x.data.Title) : 'No items'}`);
    }

    private executeAsyncOperation(message: string): Observable<void> {
        const result$ = new ReplaySubject<void>();

        setTimeout(() => {
            console.log(message);
        }, 1000);

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
