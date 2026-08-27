import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
var DefaultRetryFallback = function (_a) {
    var onReload = _a.onReload, loadFailed = _a.loadFailed, retry = _a.retry;
    var _b = useCConfigContext(), locale = _b.locale, useCssPrefix = _b.useCssPrefix;
    var cssPrefix = useCssPrefix('loading-fallback');
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["text"], ["text"]))) }, loadFailed !== null && loadFailed !== void 0 ? loadFailed : locale.CLoading.loadFailed),
        React.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["reload"], ["reload"]))), onClick: onReload }, retry !== null && retry !== void 0 ? retry : locale.CLoading.retry)));
};
export function getFallbackResultProps(_a) {
    var onReload = _a.onReload, _b = _a.cResultProps, cResultProps = _b === void 0 ? {} : _b, type = _a.type;
    var defaultFallbackResultProps;
    var customTitle = cResultProps.title, restCResultProps = __rest(cResultProps, ["title"]);
    var objectTitle = customTitle;
    var title = (objectTitle === null || objectTitle === void 0 ? void 0 : objectTitle.loadFailed) || (objectTitle === null || objectTitle === void 0 ? void 0 : objectTitle.retry) ? (React.createElement(DefaultRetryFallback, __assign({ onReload: onReload }, objectTitle))) : (objectTitle !== null && objectTitle !== void 0 ? objectTitle : React.createElement(DefaultRetryFallback, { onReload: onReload }));
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
    return __assign(__assign({}, defaultFallbackResultProps), restCResultProps);
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=DefaultFallbacks.js.map