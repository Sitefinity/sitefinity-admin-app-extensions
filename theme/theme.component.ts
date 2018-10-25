import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ExtThemeProvider, APP_THEME_SRC, DATA_SELECTOR_APP_THEME_SRC } from "./theme-provider";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./theme.component.css");

const HOME_URL = "";

@Component({
    template: require("./theme.component.html")
})
export class ThemeComponent {
    public themeForm: FormGroup;
    public isLoading: boolean;
    public themes = [];

    private data;

    constructor(private router: Router, private themeProvider: ExtThemeProvider) {
        this.createForm();
        this.isLoading = true;
        this.themeProvider.getPredefinedThemes().subscribe(data => {
            this.themes = Object.keys(data);
            this.data = data;

            setTimeout(() => {
                this.isLoading = false;
            }, 700);
        });
    }

    onSubmit() {
        if (!this.themeForm.valid) {
            return;
        }

        this.saveThemeSettings();
    }

    onCancel() {
        this.router.navigateByUrl(HOME_URL);
    }

    private saveThemeSettings() {
        const appliedThemeResources = Array.from(document.querySelectorAll(`[${DATA_SELECTOR_APP_THEME_SRC}="${APP_THEME_SRC}"]`));

        if (appliedThemeResources) {
            appliedThemeResources.forEach(resource => {
                resource.remove();
            });
        }

        const appThemeSrc = this.data[this.themeForm.value.predefinedTheme];

        localStorage.setItem(APP_THEME_SRC, appThemeSrc);

        this.themeProvider.applyTheme();
        this.router.navigateByUrl(HOME_URL);
    }

    private createForm() {
        this.themeForm = new FormGroup({
            predefinedTheme: new FormControl("", Validators.required)
        });
    }
}
