"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classNamePrefixFactory_1 = require("../_utils/classNamePrefixFactory");
var useMergeProps_1 = require("../hooks/useMergeProps");
var CConfigProvider_1 = require("../CConfigProvider");
var web_react_1 = require("@arco-design/web-react");
var cssRoot = "".concat(classNamePrefixFactory_1.GLOBAL_PREFIX, "-detail-content-wrapper");
exports.testId = {
    container: "".concat(cssRoot, "-container"),
};
var defaultProps = {};
function CDetailContentWrapper(props) {
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('detail-content-wrapper');
    var _a = (0, useMergeProps_1.useMergeProps)(props, defaultProps, {}), style = _a.style, className = _a.className, children = _a.children, loading = _a.loading, arcoSpinProps = _a.arcoSpinProps;
    return children ? (react_1.default.createElement(web_react_1.Spin, tslib_1.__assign({ block: true, style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className), loading: loading }, arcoSpinProps, { "data-testid": exports.testId.container }), children)) : null;
}
CDetailContentWrapper.displayName = 'CDetailContentWrapper';
exports.default = CDetailContentWrapper;
var templateObject_1;
//# sourceMappingURL=CDetailContentWrapper.js.map