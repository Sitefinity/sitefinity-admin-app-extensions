
var DelegateModuleWebPack = require("webpack/lib/DelegatedModule");
var RawSource = require("webpack-sources").RawSource;
var WebpackMissingModule = require("webpack/lib/dependencies/WebpackMissingModule");

class DelegatedModule extends DelegateModuleWebPack {
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

}

module.exports = DelegatedModule;
