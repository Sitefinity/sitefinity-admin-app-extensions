import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./theme.component.css");

// Get a collection with images in base64 format from image-data.json file
const SITEFINITY_CSS_VARIABLES = require("./sitefinity-theme-css-variables.json");
const EXTENSION_THEME_CSS_VARIABLES_KEY = "extThemeCSSVariables";
const STYLE_TAG = "style";
const STYLE_TAG_DATA_ATTR = "data-custom-css-variables";

@Component({
    template: require("./theme.component.html")
})
export class ThemeComponent {
    themeForm: FormGroup;
    isSaving: boolean;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.createForm();
    }

    onSubmit() {
        if (!this.themeForm.valid) {
            return;
        }

        this.isSaving = true;
        this.saveThemeSettings();
        setTimeout(() => {
            this.isSaving = false;
        }, 500);
    }

    private saveThemeSettings() {
        let extCSSVariables = {};

        for (let variable in this.themeForm.value) {
            if (variable) {

                if (!this.themeForm.value[variable].startsWith("#")) {
                    this.themeForm.value[variable] = "#" + this.themeForm.value[variable];
                }

                extCSSVariables[variable] = this.themeForm.value[variable];
            }
        }

        localStorage.setItem(EXTENSION_THEME_CSS_VARIABLES_KEY, JSON.stringify(extCSSVariables));

        checkTheme();

        this.router.navigateByUrl("");
    }

    private createForm() {
        const hexRegex =  /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;

        this.themeForm = this.formBuilder.group({
            "--color-main-black": ["", [Validators.pattern(hexRegex), Validators.required] ]
          });
    }
}

export const checkTheme = () => {
    const customThemeSettings = JSON.parse(localStorage.getItem(EXTENSION_THEME_CSS_VARIABLES_KEY));

    let variables = SITEFINITY_CSS_VARIABLES;

    if (customThemeSettings) {
        variables = Object.assign(SITEFINITY_CSS_VARIABLES, customThemeSettings);
    }

    let styleTagInnerHtml = "body { ";

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
};
