"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrefix = void 0;
var CConfigProvider_1 = require("../../../CConfigProvider");
/** 获取 CTable 下组件的类名前缀 */
var usePrefix = function (compPrefix) {
    var cPrefixCls = (0, CConfigProvider_1.useCConfigContext)().cPrefixCls;
    return compPrefix ? "".concat(cPrefixCls, "-table-").concat(compPrefix) : "".concat(cPrefixCls, "-table");
};
exports.usePrefix = usePrefix;
//# sourceMappingURL=usePrefix.js.map