import { Component, OnInit } from "@angular/core";
import {
    DataContextComponent, DataContext
} from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Component({
    template: require("./dec-insights-details-view.component.html")
})
export class DecExtensibilityDetailsViewComponent implements OnInit, DataContextComponent {
    context: DataContext;

    constructor() {
    }

    setCloseModalCallback(): void {
    }

    ngOnInit() {
    }

    onClick() {
    }
}
