import { OperationsProvider, OperationsData, Operation, OPERATIONS_TOKEN, OperationsTarget, UrlService, URL_SERVICE } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs";
import { ClassProvider, Inject } from "@angular/core";

/**
 * A custom operation
 */
const CUSTOM_OPERATION: Operation = {
    Name: "Custom",
    Title: "Print preview",
    Ordinal: -1,
    Category: "Custom",
    Description: null,
    Link: null
};

class DynamicItemIndexOperationsProvider implements OperationsProvider {
    constructor(@Inject(URL_SERVICE) private urlService: UrlService) {}

    getOperations(data: OperationsData): Observable<Operation[]> {
        const operations = [];
        if (data.target === OperationsTarget.List && data.dataItem) {
            const url = `/print-preview?entitySet=${data.dataItem.metadata.setName}&id=${data.dataItem.key}` + (data.dataItem.provider ? `&provider=${data.dataItem.provider}` : ``);
            const previewOperation = Object.assign({}, CUSTOM_OPERATION, { Link: this.urlService.getAbsoluteUrl(url) });
            operations.push(previewOperation);
        }

        return Observable.of(operations);
    }
}

export const OPERATIONS_PROVIDER: ClassProvider = {
    useClass: DynamicItemIndexOperationsProvider,
    multi: true,
    provide: OPERATIONS_TOKEN
};
