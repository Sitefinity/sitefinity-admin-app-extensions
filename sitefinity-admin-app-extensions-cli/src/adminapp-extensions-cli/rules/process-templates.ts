import { config } from "../config";
import { Rule, Tree, SchematicContext, apply, url, template, move, mergeWith } from "@angular-devkit/schematics";
import { getModuleMetadata } from "../metadata";
import { join } from "path";
import { strings } from "@angular-devkit/core";
import { getExtensionFolderName, transformToImportPath } from "../utils";

export function processTemplates(sampleExtensionName: string): Rule {
    return (tree: Tree, _: SchematicContext) => {
        const extensionFolderPath = join(config.extensionsRepo.localFolderPath, sampleExtensionName);
        const moduleMetadata = getModuleMetadata(extensionFolderPath);
        const destinationFolderPath = join(tree.root.path, getExtensionFolderName(sampleExtensionName));
        const templatesFolderPath = "../../src/adminapp-extensions-cli/files/templates";

        const templateSource = apply(
            url(templatesFolderPath),
            [
                template({
                    classify: strings.classify,
                    filePath: transformToImportPath(moduleMetadata?.filePath as string),
                    moduleName: moduleMetadata?.moduleName
                }),
                move(destinationFolderPath)
            ]
        );
        return mergeWith(templateSource);
    };
}
