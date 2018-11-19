import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SAMPLE_THEME_PROVIDER } from "./theme-provider";

@NgModule({
    providers: [
        SAMPLE_THEME_PROVIDER
    ],
    imports: [
        CommonModule
    ]
})

export class ThemeModule { }
