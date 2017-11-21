import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";

import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { OperationsExtenderModule } from "./operations-extender";

export class SamplesExtension implements Extension {
    getNgModules(): Array<any> {
        return [
            GridExtenderModule,
            CustomFieldsModule,
            OperationsExtenderModule
        ];
    }
}
