import { Observable } from "rxjs";
import { ColumnsProvider, ColumnModel, COLUMNS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ImageComponent } from "./image.component";
import { ClassProvider } from "@angular/core";

class DynamicItemIndexColumnsProvider implements ColumnsProvider {
    private columnName: string = "image";
    private order: number = 1;
    private columnTitle: string = "Image";

    getColumns(type: string): Observable<ColumnModel[]> {
        const column: ColumnModel = {
            name: this.columnName,
            title: this.columnTitle,
            component: ImageComponent
        };

        return Observable.of([column]);
    }
}

export const COLUMNS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexColumnsProvider,
    multi: true,
    provide: COLUMNS_TOKEN
};
