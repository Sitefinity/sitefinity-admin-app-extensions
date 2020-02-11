import { Extension } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { <%= classify(moduleName) %> } from "<%= filePath %>";

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
            <%= classify(moduleName) %>
        ];
    }
}
