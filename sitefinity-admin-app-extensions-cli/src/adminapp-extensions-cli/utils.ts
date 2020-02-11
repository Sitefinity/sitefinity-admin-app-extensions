import { normalize, extname, sep, posix } from "path";
import { config } from "./config";

export function getExtensionFolderName(extensionName: string) {
    return `${extensionName}-sample`;
}

export function transformToImportPath(filePath: string) {
    const normalizedFilePath = normalize(filePath);
    const basePath = normalize(config.extensionsRepo.localFolderPath);
    const path = normalizedFilePath.replace(basePath, "");
    const pathWithoutExtension = path.replace(extname(path), "");
    const result = pathWithoutExtension
        .split(sep)
        .filter(x => !!x)
        .join(posix.sep);

    return `.${posix.sep}${result}`;
}
