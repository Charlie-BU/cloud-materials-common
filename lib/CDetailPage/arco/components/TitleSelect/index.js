"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleSelect = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
var TitleSelect = function (props) {
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page-title-select');
    return react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ bordered: false }, props, { className: (0, classnames_1.default)(cssRoot, props === null || props === void 0 ? void 0 : props.className) }));
};
exports.TitleSelect = TitleSelect;
//# sourceMappingURL=index.js.map