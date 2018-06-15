import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";

import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { CommandsExtenderModule } from "./commands-extender";
import { ToolbarExtenderModule } from "./toolbar-extender";

declare var VERSION: string;

/**
 * The entry point of the extensions. Each extension bundle needs to have exactly one export
 * of the Extensions interface and it needs to be placed in the __extensions_index file.
 * Here all of the NgModules are returned and are loaded into the main module.
 */
export class SamplesExtension implements Extension {
    /**
     * On application bootstrap this method is called to get all extensions as angular modules.
     */
    getNgModules(version?: string): Array<any> {
        if (version && version !== VERSION) {
            const scripts = document.getElementsByTagName('script');
            const lastScript = scripts[scripts.length-1];
            const scriptName = lastScript.src;

            console.info(`The extension "${scriptName}" was build using "progress-sitefinity-admin-app" package version "${VERSION}" which is different from the current app version "${version}". Some of the extrensions might not work properly.`);
        }

        return [
            GridExtenderModule,
            CustomFieldsModule,
            CommandsExtenderModule,
            ToolbarExtenderModule
        ];
    }
}
