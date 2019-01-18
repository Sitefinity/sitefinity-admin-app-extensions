import { Component } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

/*
 * NOTE: Replace this example keys with your subscription keys.
 * For more information on how to get a key check here: https://developer.here.com/?create=Freemium-Basic&keepState=true&step=terms
 */
const HERE_MAPS_APP_ID = 'iV0wv8ievlwH8Fd5Raii';
const HERE_MAPS_APP_CODE = 'AHNPEuMJkSuNjkP7SpW2xg';

const HOST = 'http://autocomplete.geocoder.api.here.com';
const PATH = '/6.2/suggest.json';

@Component({
    templateUrl: "./address-custom-field.component.html"
})
export class AddressCustomFieldComponent extends FieldBase {
    constructor(private http: HttpClient) {
        super();
    }

    writeValue(value: any): void {
        // The null check is required because of the initial load of the field
        if (this.getValue() !== null && this.getValue() !== value) {
            console.log(value);
            this.makeRequest(value).subscribe((result) => {
                console.log(result);
            });
        }

        super.writeValue(value);
    }

    private makeRequest(queryText: string): Observable<object> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('app_id', HERE_MAPS_APP_ID);
        queryParams = queryParams.append('app_code', HERE_MAPS_APP_CODE);
        queryParams = queryParams.append('query', queryText);
        queryParams = queryParams.append('beginHighlight', '<b>');
        queryParams = queryParams.append('endHighlight', '</b>');

        const url = HOST + PATH;
        return this.http.get(url, { params: queryParams });
    }
}
