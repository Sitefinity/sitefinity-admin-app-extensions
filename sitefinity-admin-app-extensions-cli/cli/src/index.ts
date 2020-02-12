import { execSync } from "child_process";
import * as commander from "commander";
import { mkdirSync, appendFileSync } from "fs";
import { join } from "path";

const extensionNameParam = "sampleExtensionName";
const program = commander
    .option(`--${extensionNameParam} <name>`)
    .parse(process.argv);
const extensionName = program[extensionNameParam];
const folderPath = `./${extensionName}-sample`;
const angularJsonConfig = JSON.stringify({
    "version": 1,
    "projects": {}
});

mkdirSync(folderPath);
appendFileSync(join(folderPath, "angular.json"), angularJsonConfig);

execSync(`cd ${folderPath} && ng g adminapp-extensions-cli:adminapp-extensions-cli --${extensionNameParam}=${extensionName}`);
