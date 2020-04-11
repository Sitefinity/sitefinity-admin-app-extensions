import { Component, Inject } from "@angular/core";
import { FieldBase, SELECTOR_SERVICE, SelectorService } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient } from "@angular/common/http";
import { DialogData } from "progress-sitefinity-adminapp-sdk/app/api/v1/selectors/dialog-data";
import { ChartComponent } from "./chart.component";

@Component({
    templateUrl: "./chart-field.component.html"
})
export class ChartFieldComponent extends FieldBase {

    get currentValue(): ChartData {
        if (this.getValue()) {
            return JSON.parse(this.getValue());
        }

        return null;
    }

    constructor(private http: HttpClient, @Inject(SELECTOR_SERVICE) private readonly selectorService: SelectorService) {
        super();
    }

    updateData() {
        // get data
        this.http.get("https://api.covid19api.com/summary").subscribe(response => {
            const chartData: ChartData = {
                TotalConfirmed: response["Global"].TotalConfirmed,
                TotalRecovered: response["Global"].TotalRecovered,
                TotalDeaths: response["Global"].TotalDeaths
            };

            this.writeValue(JSON.stringify(chartData));
        });
    }

    openDialog() {
        const dialogData: DialogData = {
            componentData: {
                type: ChartComponent,
                properties: {
                    chartData: this.currentValue
                }
            },
            commands: []
        };

        this.selectorService.openDialog(dialogData);
    }
}

export interface ChartData {
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}
