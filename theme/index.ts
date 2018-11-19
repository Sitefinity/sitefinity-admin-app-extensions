import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SAMPLE_THEME_PROVIDER, SampleThemeProvider } from "./theme-provider";

@NgModule({
    providers: [
        SAMPLE_THEME_PROVIDER,
        SampleThemeProvider
    ],
    imports: [
        CommonModule
    ]
})

export class ThemeModule { }
