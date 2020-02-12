import { Clone as git } from "nodegit";
import { existsSync } from "fs";

export function clone(repoUrl: string, destination: string, skipIfExists = true): Promise<any> {
    const localFolderExists = existsSync(destination);
    if (localFolderExists && skipIfExists) {
        return Promise.resolve(null);
    }

    return git.clone(repoUrl, destination);
}
