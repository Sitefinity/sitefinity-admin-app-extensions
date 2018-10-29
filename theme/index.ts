import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CUSTOM_THEME_PROVIDER, CustomThemeProvider } from "./theme-provider";

@NgModule({
    providers: [
        CUSTOM_THEME_PROVIDER,
        CustomThemeProvider
    ],
    imports: [
        CommonModule
    ]
})

export class ThemeModule { }
