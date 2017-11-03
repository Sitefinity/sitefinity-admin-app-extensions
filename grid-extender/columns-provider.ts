import { Observable } from "rxjs";
import { ColumnsProvider, ColumnModel, COLUMNS_TOKEN } from "./../node_modules/sitefinity-admin-app/app/api"; // TODO: change to "sitefinity-admin-app/app/api" once the app is published on npm
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
