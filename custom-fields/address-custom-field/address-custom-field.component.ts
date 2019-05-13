import { Component, OnInit, ViewChild } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";


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
export class AddressCustomFieldComponent extends FieldBase implements OnInit {
    @ViewChild("streetAddress") streetAddress: any;

    popupTreeConfig: any;
    searchTerm: string;
    hasSuggestions: Observable<boolean>;
    isPopupVisible: boolean = false;

    private _suggestionsSubject$: BehaviorSubject<any[]>;
    private _suggestions$: Observable<any[]>;

    constructor(private http: HttpClient) {
        super();

        this._suggestionsSubject$ = new BehaviorSubject<any[]>([]);
        this._suggestions$ = this._suggestionsSubject$.asObservable();
        this.hasSuggestions = this._suggestions$.pipe(map((arr) => { return arr.length > 0;}));
    }

    get suggestions$(): Observable<any[]> {
        return this._suggestions$;
    }

    ngOnInit(): void {
        this.popupTreeConfig = {
            noSelection: true
        };

        this.searchTerm = this.getValue();
    }

    onFocus(): void {
        if (this.searchTerm !== null) {
            this.isPopupVisible = true;
        }
    }

    onFocusOut(): void {
        this.isPopupVisible = false;
    }

    onNewInputValue(event: Event): void {
        this.getSuggestions(this.searchTerm).subscribe((result: any) => {
            this._suggestionsSubject$.next(result.suggestions);
        });

        setTimeout(() => {
            if (!this.isPopupVisible) {
                this.isPopupVisible = true;
            }
        }, 300);
    }

    onNewItemSelected(event) {
        this.writeValue(JSON.stringify(event.data));
    }

    writeValue(value) {
        if (this.isJSON(value)) {
            const realValue = JSON.parse(value);

            if (realValue.label) {
                this.streetAddress.nativeElement.value = realValue.label;
                this.searchTerm = realValue.label;
            }

            super.writeValue(realValue);
        } else {
            super.writeValue(value);
        }
    }

    private getSuggestions(queryText: string): Observable<object> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('app_id', HERE_MAPS_APP_ID);
        queryParams = queryParams.append('app_code', HERE_MAPS_APP_CODE);
        queryParams = queryParams.append('query', queryText);

        const url = HOST + PATH;
        return this.http.get(url, { params: queryParams });
    }

    private isJSON(value: string) {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }
}
