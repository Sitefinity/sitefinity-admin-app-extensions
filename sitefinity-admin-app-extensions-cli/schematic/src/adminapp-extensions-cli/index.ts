import { chain, Tree, SchematicContext, Rule } from "@angular-devkit/schematics";
import { config } from "./config";
import { CommandLineOptions } from "./interfaces";
import { copyFolderRecursively } from "./rules/copy-folder";
import { processTemplates } from "./rules/process-templates";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { clone } from "./git";
import { normalize, join } from "path";

export function adminappExtensionsCli(options: CommandLineOptions): Rule {
    return async (tree: Tree, context: SchematicContext) => {
            if (options.localRun === "true") {
                config.extensionsRepo.localFolderPath = join("sample-extension", config.extensionsRepo.localFolderPath);
            }

            await clone(config.extensionsRepo.url, config.extensionsRepo.localFolderPath, false);

            const { sampleExtensionName } = options;

            context.addTask(new NodePackageInstallTask());

            const rule = chain([
                copyFolderRecursively(
                    config.extensionsRepo.localFolderPath,
                    "./",
                    (x) => {
                        const path = normalize(x);
                        const shouldProcess = path === config.extensionsRepo.folderName || path.includes(sampleExtensionName);
                        return shouldProcess;
                    },
                    x => config.excludedRepoFileNames.indexOf(x) === -1
                ),
                processTemplates(sampleExtensionName),
                (_) => {
                    tree.delete(config.extensionsRepo.localFolderPath);

                    const angularJsonFile = "./angular.json";
                    if (tree.exists(angularJsonFile)) {
                        tree.delete(angularJsonFile);
                    }

                    return tree;
                }
            ]);

            return rule;
        };
}
