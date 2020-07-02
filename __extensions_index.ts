import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";

import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { CommandsExtenderModule } from "./commands-extender";
import { EditorExtenderModule } from "./editor-extender";
import { ItemExtenderModule } from "./item-extender";
import { ThemeModule } from "./theme";

/**
 * The entry point of the extensions. Each extension bundle needs to have exactly one export
 * of the Extensions interface and it needs to be placed in the __extensions_index file.
 * Here all of the NgModules are returned and are loaded into the main module.
 */
export class SamplesExtension implements Extension {
    /**
     * On application bootstrap this method is called to get all extensions as angular modules.
     */
    getNgModules(): Array<any> {
        return [
            GridExtenderModule,
            CustomFieldsModule,
            CommandsExtenderModule,
            EditorExtenderModule,
            ItemExtenderModule,
            ThemeModule
        ];
    }
}
