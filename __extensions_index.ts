import { Extension } from "./node_modules/iris/app/api";

import { GridExtenderModule } from "./grid-extender";
import { LoggerModule } from "./custom-logger";
import { CustomFieldsModule } from "./custom-fields";

export class SamplesExtension implements Extension {
    getNgModules(): Array<any> {
        return [
            GridExtenderModule,
            LoggerModule,
            CustomFieldsModule
        ];
    }
}
