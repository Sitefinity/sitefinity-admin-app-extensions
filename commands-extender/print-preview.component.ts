import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HTTP_PREFIX } from "progress-sitefinity-adminapp-sdk/app/api/v1";
@Component({
    template: require("./print-preview.component.html")
})
export class PrintPreviewComponent implements OnInit {
    protected dataItem: any;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.queryParams;
        
        // http prefix is dynamically replaced with the actual url of sitefinity
        const url = `${HTTP_PREFIX}/sf/system/${routeParams.entitySet}(${routeParams.id})` + (routeParams.provider ? `?sf_provider=${routeParams.provider}` : ``);

        // dealy so there is always a minimum loading time
        this.http.get(url).delay(500).subscribe((dataItem) => {
            this.dataItem = dataItem;
        });
    }
}
