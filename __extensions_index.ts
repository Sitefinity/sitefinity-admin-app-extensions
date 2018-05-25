import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";

import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { CommandsExtenderModule } from "./commands-extender";
import { ToolbarExtenderModule } from "./toolbar-extender";

/**
 * The entry point of the extensions. Each extension needs to have exactly one export of the Extensions interface.
 * and it needs to be placed in the __extensions_index file.
 * Here all of the angular modules are returned and are loaded into the main module.
 */
export class SamplesExtension implements Extension {

    /**
     * Gets the NgModules.
     */
    getNgModules(): Array<any> {
        return [
            GridExtenderModule,
            CustomFieldsModule,
            CommandsExtenderModule,
            ToolbarExtenderModule
        ];
    }
}
