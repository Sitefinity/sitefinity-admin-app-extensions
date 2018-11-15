import { Injectable, ClassProvider } from "@angular/core";
import { ThemeProvider, THEME_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-provider";
import { ThemeItem } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-item";
import { ThemeVariables } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-variable";
import { ThemeVariablesKeyValuePair } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-variable-key-value-pair";

@Injectable()
export class CustomThemeProvider implements ThemeProvider {
    // #region Blue theme variables
    private blueThemeVariables: Array<ThemeVariablesKeyValuePair> = [{
        key: ThemeVariables.DefaultButtonColor,
        value: "#000"
    }, {
        key: ThemeVariables.DefaultButtonBorderColor,
        value: "#eee"
    }, {
        key: ThemeVariables.DefaultButtonBackgroundColor,
        value: "#eee"
    }, {
        key: ThemeVariables.DefaultButtonInteractionColor,
        value: "#fff"
    }, {
        key: ThemeVariables.DefaultButtonBorderColor,
        value: "#ccc"
    }, {
        key: ThemeVariables.DefaultButtonBackgroundColor,
        value: "#ccc"
    }, {
        key: ThemeVariables.ActionButtonColor,
        value: "#fff"
    }, {
        key: ThemeVariables.ActionButtonBorderColor,
        value: "#0168c1"
    }, {
        key: ThemeVariables.ActionButtonBackgroundColor,
        value: "#0168c1"
    }, {
        key: ThemeVariables.ActionButtonInteractionColor,
        value: "#fff"
    }, {
        key: ThemeVariables.ActionButtonInteractionBorderColor,
        value: "#01539a"
    }, {
        key: ThemeVariables.ActionButtonInteractionBackgroundColor,
        value: "#01539a"
    }, {
        key: ThemeVariables.ActionButtonDisabledColor,
        value: "#fff"
    }, {
        key: ThemeVariables.ActionButtonDisabledBorderColor,
        value: "#b8cee1"
    }, {
        key: ThemeVariables.ActionButtonDisabledBackgroundColor,
        value: "#b8cee1"
    }];
    // #endregion
    // #region Dark theme variables
    private darkThemeVariables: Array<ThemeVariablesKeyValuePair> = [{
        key: ThemeVariables.DefaultButtonColor,
        value: "#fff"
    }, {
        key: ThemeVariables.DefaultButtonBorderColor,
        value: "#3b4744"
    }, {
        key: ThemeVariables.DefaultButtonBackgroundColor,
        value: "#3b4744"
    }, {
        key: ThemeVariables.DefaultButtonInteractionColor,
        value: "#fff"
    }, {
        key: ThemeVariables.DefaultButtonBorderColor,
        value: "#3b4744"
    }, {
        key: ThemeVariables.DefaultButtonBackgroundColor,
        value: "#3b4744"
    }, {
        key: ThemeVariables.ActionButtonColor,
        value: "#000"
    }, {
        key: ThemeVariables.ActionButtonBorderColor,
        value: "#64dbc3"
    }, {
        key: ThemeVariables.ActionButtonBackgroundColor,
        value: "#64dbc3"
    }, {
        key: ThemeVariables.ActionButtonInteractionColor,
        value: "#000"
    }, {
        key: ThemeVariables.ActionButtonInteractionBorderColor,
        value: "#64dbc3"
    }, {
        key: ThemeVariables.ActionButtonInteractionBackgroundColor,
        value: "#64dbc3"
    }, {
        key: ThemeVariables.ActionButtonDisabledColor,
        value: "#000"
    }, {
        key: ThemeVariables.ActionButtonDisabledBorderColor,
        value: "#97afaa"
    }, {
        key: ThemeVariables.ActionButtonDisabledBackgroundColor,
        value: "#97afaa"
    }];
    // #endregion

    private themes: Array<ThemeItem> = [{
        name: "Dark",
        themeVariables: this.darkThemeVariables
    }, {
        name: "Blue",
        themeVariables: this.blueThemeVariables
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
