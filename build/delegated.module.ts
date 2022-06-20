import DelegatedModule from "webpack/lib/DelegatedModule";
import { RawSource } from "webpack-sources";
import WebpackMissingModule from "./webpack-missing.module";
import { Compilation } from "webpack";

export default class DelegatedModuleCustom extends DelegatedModule {
    request: any;
    originalRequest: any;
    dependencies: any;
    userRequest: any;
    webpackCompilation: Compilation;

    constructor(sourceRequest, request, type, userRequest, webpackCompilation) {
        super(sourceRequest, request, type, userRequest);
        this.request = request;
        this.webpackCompilation = webpackCompilation;
    }

    libIdent(options) {
        if (!this.originalRequest) {
            return null;
        }

        return typeof this.originalRequest === "string"
            ? this.originalRequest
            : this.originalRequest.libIdent(options);
    }

    codeGeneration() {
        const sourceModule = this.webpackCompilation.moduleGraph.getModule(this.dependencies[0])
        let str;
        if (!sourceModule) {
            str = WebpackMissingModule.moduleCode(this.sourceRequest);
        } else {
            str = `module.exports = __iris_require__('${this.userRequest}')`;
        }
        const sources = new Map();
        sources.set("javascript", new RawSource(str));
        const runtimeRequirements = new Set([
            "module",
            "__iris_require__"
        ]);
        return {
            sources,
            runtimeRequirements
        }
    }

    sourceRequest(): any {
        throw new Error("Method not implemented.");
    }
}
