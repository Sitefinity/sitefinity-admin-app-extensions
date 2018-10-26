import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { THEME_PROVIDER, CustomThemeProvider } from "./theme-provider";

@NgModule({
    providers: [
        THEME_PROVIDER,
        CustomThemeProvider
    ],
    imports: [
        CommonModule
    ]
})

export class ThemeModule { }
