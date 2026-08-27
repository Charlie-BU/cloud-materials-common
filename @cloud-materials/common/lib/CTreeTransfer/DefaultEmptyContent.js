"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEmptyContent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var CLoadingV2_1 = tslib_1.__importDefault(require("../CLoadingV2"));
var CConfigProvider_1 = require("../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var DefaultEmptyContent = function () {
    var locale = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).locale;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(CLoadingV2_1.default.Result, { status: react_1.default.createElement(iconbox_react_ve_o_design_1.IconNoDataLowSaturation, null), title: locale.CTreeTransfer.noData })));
};
exports.DefaultEmptyContent = DefaultEmptyContent;
//# sourceMappingURL=DefaultEmptyContent.js.map