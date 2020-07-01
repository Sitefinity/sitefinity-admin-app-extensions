import { ColumnsProvider, EntityData, ColumnModel, COLUMNS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

const COLUMN_TO_REMOVE = "LastModified";

/**
 * A columns provider to provide columns for the list view of the content screen.
 */
@Injectable()
export class NewsColumnProvider implements ColumnsProvider {
    /**
     * Gets an observable collection of columns.
     */
    getColumns(entityData: EntityData): Observable<ColumnModel[]> {
        return of([]);
    }

    /**
     * Gets an obaservable collection of columns to be removed.
     */
    getColumnsToRemove(entityData: EntityData): Observable<string[]> {
        return of([COLUMN_TO_REMOVE]);
    }
}

export const NEWS_COLUMN_PROVIDER = {
    provide: COLUMNS_TOKEN,
    useClass: NewsColumnProvider,
    multi: true
};
