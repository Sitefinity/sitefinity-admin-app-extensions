import { SchematicContext, Tree } from "@angular-devkit/schematics";

export interface CommandLineOptions {
    sampleExtensionName: string;
}

export interface Schematic {
    tree: Tree;
    context: SchematicContext;
}
