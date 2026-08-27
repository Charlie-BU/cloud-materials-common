"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var zh_CN_1 = tslib_1.__importDefault(require("./locales/zh-CN"));
var en_US_1 = tslib_1.__importDefault(require("./locales/en-US"));
var CConfigProvider_1 = tslib_1.__importDefault(require("./CConfigProvider"));
// eslint-disable-next-line @typescript-eslint/ban-types
function DocDemosWrapper(_a) {
    var children = _a.children;
    // eslint-disable-next-line cloud-materials-common/no-global-storage
    var locale = window.localStorage.getItem('arco-material-language') === 'en-US' ? en_US_1.default : zh_CN_1.default;
    CConfigProvider_1.default.config({ locale: locale });
    return react_1.default.createElement(CConfigProvider_1.default, { locale: locale }, children);
}
exports.default = DocDemosWrapper;
//# sourceMappingURL=DocDemosWrapper.js.map