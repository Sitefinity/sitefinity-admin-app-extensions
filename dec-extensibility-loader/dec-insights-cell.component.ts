import { Component, Inject, OnInit } from "@angular/core";
import {
    DataContextComponent, DataContext, SELECTOR_SERVICE,
    SelectorService
} from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { DecExtensibilityDetailsViewComponent } from "./dec-insights-details-view.component";

@Component({
    template: require("./dec-insights-cell.component.html")
})
export class DecExtensibilityInsightsCellComponent implements OnInit, DataContextComponent {
    context: DataContext;

    constructor(@Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService) {
    }

    setCloseModalCallback(): void {
    }

    ngOnInit() {
    }

    onClick() {
        this.selectorService.openDialog({
            type: DecExtensibilityDetailsViewComponent
        }).subscribe(() =>{
        });
    }
}
