const BASE_PATH = "./src/adminapp-extensions-cli";

export const config = {
    extensionsRepo: {
        url: "https://github.com/Sitefinity/sitefinity-admin-app-extensions.git",
        localFolderPath: `./sitefinity-admin-app-extensions`,
        folderName: "sitefinity-admin-app-extensions"
    },
    filesFolderPath: `${BASE_PATH}/files`,
    excludedRepoFileNames: ["__extensions_index.ts"]
};
