import { Component, OnInit, Inject } from "@angular/core";
import { HTTP_ODATA_REQUEST_WRAPPER, RequestWrapper } from "progress-sitefinity-adminapp-sdk/app/api";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: require("./print-preview.component.html")
})
export class PrintPreviewComponent implements OnInit {
    protected dataItem: any;

    constructor(
        @Inject(HTTP_ODATA_REQUEST_WRAPPER) private httpOdataRequestWrapper: RequestWrapper,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.queryParams;
        const url = `${routeParams.entitySet}(${routeParams.id})` + (routeParams.provider ? `?sf_provider=${routeParams.provider}` : ``);
        this.httpOdataRequestWrapper.get(url)
        .then((dataItem) => {
            this.dataItem = dataItem;
        });
    }
}
