
var DelegateModuleWebPack = require("webpack/lib/DelegatedModule");
var RawSource = require("webpack-sources").RawSource;
var WebpackMissingModule = require("webpack/lib/dependencies/WebpackMissingModule");

class DelegatedModule extends DelegateModuleWebPack {
    constructor(sourceRequest, request, userRequest) {
        super(sourceRequest, request, null, userRequest);
        this.request = request;
    }

    source() {
        var sourceModule = this.dependencies[0].module;
        var str;
        if (!sourceModule) {
            str = WebpackMissingModule.moduleCode(this.sourceRequest);
        } else {
            str = `module.exports = __webpack_require__(0).__iris_require__('${this.userRequest}')`;
        }
        return new RawSource(str);
    }

}

module.exports = DelegatedModule;
