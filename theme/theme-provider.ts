import { Injectable, ClassProvider } from "@angular/core";
import { ThemeProvider, THEME_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-provider";
import { ThemeItem } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-item";
import { ThemeVariables } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-variables";
import { ThemeVariablesKeyValuePair } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-variable-key-value-pair";

@Injectable()
class SampleThemeProvider implements ThemeProvider {
    // #region Sample theme variables
    private sampleThemeVariables: Array<ThemeVariablesKeyValuePair> = [{
        key: ThemeVariables.DefaultButtonBorderColor,
        value: "#333"
    }, {
        key: ThemeVariables.DefaultButtonBackgroundColor,
        value: "#FFF"
    }, {
        key: ThemeVariables.DefaultButtonColor,
        value: "#000"
    }, {
        key: ThemeVariables.DefaultButtonInteractionBorderColor,
        value: "#E4E4E4"
    }, {
        key: ThemeVariables.DefaultButtonInteractionBackgroundColor,
        value: "#E4E4E4"
    }, {
        key: ThemeVariables.DefaultButtonInteractionColor,
        value: "#333"
    }, {
        key: ThemeVariables.DefaultButtonDisabledBorderColor,
        value: "#C2C2C2"
    }, {
        key: ThemeVariables.DeleteButtonDisabledBackgroundColor,
        value: "#FFF"
    }, {
        key: ThemeVariables.DefaultButtonDisabledColor,
        value: "#C2C2C2"
    }, {
        key: ThemeVariables.ActionButtonBorderColor,
        value: "#006CD9"
    }, {
        key: ThemeVariables.ActionButtonBackgroundColor,
        value: "#006CD9"
    }, {
        key: ThemeVariables.ActionButtonColor,
        value: "#FFF"
    }, {
        key: ThemeVariables.ActionButtonInteractionBorderColor,
        value: "#0053C0"
    }, {
        key: ThemeVariables.ActionButtonInteractionBackgroundColor,
        value: "#0053C0"
    }, {
        key: ThemeVariables.ActionButtonInteractionColor,
        value: "#FFF"
    }, {
        key: ThemeVariables.ActionButtonDisabledBorderColor,
        value: "#BFD4F3"
    }, {
        key: ThemeVariables.ActionButtonDisabledBackgroundColor,
        value: "#BFD4F3"
    }, {
        key: ThemeVariables.ActionButtonDisabledColor,
        value: "#FFF"
    }];
    // #endregion

    private themes: Array<ThemeItem> = [{
        name: "Sample",
        themeVariables: this.sampleThemeVariables
    }];

    getThemes(): Array<ThemeItem> {
        return this.themes;
    }
}

export const SAMPLE_THEME_PROVIDER: ClassProvider = {
    multi: true,
    provide: THEME_TOKEN,
    useClass: SampleThemeProvider
};
