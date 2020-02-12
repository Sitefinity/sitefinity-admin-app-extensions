import { SchematicContext, Tree } from "@angular-devkit/schematics";

export interface CommandLineOptions {
    sampleExtensionName: string;
    localRun: string;
}

export interface Schematic {
    tree: Tree;
    context: SchematicContext;
}
