"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrefix = void 0;
var CConfigProvider_1 = require("../../../CConfigProvider");
/** 获取 CTableEditor 下组件的类名前缀 */
var usePrefix = function (compPrefix) {
    var cPrefixCls = (0, CConfigProvider_1.useCConfigContext)().cPrefixCls;
    return compPrefix ? "".concat(cPrefixCls, "-table-editor-").concat(compPrefix) : "".concat(cPrefixCls, "-table-editor");
};
exports.usePrefix = usePrefix;
//# sourceMappingURL=usePrefix.js.map