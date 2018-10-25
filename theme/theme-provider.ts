import { Injectable, Inject, ClassProvider, Optional } from "@angular/core";
import { ThemeProvider, THEME_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/theme/theme-provider";
import { AppConfigService, APP_CONFIG_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1/services/app-config-service";
import { ReplaySubject } from "rxjs";
import { URL_SERVICE, UrlService } from "progress-sitefinity-adminapp-sdk/app/api/v1";

export const APP_THEME_SRC = "sf.config.appThemeSrc";
export const DATA_SELECTOR_APP_THEME_SRC = "data-sf-config";

const COMMA_SEPARATOR = ",";
const SLASH_CHAR = "/";
const ANCHOR_TAG = "A";
const LINK_TAG = "LINK";
const LINK_REL = "stylesheet";

@Injectable()
export class ExtThemeProvider implements ThemeProvider {
    private themeConfig = new ReplaySubject<any>();
    private externalStylesheetConfig = new ReplaySubject<any>();
    private themes: Array<any>;
    private externalStylesheets: Array<any>;

    constructor(@Optional() @Inject(APP_CONFIG_TOKEN) private appConfigService: AppConfigService, @Optional() @Inject(URL_SERVICE) private urlService: UrlService) { }

    getPredefinedThemes(): ReplaySubject<any> {
        this.appConfigService.getConfig().subscribe(config => {
            this.themes = (config && config.themesOptions.themes) ? config.themesOptions.themes : {};
            this.themeConfig.next(this.themes);
        });

        return this.themeConfig;
    }

    applyTheme(): void {
        let appThemeSrc = localStorage.getItem(APP_THEME_SRC);

        if (appThemeSrc) {
            const themeResources = appThemeSrc.split(COMMA_SEPARATOR);

            themeResources.forEach(themeResource => {
                this.createLinkTag(themeResource);
            });
        }
    }

    applyExternalStylesheets(): void {
        this.appConfigService.getConfig().subscribe(config => {
            this.externalStylesheets = (config && config.themesOptions.externalStylesheets) ? config.themesOptions.externalStylesheets : {};

            this.externalStylesheetConfig.next(this.externalStylesheets);
        });

        this.externalStylesheetConfig.subscribe(stylesheets => {
            if (!stylesheets) {
                return;
            }

            stylesheets.forEach((stylesheet) => {
                this.createLinkTag(stylesheet, true);
            });
        });
    }

    private createLinkTag(href: string, isExternalStylesheet: boolean = false) {
        href = this.getRelativePath(href);

        const link = document.createElement(LINK_TAG) as HTMLLinkElement;
        link.rel = LINK_REL;
        link.href = href;

        if (!isExternalStylesheet) {
            link.setAttribute(DATA_SELECTOR_APP_THEME_SRC, APP_THEME_SRC);
        }

        document.head.appendChild(link);
    }

    private getRelativePath(resource: string): string {
        if (this.isUrl(resource)) {
            return resource;
        }

        let relativePath = resource;

        if (!resource.startsWith(SLASH_CHAR)) {
            relativePath = SLASH_CHAR + resource;
        }

        return this.urlService.getResourceUrl(relativePath);
    }

    private isUrl(resource: string): boolean {
        let anchorElement = document.createElement(ANCHOR_TAG) as HTMLAnchorElement;
        anchorElement.href = resource;

        const isUrl = (anchorElement.host && anchorElement.host !== window.location.host);

        return isUrl;
    }
}

export const THEME_PROVIDER: ClassProvider = {
    multi: true,
    provide: THEME_TOKEN,
    useClass: ExtThemeProvider
};
