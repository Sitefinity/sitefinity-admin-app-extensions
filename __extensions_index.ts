import { Extension } from "sitefinity-admin-app/app/api";

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
