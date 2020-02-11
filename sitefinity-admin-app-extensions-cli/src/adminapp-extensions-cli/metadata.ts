import * as ts from "typescript";
import { readdirSync } from "fs";
import { join } from "path";

function findNodeByKind(node: ts.Node, kind: ts.SyntaxKind): ts.Node | undefined {
    if (node.kind === kind) {
        return node;
    }

    return node.forEachChild(c => {
        const res = findNodeByKind(c, kind);
        if (res) {
            return res;
        }
    });
}

function isNgModule(classDeclaration: ts.ClassDeclaration) {
    const decorators = classDeclaration.decorators;
    if (!decorators?.length) {
        return false;
    }

    for (const decorator of decorators) {
        const decoratorName = ((decorator?.expression as ts.CallExpression)?.expression as ts.Identifier)?.text?.trim();
        if (decoratorName === "NgModule") {
            return true;
        }
    }

    return false;
}

interface NgModuleMetadata {
    moduleName: string;
    filePath: string;
}

export function getModuleMetadata(folderPath: string): NgModuleMetadata | null {
    const files = readdirSync(folderPath)
        .filter(x => x.endsWith(".ts"))
        .map(x => join(folderPath, x));
    const program = ts.createProgram(files, {});

    for (const file of files) {
        const sourceFile = program.getSourceFile(file) as ts.SourceFile;
        const classDeclaration = findNodeByKind(sourceFile, ts.SyntaxKind.ClassDeclaration) as ts.ClassDeclaration;

        if (classDeclaration && isNgModule(classDeclaration)) {
            return {
                filePath: sourceFile.fileName,
                moduleName: classDeclaration?.name?.text?.trim() as string
            };
        }
    }

    return null;
}
