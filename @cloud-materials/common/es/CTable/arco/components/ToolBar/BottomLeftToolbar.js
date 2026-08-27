import React from 'react';
import { Checkbox, Button } from '@arco-design/web-react';
import { ToolbarItemGroup } from './ToolbarItemGroup';
import { useTable, usePrefix } from '../../../react';
import { useCConfigContext } from '../../../../CConfigProvider';
import { isFn } from '../../../shared';
// 展示左下角的选中行信息
var SelectedInfo = function (_a) {
    var _b, _c, _d;
    var prefixCls = _a.prefixCls;
    var _e = useCConfigContext(), locale = _e.locale, formatLocale = _e.formatLocale;
    var table = useTable();
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
    var countText = isFn(formatSelectedCount)
        ? formatSelectedCount({ count: count, table: table })
        : formatLocale(count <= 1 ? locale.CTable.selectedCount : locale.CTable.selectedCounts, { count: count });
    return (React.createElement("div", { className: "".concat(prefixCls, "-bottom-toolbar-selected-info") },
        React.createElement(Checkbox
        // 无可操作的行时，应该禁用 checkbox
        , { 
            // 无可操作的行时，应该禁用 checkbox
            disabled: canControlRowKeys.length === 0, checked: allSelected, indeterminate: partialSelected, onChange: function (val) {
                table.selectRowAll(val, {
                    triggerSelectRowEvent: true,
                    crossPage: crossPage,
                });
            } }),
        React.createElement("span", null, countText),
        showClearSelect && (React.createElement(Button, { type: "text", onClick: onClearSelect, disabled: !table.selectedRowKeys.length }, locale.CTable.cancelSelect))));
};
/**
 * table 底部的 toolbar 实现写得比较死，只支持左下角的操作按钮，并且不支持输入性组件，等有诉求的时候再考虑
 * */
export var BottomLeftToolbar = function (_a) {
    var config = _a.config;
    var table = useTable();
    var prefixCls = usePrefix('toolbar');
    if (!(config === null || config === void 0 ? void 0 : config.bottomLeft)) {
        return null;
    }
    return (React.createElement("div", { className: "".concat(prefixCls, "-bottom-toolbar-left") },
        table.config.rowSelection && React.createElement(SelectedInfo, { prefixCls: prefixCls }),
        React.createElement(ToolbarItemGroup, { toolbarItems: config.bottomLeft, onChange: function () { } })));
};
//# sourceMappingURL=BottomLeftToolbar.js.map