import { Injectable, ClassProvider } from "@angular/core";
import { ThemeConfigProvider, THEME_CONFIG_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-config-provider";

// Get a collection with images in base64 format from image-data.json file
const SITEFINITY_CSS_VARIABLES = require("./sitefinity-theme-css-variables.json");
const EXTENSION_THEME_CSS_VARIABLES_KEY = "extThemeCSSVariables";
const STYLE_TAG = "style";
const STYLE_TAG_DATA_ATTR = "data-custom-css-variables";

@Injectable()
class ExtThemeConfigProvider implements ThemeConfigProvider {

    applyTheme(): void {
        const customThemeSettings = JSON.parse(localStorage.getItem(EXTENSION_THEME_CSS_VARIABLES_KEY));

        let variables = SITEFINITY_CSS_VARIABLES;

        if (customThemeSettings) {
            variables = Object.assign(SITEFINITY_CSS_VARIABLES, customThemeSettings);
        }

        let styleTagInnerHtml = ":root { ";

        for (let property of Object.keys(variables)) {
            styleTagInnerHtml += property + ": " + variables[property] + ";";
        }

        styleTagInnerHtml += " }";

        const customStyleTag = document.querySelector(`[${STYLE_TAG_DATA_ATTR}]`);

        if (customStyleTag) {
            customStyleTag.innerHTML = styleTagInnerHtml;
        } else {
            const firstStyleTag = document.head.querySelector(STYLE_TAG);
            const styleTag = document.createElement(STYLE_TAG);
            styleTag.setAttribute(STYLE_TAG_DATA_ATTR, "true");

            styleTag.innerHTML = styleTagInnerHtml;
            document.head.insertBefore(styleTag, firstStyleTag);
        }
    }
}

export const THEME_CONFIG_PROVIDER: ClassProvider = {
    multi: true,
    provide: THEME_CONFIG_TOKEN,
    useClass: ExtThemeConfigProvider
};
