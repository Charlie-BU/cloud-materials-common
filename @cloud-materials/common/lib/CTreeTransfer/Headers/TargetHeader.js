"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetHeader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var ahooks_1 = require("ahooks");
var utils_1 = require("../utils");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../CConfigProvider");
var TargetHeader = function (_a) {
    var extraAction = _a.extraAction, totalChosenCount = _a.totalChosenCount, placeholder = _a.placeholder, onClear = _a.onClear, onSearchChange = _a.onSearchChange, title = _a.title;
    var _b = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale, formatLocale = _b.formatLocale;
    var cssPrefix = useCssPrefix('tree-transfer');
    var handleSearchChange = (0, ahooks_1.useDebounceFn)(function (v) {
        onSearchChange(v, 'target');
    }, { wait: 200 }).run;
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["header"], ["header"]))), "data-cy": utils_1.DataCy.targetHeader, "data-testid": utils_1.DataCy.targetHeader },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["header-content"], ["header-content"]))), cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["target-header-content"], ["target-header-content"])))) },
            react_1.default.createElement("div", null, title !== undefined
                ? title
                : totalChosenCount !== undefined && (react_1.default.createElement("span", null, formatLocale(locale.CTreeTransfer.checkedCount, { count: totalChosenCount })))),
            react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-right"], ["header-right"]))) },
                extraAction,
                react_1.default.createElement(iconbox_react_ve_o_design_1.IconDelete, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["header-delete-icon"], ["header-delete-icon"]))), 'c-m-icon'), onClick: onClear, "data-cy": utils_1.DataCy.targetClear, "data-testid": utils_1.DataCy.targetClear }))),
        react_1.default.createElement(web_react_1.Input, { prefix: react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearch, null), placeholder: placeholder || locale.CTreeTransfer.searchPlaceholder, size: "small", className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["header-search"], ["header-search"]))), onChange: handleSearchChange, "data-cy": utils_1.DataCy.targetSearch, "data-testid": utils_1.DataCy.targetSearch })));
};
exports.TargetHeader = TargetHeader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=TargetHeader.js.map