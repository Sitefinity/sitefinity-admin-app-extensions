import { Component } from "@angular/core";
import { ChartData } from "./chart-field.component";

@Component({
    templateUrl: "./chart.component.html",
    styleUrls: [ "./chart.component.css" ]
})
export class ChartComponent {
    get percentages() {
        return {
            recovered: Math.floor((this.chartData.TotalRecovered / this.chartData.TotalConfirmed) * 100),
            deaths: Math.floor((this.chartData.TotalDeaths / this.chartData.TotalConfirmed) * 100),
            ill: Math.floor(((this.chartData.TotalConfirmed - this.chartData.TotalDeaths - this.chartData.TotalRecovered ) / this.chartData.TotalConfirmed) * 100)
        };
    }

    public chartData: ChartData;
}
