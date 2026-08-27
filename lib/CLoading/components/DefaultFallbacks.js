"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFallbackResultProps = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var DefaultRetryFallback = function (_a) {
    var onReload = _a.onReload, loadFailed = _a.loadFailed, retry = _a.retry;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), locale = _b.locale, useCssPrefix = _b.useCssPrefix;
    var cssPrefix = useCssPrefix('loading-fallback');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["text"], ["text"]))) }, loadFailed !== null && loadFailed !== void 0 ? loadFailed : locale.CLoading.loadFailed),
        react_1.default.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["reload"], ["reload"]))), onClick: onReload }, retry !== null && retry !== void 0 ? retry : locale.CLoading.retry)));
};
function getFallbackResultProps(_a) {
    var onReload = _a.onReload, _b = _a.cResultProps, cResultProps = _b === void 0 ? {} : _b, type = _a.type;
    var defaultFallbackResultProps;
    var customTitle = cResultProps.title, restCResultProps = tslib_1.__rest(cResultProps, ["title"]);
    var objectTitle = customTitle;
    var title = (objectTitle === null || objectTitle === void 0 ? void 0 : objectTitle.loadFailed) || (objectTitle === null || objectTitle === void 0 ? void 0 : objectTitle.retry) ? (react_1.default.createElement(DefaultRetryFallback, tslib_1.__assign({ onReload: onReload }, objectTitle))) : (objectTitle !== null && objectTitle !== void 0 ? objectTitle : react_1.default.createElement(DefaultRetryFallback, { onReload: onReload }));
    switch (type) {
        case 'inline':
            defaultFallbackResultProps = {
                status: null,
                size: 'small',
                title: title,
            };
            break;
        case 'block':
            defaultFallbackResultProps = {
                status: 'no-picture',
                size: 'small',
                title: title,
            };
            break;
        case 'page':
        default:
            defaultFallbackResultProps = {
                status: 'no-picture',
                size: 'large',
                title: title,
            };
    }
    return tslib_1.__assign(tslib_1.__assign({}, defaultFallbackResultProps), restCResultProps);
}
exports.getFallbackResultProps = getFallbackResultProps;
var templateObject_1, templateObject_2;
//# sourceMappingURL=DefaultFallbacks.js.map