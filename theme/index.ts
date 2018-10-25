import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ThemeComponent } from "./theme.component";
import { THEME_PROVIDER, ExtThemeProvider } from "./theme-provider";

export const customRoutes = [
    { path: "theme", component: ThemeComponent }
];

export const customRouting = RouterModule.forRoot(customRoutes);

@NgModule({
    providers: [
        THEME_PROVIDER,
        ExtThemeProvider
    ],
    declarations: [
        ThemeComponent
    ],
    imports: [
        CommonModule,
        customRouting,
        ReactiveFormsModule
    ]
})

export class ThemeModule { }
