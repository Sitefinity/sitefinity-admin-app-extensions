import { chain, Tree, SchematicContext, Rule } from "@angular-devkit/schematics";
import { config } from "./config";
import { CommandLineOptions } from "./interfaces";
import { copyFolderRecursively } from "./rules/copy-folder";
import { join } from "path";
import { processTemplates } from "./rules/process-templates";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { getExtensionFolderName } from "./utils";
import { clone } from "./git";

export function adminappExtensionsCli(options: CommandLineOptions): Rule {
    return async (tree: Tree, context: SchematicContext) => {
            await clone(config.extensionsRepo.url, config.extensionsRepo.localFolderPath);
            context.logger.info(tree.root.path);
            context.logger.info(__dirname);
            const { sampleExtensionName } = options;
            const extensionFolderName = getExtensionFolderName(sampleExtensionName);

            context.addTask(new NodePackageInstallTask(join(tree.root.path, extensionFolderName)));

            const rule = chain([
                copyFolderRecursively(
                    config.extensionsRepo.localFolderPath,
                    extensionFolderName,
                    x => x === sampleExtensionName,
                    x => config.excludedRepoFileNames.indexOf(x) === -1
                ),
                processTemplates(sampleExtensionName),
                (t, _) => {
                    t.delete(config.extensionsRepo.localFolderPath);
                }
            ]);

            return rule;
        };
}
