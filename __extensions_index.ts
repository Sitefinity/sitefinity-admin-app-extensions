import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";

import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { OperationsExtenderModule } from "./operations-extender";
import { ToolbarExtenderModule } from "./toolbar-extender";
import { DecExtensionLoaderModule } from "./dec-extensibility-loader";

export class SamplesExtension implements Extension {
    getNgModules(): Array<any> {
        return [
            GridExtenderModule,
            CustomFieldsModule,
            OperationsExtenderModule,
            ToolbarExtenderModule,
            DecExtensionLoaderModule
        ];
    }
}
