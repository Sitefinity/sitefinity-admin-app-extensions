import { Observable, of } from "rxjs";
import { ColumnModel, COLUMNS_TOKEN, EntityData, ListColumnsProvider } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { ImageComponent } from "./image.component";
import { ClassProvider, Injectable } from "@angular/core";

const COLUMN_TO_REMOVE = "LastModified";

/**
 * The index provider provides the custom columns back to the AdminApp.
 */
@Injectable()
class DynamicItemIndexColumnsProvider implements ListColumnsProvider {
    private columnName: string = "image3";
    private columnTitle: string = "Image";

    /**
     * This method gets invoked by the AdminApp when the columns from all of the providers are needed.
     * @param entityData Provides metadata for the current type.
     */
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    getColumns(entityData: EntityData): Observable<ColumnModel[]> {

        // return the column model
        const column: ColumnModel = {
            name: this.columnName,
            title: this.columnTitle,
            ordinal: 50,

            // The componentData object holds the type of component to initialize
            // properties can be passed as well. They will be set on the component once it is initialized.
            componentData: {
                type: ImageComponent
            }
        };

        // return an observable here, because this might be a time consuming operation
        return of([column]);
    }

    /**
     * Gets an obaservable collection of columns to be removed.
     * @param {EntityData} entityData Provides metadata for the current type.
     * @returns {Observable<string[]>} The columns which should be removed.
     * @memberof DynamicItemIndexColumnsProvider
     */
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
    getColumnsToRemove(entityData: EntityData): Observable<string[]> {
            return of([COLUMN_TO_REMOVE]);
        }
    }

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const COLUMNS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexColumnsProvider,
    multi: true,
    provide: COLUMNS_TOKEN
};
