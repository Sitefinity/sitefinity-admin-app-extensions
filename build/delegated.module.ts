import DelegatedModule from "webpack/lib/DelegatedModule";
import { RawSource } from "webpack-sources";
import WebpackMissingModule from "./webpack-missing.module";

export default class DelegatedModuleCustom extends DelegatedModule {
    request: any;
    originalRequest: any;
    dependencies: any;
    userRequest: any;
    constructor(sourceRequest, request, userRequest, type) {
        super(sourceRequest, request, type, userRequest);
        this.request = request;
    }

    libIdent(options) {
        if (!this.originalRequest) {
            return null;
        }

        return typeof this.originalRequest === "string"
            ? this.originalRequest
            : this.originalRequest.libIdent(options);
    }

    source() {
        var sourceModule = this.dependencies[0].module;
        var str;
        if (!sourceModule) {
            str = WebpackMissingModule.moduleCode(this.sourceRequest);
        } else {
            str = `module.exports = __iris_require__('${this.userRequest}')`;
        }
        return new RawSource(str);
    }

    sourceRequest(sourceRequest: any): any {
        throw new Error("Method not implemented.");
    }
}
