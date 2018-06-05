import { NgModule } from "@angular/core";
import { ThemeComponent } from "./theme/theme.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

export const customRoutes = [
    { path: "theme", component: ThemeComponent }
];

export const customRouting = RouterModule.forRoot(customRoutes);

@NgModule({
    declarations: [
        ThemeComponent
    ],
    imports: [
        CommonModule,
        customRouting,
        ReactiveFormsModule
    ]
})

export class ExtensionComponentsModule { }
