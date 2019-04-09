import { Injectable, ClassProvider } from "@angular/core";
import { EditExtenderProvider, EDIT_EXTENDER_TOKEN, EditExtenderContext, EditExtenderData } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ErrorListComponent } from "./error-list/error-list.component";
import { ComponentData } from "progress-sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";

@Injectable()
class CustomEditExtenderProvider implements EditExtenderProvider {
    private componet: ComponentData = {
        type: ErrorListComponent
    };
    private editData: EditExtenderData = {
        component: this.componet
    };

    getComponentsData(context: EditExtenderContext): EditExtenderData {
        return this.editData;
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const CUSTOM_EDIT_EXTENDER_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDIT_EXTENDER_TOKEN,
    useClass: CustomEditExtenderProvider
};
