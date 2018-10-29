import { Injectable, ClassProvider } from "@angular/core";
import { ThemeProvider, THEME_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-provider";
import { ThemeItem } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-item";

@Injectable()
export class CustomThemeProvider implements ThemeProvider {
    private themes: Array<ThemeItem> = [{
        name: "Dark",
        resources: ["assets/themes/dark-theme.css"]
    }, {
        name: "Bootstrap dark",
        resources: ["https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css", "assets/themes/dark-theme.css"]
    }];

    getThemes(): Array<ThemeItem> {
        return this.themes;
    }
}

export const CUSTOM_THEME_PROVIDER: ClassProvider = {
    multi: true,
    provide: THEME_TOKEN,
    useClass: CustomThemeProvider
};
