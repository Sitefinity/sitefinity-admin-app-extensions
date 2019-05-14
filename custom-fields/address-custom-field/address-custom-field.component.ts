import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FieldBase } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { DynamicScriptLoaderService } from "./script-service";

/*
 * NOTE: Replace this example keys with your subscription keys.
 * For more information on how to get a key check here: https://developer.here.com/?create=Freemium-Basic&keepState=true&step=terms
 */
const HERE_MAPS_APP_ID = "iV0wv8ievlwH8Fd5Raii";
const HERE_MAPS_APP_CODE = "AHNPEuMJkSuNjkP7SpW2xg";

const HOST = "http://autocomplete.geocoder.api.here.com";
const PATH = "/6.2/suggest.json";

declare var H: any;

@Component({
    templateUrl: "./address-custom-field.component.html"
})
export class AddressCustomFieldComponent extends FieldBase implements OnInit {
    @ViewChild("streetAddress") streetAddress: ElementRef;
    @ViewChild("mapContainer") mapContainer: ElementRef;
    @ViewChild("streetAddress2") streetAddress2: ElementRef;
    @ViewChild("country") country: ElementRef;
    @ViewChild("county") county: ElementRef;
    @ViewChild("city") city: ElementRef;
    @ViewChild("postcode") postcode: ElementRef;
    @ViewChild("popupTree") popupTree: any;

    popupTreeConfig: any;
    searchTerm: string;
    hasSuggestions: Observable<boolean>;
    isPopupVisible: boolean = false;
    hereBahavior: any;

    private _suggestionsSubject$: BehaviorSubject<any[]>;
    private _suggestions$: Observable<any[]>;

    private hereMap: any;
    private herePlatform: any;
    private hereGeocoder: any;
    private hereGroup: any;
    private hereUI: any;
    private hereBubble: any;

    constructor(private http: HttpClient, private dynamicScriptLoader: DynamicScriptLoaderService) {
        super();

        this._suggestionsSubject$ = new BehaviorSubject<any[]>([]);
        this._suggestions$ = this._suggestionsSubject$.asObservable();
        this.hasSuggestions = this._suggestions$.pipe(map((arr) => { return arr.length > 0; }));
    }

    get suggestions$(): Observable<any[]> {
        return this._suggestions$;
    }

    ngOnInit(): void {
        this.popupTreeConfig = {
            noSelection: true
        };

        this.searchTerm = this.getValue();
        this.loadScripts();
    }

    onFocusOut(): void {
        this.isPopupVisible = false;
    }

    onNewInputValue(data: any): void {
        this.clearOldSuggestions();
        this.updateSuggestions();

        setTimeout(() => {
            if (!this.isPopupVisible && data.label) {
                this.isPopupVisible = true;
            }
        }, 300);

        const currentValue = this.getValue();
        if (currentValue) {
            const addrData: AddressData = JSON.parse(currentValue);
            if (data.address) {
                addrData.address = { ...addrData.address, ...data.address };
                this.writeValue(JSON.stringify(addrData));
            } else {
                this.writeValue(JSON.stringify({ ...addrData, ...data }));
            }
        } else {
            this.writeValue(JSON.stringify(data));
        }
    }

    onNewItemSelected(event) {
        this.isPopupVisible = false;
        this.writeValue(JSON.stringify(event.data));
        const currenValue = this.getValue();
        this.addSuggestionToMap(currenValue ? JSON.parse(currenValue) : null);
    }

    writeValue(value) {
        if (value) {
            const addrData: AddressData = JSON.parse(value);

            this.streetAddress.nativeElement.value = addrData.label ? addrData.label : null;
            this.searchTerm = this.streetAddress.nativeElement.value;
            this.streetAddress2.nativeElement.value = addrData.label2 ? addrData.label2 : null;
            this.country.nativeElement.value = addrData.address && addrData.address.country ? addrData.address.country : null;
            this.county.nativeElement.value = addrData.address && addrData.address.county ? addrData.address.county : null;
            this.city.nativeElement.value = addrData.address && addrData.address.city ? addrData.address.city : null;
            this.postcode.nativeElement.value = addrData.address && addrData.address.postalCode ? addrData.address.postalCode : null;
        }

        super.writeValue(value);
    }

    onEscapeKey(): void {
        this.isPopupVisible = false;
    }

    onFocusNextNode(): void {
        this.popupTree.focusNextNode();
    }

    onFocusPreviousNode(): void {
        this.popupTree.focusPreviousNode();
    }

    onEnterKey(): void {
        this.isPopupVisible = false;
        this.popupTree.selectCurrentNode();
    }

    /**
     * An event listener is added to listen to tap events on the map.
     * Clicking on the map displays an alert box containing the latitude and longitude
     * of the location pressed.
     * @param  {H.Map} map      A HERE Map instance within the application
     */
    private setUpClickListener(hereMap) {
        // Attach an event listener to map display
        // obtain the coordinates and display in an alert box.
        hereMap.addEventListener("tap", (event) => {
            const coord = hereMap.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
            this.clearOldSuggestions();

            // get address suggestion// Create the parameters for the reverse geocoding request:
            const reverseGeocodingParameters = {
                prox: `${coord.lat},${coord.lng}`,
                mode: "retrieveAddresses",
                maxresults: 1
            };

            // Call the geocode method with the geocoding parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            this.hereGeocoder.reverseGeocode(
                reverseGeocodingParameters,
                (data) => {
                    const location = data.Response.View[0].Result[0].Location;
                    const addrData: AddressData = {
                        label: location.Address.Label,
                        lat: location.DisplayPosition.Latitude,
                        lng: location.DisplayPosition.Longitude,
                        label2: null,
                        locationId: location.LocationId,
                        address: {
                            country: location.Address.Country,
                            county: location.Address.County,
                            city: location.Address.City,
                            postalCode: location.Address.PostalCode
                        }
                    };

                    this.addMarkerToMap(coord.lat, coord.lng, location.Address.Label);
                    this.writeValue(JSON.stringify(addrData));
                },
                () => {
                    // empty
                });
        });
    }

    private addSuggestionToMap(addressData: AddressData) {
        if (this.herePlatform && addressData && addressData.locationId) {
            const geocodingParameters = {
                locationId : addressData.locationId
              };

              this.hereGeocoder.geocode(
                  geocodingParameters,
                  (result) => {
                      const location = result.Response.View[0].Result;
                      this.addMarkerToMap(
                          location[0].Location.DisplayPosition.Latitude,
                          location[0].Location.DisplayPosition.Longitude,
                          location[0].Location.Address.Label);
                  },
                  () => {
                      // empty
                  });
        }
    }

    private addMarkerToMap(lat: string, lng: string, label: string) {
        let marker;

        marker = new H.map.Marker({ lat, lng });

        marker.setData(label);

        this.hereGroup.addObject(marker);

        this.hereMap.setViewBounds(this.hereGroup.getBounds());
        this.hereMap.setZoom(16);
    }

    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader
        .load("here-maps-core", "here-maps-css")
        .then(() => {
            this.dynamicScriptLoader.load("here-maps-service", "here-maps-ui", "here-maps-events").then(data => {
                // Script Loaded Successfully. We should initialize all objects needed
                this.initializeMap();
            });
        });
    }

    private initializeMap() {
        // Step 1: initialize communication with the platform
        this.herePlatform = new H.service.Platform({
            "app_id": HERE_MAPS_APP_ID,
            "app_code": HERE_MAPS_APP_CODE,
            useCIT: false,
            useHTTPS: true
            });

        this.hereGeocoder = this.herePlatform.getGeocodingService();
        this.hereGroup = new H.map.Group();

        this.hereGroup.addEventListener("longpress", (event) => {
            this.hereMap.setCenter(event.target.getPosition());
            this.openBubble(event.target.getPosition(), event.target.getData());
        }, false);

        // Obtain the default map types from the platform object
        const defaultLayers = this.herePlatform.createDefaultLayers();

        // Step 2: initialize a map - this map is centered over Europe by default
        // TODO: get default lang and lat from server
        this.hereMap = new H.Map(
            this.mapContainer.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 3,
                center: { lat: 52.5160, lng: 13.3779 }
            });

        this.hereMap.addObject(this.hereGroup);
        this.setUpClickListener(this.hereMap);

        // Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        this.hereBahavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.hereMap));

        // Create the default UI components
        this.hereUI = H.ui.UI.createDefault(this.hereMap, defaultLayers);

        // add the suggestion to map if such
        const currenValue = this.getValue();
        this.addSuggestionToMap(currenValue ? JSON.parse(currenValue) : null);
    }

    /**
     * Removes all H.map.Marker points from the map and adds closes the info bubble
     */
    private clearOldSuggestions() {
        this.hereGroup.removeAll();
        if (this.hereBubble) {
            this.hereBubble.close();
        }
    }

    /**
     * Function to Open/Close an infobubble on the map.
     * @param  {H.geo.Point} position     The location on the map.
     * @param  {String} text              The contents of the infobubble.
     */
    private openBubble(position, text) {
        if (!this.hereBubble) {
            this.hereBubble = new H.ui.InfoBubble(
                position,
                {content: "<small>" + text + "</small>"});
            this.hereUI.addBubble(this.hereBubble);
        } else {
            this.hereBubble.setPosition(position);
            this.hereBubble.setContent("<small>" + text + "</small>");
            this.hereBubble.open();
        }
   }

    private updateSuggestions() {
        this.getSuggestions(this.searchTerm).subscribe((result: any) => {
            this._suggestionsSubject$.next(result.suggestions);
        });
    }

    private getSuggestions(queryText: string): Observable<object> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("app_id", HERE_MAPS_APP_ID);
        queryParams = queryParams.append("app_code", HERE_MAPS_APP_CODE);
        queryParams = queryParams.append("query", queryText);

        const url = HOST + PATH;
        return this.http.get(url, { params: queryParams });
    }
}

interface AddressData {
    locationId: string;
    address: Address;
    lat: string;
    lng: string;
    label: string;
    label2: string;
}

interface Address {
    country: string;
    county: string;
    city: string;
    postalCode: string;
}
