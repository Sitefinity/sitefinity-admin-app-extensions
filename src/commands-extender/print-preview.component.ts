import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HTTP_PREFIX } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { delay } from "rxjs/operators";

/**
 * A component that loads the data item from the OData rest services and displays the title of the data item.
 */
@Component({
    templateUrl: "./print-preview.component.html"
})
export class PrintPreviewComponent implements OnInit {

    /**
     * The data item used in the view.
     */
    protected dataItem: any;

    /**
     * Initializes a new instance of the PrintPreviewComponent
     * @param http The http client service used for making http requests.
     * @param route The current navigated route.
     */
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute) {
    }

    /**
     * ngOnInit lifecycle hook. Attached here so we can fetch the data on initialization
     */
    ngOnInit() {
        // get the route params that contain the metadata needed to load the data item
        const routeParams = this.route.snapshot.queryParams;

        // http prefix is dynamically replaced with the actual url of sitefinity
        const url = `${HTTP_PREFIX}/sf/system/${routeParams.entitySet}(${routeParams.id})` + (routeParams.provider ? `?sf_provider=${routeParams.provider}` : ``);

        // delay so there is always a minimum loading time
        this.http.get(url).pipe(delay(500)).subscribe((dataItem) => {
            this.dataItem = dataItem;
        });
    }
}
