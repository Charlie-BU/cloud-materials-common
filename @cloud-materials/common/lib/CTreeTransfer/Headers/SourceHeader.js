"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceHeader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var ahooks_1 = require("ahooks");
var utils_1 = require("../utils");
var CConfigProvider_1 = require("../../CConfigProvider");
var SourceHeader = function (_a) {
    var extraAction = _a.extraAction, checkAllStatus = _a.checkAllStatus, placeholder = _a.placeholder, onCheckAll = _a.onCheckAll, onSearchChange = _a.onSearchChange, sourceHeaderCustomText = _a.sourceHeaderCustomText;
    var _b = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), searchStr = _c[0], setSearchStr = _c[1];
    var customCheckAllTitle = sourceHeaderCustomText === null || sourceHeaderCustomText === void 0 ? void 0 : sourceHeaderCustomText.checkAllTitle;
    var cssPrefix = useCssPrefix('tree-transfer');
    var handleSearchChange = (0, ahooks_1.useDebounceFn)(function (v) {
        setSearchStr(v);
        onSearchChange(v, 'source');
    }, { wait: 200 }).run;
    var checkTitle = customCheckAllTitle
        ? typeof customCheckAllTitle === 'string'
            ? customCheckAllTitle
            : customCheckAllTitle === null || customCheckAllTitle === void 0 ? void 0 : customCheckAllTitle(searchStr)
        : locale.CTreeTransfer.checkAll;
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["header"], ["header"]))), "data-cy": utils_1.DataCy.sourceHeader, "data-testid": utils_1.DataCy.sourceHeader },
        react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["header-content"], ["header-content"]))) },
            react_1.default.createElement(web_react_1.Checkbox, { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header-check-all"], ["header-check-all"]))), onChange: onCheckAll, checked: checkAllStatus.checked, indeterminate: checkAllStatus.indeterminate, "data-cy": utils_1.DataCy.sourceCheckAll, "data-testid": utils_1.DataCy.sourceCheckAll }, checkTitle),
            extraAction),
        react_1.default.createElement(web_react_1.Input, { prefix: react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearch, null), placeholder: placeholder || locale.CTreeTransfer.searchPlaceholder, size: "small", className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-search"], ["header-search"]))), onChange: handleSearchChange, allowClear: true, "data-cy": utils_1.DataCy.sourceSearch, "data-testid": utils_1.DataCy.sourceSearch })));
};
exports.SourceHeader = SourceHeader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=SourceHeader.js.map