import { Observable } from "rxjs";
import { ColumnsProvider, ColumnModel, COLUMNS_TOKEN, EntityData } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { DecExtensibilityLoaderCellComponent } from "./dec-cell.component";
import { ClassProvider } from "@angular/core";

class DecExtensibilityLoaderColumnProvider implements ColumnsProvider {
    private columnName: string = "dec-cell-extension";
    private columnTitle: string = "dec-cell-extension";

    getColumns(entityData: EntityData): Observable<ColumnModel[]> {
        const column: ColumnModel = {
            name: this.columnName,
            title: this.columnTitle,
            componentData: {
                type: DecExtensibilityLoaderCellComponent
            }
        };

        return Observable.of([column]);
    }
}

export const COLUMNS_PROVIDER: ClassProvider = {
    useClass: DecExtensibilityLoaderColumnProvider,
    multi: true,
    provide: COLUMNS_TOKEN
};
