import { Component, OnInit, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { DataContextComponent, HTTP_ODATA_REQUEST_WRAPPER, RequestWrapper } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: require("./print-preview.component.html")
})
export class PrintPreviewComponent implements OnInit, DataContextComponent {
    public dataItem: any;

    constructor(
        @Inject(HTTP_ODATA_REQUEST_WRAPPER) private httpOdataRequestWrapper: RequestWrapper,
        private route: ActivatedRoute,
        private http: Http) {
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.queryParams;
        this.httpOdataRequestWrapper.get(`${routeParams.entitySet}(${routeParams.id})?sf_provider=${routeParams.provider}`)
        .then((dataItem) => {
            this.dataItem = dataItem;
        });
    }
}
