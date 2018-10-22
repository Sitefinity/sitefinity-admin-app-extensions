import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./theme.component.css");

const EXTENSION_THEME_CSS_VARIABLES_KEY = "extThemeCSSVariables";

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

        this.router.navigateByUrl("");
    }

    private createForm() {
        const hexRegex =  /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;

        this.themeForm = this.formBuilder.group({
            "--color-main-black": ["", [Validators.pattern(hexRegex), Validators.required] ]
          });
    }
}
