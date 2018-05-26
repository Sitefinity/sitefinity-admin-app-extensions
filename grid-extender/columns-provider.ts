import { Observable } from "rxjs";
import { ColumnsProvider, ColumnModel, COLUMNS_TOKEN, EntityData } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ImageComponent } from "./image.component";
import { ClassProvider, Injectable } from "@angular/core";

/**
 * The index provider provides the custom columns back to the AdminApp.
 */
@Injectable()
class DynamicItemIndexColumnsProvider implements ColumnsProvider {
    private columnName: string = "image3";
    private columnTitle: string = "Image";

    /**
     * This method gets invoked by the AdminApp when the columns from all of the providers are needed.
     * @param entityData Provides metadata for the current type.
     */
    getColumns(entityData: EntityData): Observable<ColumnModel[]> {

        // return the column model
        const column: ColumnModel = {
            name: this.columnName,
            title: this.columnTitle,

            // The componentData object holds the type of component to initialize
            // properties can be passed as well. They will be set on the component once it is initialized.
            componentData: {
                type: ImageComponent
            }
        };

        // return an observable here, because this might be a time consuming operation
        return Observable.of([column]);
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
