"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomLeftToolbar = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var ToolbarItemGroup_1 = require("./ToolbarItemGroup");
var react_2 = require("../../../react");
var CConfigProvider_1 = require("../../../../CConfigProvider");
var shared_1 = require("../../../shared");
// 展示左下角的选中行信息
var SelectedInfo = function (_a) {
    var _b, _c, _d;
    var prefixCls = _a.prefixCls;
    var _e = (0, CConfigProvider_1.useCConfigContext)(), locale = _e.locale, formatLocale = _e.formatLocale;
    var table = (0, react_2.useTable)();
    var crossPage = Boolean((_b = table.config.extraConfig) === null || _b === void 0 ? void 0 : _b.bottomLeftCheckAllCrossPage);
    var showClearSelect = Boolean((_c = table.config.extraConfig) === null || _c === void 0 ? void 0 : _c.bottomLeftShowClearSelect);
    var formatSelectedCount = (_d = table.config.extraConfig) === null || _d === void 0 ? void 0 : _d.formatSelectedCount;
    var _f = table.getSelectedStatusInfo({ crossPage: crossPage }), allSelected = _f.allSelected, partialSelected = _f.partialSelected, canControlRowKeys = _f.canControlRowKeys;
    var count = table.selectedRowKeys.length;
    var onClearSelect = function () {
        // 取消全选
        table.selectRowAll(false, {
            triggerSelectRowEvent: true,
            crossPage: crossPage,
        });
    };
    var countText = (0, shared_1.isFn)(formatSelectedCount)
        ? formatSelectedCount({ count: count, table: table })
        : formatLocale(count <= 1 ? locale.CTable.selectedCount : locale.CTable.selectedCounts, { count: count });
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-bottom-toolbar-selected-info") },
        react_1.default.createElement(web_react_1.Checkbox
        // 无可操作的行时，应该禁用 checkbox
        , { 
            // 无可操作的行时，应该禁用 checkbox
            disabled: canControlRowKeys.length === 0, checked: allSelected, indeterminate: partialSelected, onChange: function (val) {
                table.selectRowAll(val, {
                    triggerSelectRowEvent: true,
                    crossPage: crossPage,
                });
            } }),
        react_1.default.createElement("span", null, countText),
        showClearSelect && (react_1.default.createElement(web_react_1.Button, { type: "text", onClick: onClearSelect, disabled: !table.selectedRowKeys.length }, locale.CTable.cancelSelect))));
};
/**
 * table 底部的 toolbar 实现写得比较死，只支持左下角的操作按钮，并且不支持输入性组件，等有诉求的时候再考虑
 * */
var BottomLeftToolbar = function (_a) {
    var config = _a.config;
    var table = (0, react_2.useTable)();
    var prefixCls = (0, react_2.usePrefix)('toolbar');
    if (!(config === null || config === void 0 ? void 0 : config.bottomLeft)) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-bottom-toolbar-left") },
        table.config.rowSelection && react_1.default.createElement(SelectedInfo, { prefixCls: prefixCls }),
        react_1.default.createElement(ToolbarItemGroup_1.ToolbarItemGroup, { toolbarItems: config.bottomLeft, onChange: function () { } })));
};
exports.BottomLeftToolbar = BottomLeftToolbar;
//# sourceMappingURL=BottomLeftToolbar.js.map