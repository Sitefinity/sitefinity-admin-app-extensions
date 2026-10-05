import eslint from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";

const rulesTurnedOffAfterUpdate = {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-wrapper-object-types": "off",
    "no-prototype-builtins": "off",
    "no-useless-escape": "off",
};

export default defineConfig([
    globalIgnores([
        "**/node_modules/**",
        "**/dist/**",
        "**/.angular/**",
        "**/assets/**",
        ".vscode/**",
    ]),
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            angular.configs.tsRecommended,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        processor: angular.processInlineTemplates,
        rules: {
            ...rulesTurnedOffAfterUpdate,
        },
    },
    {
        files: ["**/*.html"],
        extends: [angular.configs.templateRecommended],
    },
    {
        files: ["**/*.js", "**/*.mjs"],
        extends: [eslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...rulesTurnedOffAfterUpdate,
        },
    },
]);
