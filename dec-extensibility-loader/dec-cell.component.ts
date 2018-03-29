import {Component, Inject, OnInit} from "@angular/core";
import {
    DataContextComponent, DataContext, SELECTOR_SERVICE,
    SelectorService
} from "progress-sitefinity-adminapp-sdk/app/api/v1";

@Component({
    template: require("./dec-cell.component.html")
})
export class DecExtensibilityLoaderCellComponent implements OnInit, DataContextComponent {
    context: DataContext;

    constructor(@Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService) {
    }

    setCloseModalCallback(): void {
    }

    ngOnInit() {
    }

    onClick() {
        this.selectorService.openDialog({
            type: DecExtensibilityLoaderCellComponent
        }).subscribe(() => {
        });
    }
}
