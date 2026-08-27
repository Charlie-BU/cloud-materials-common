import { __read, __spreadArray } from "tslib";
import React from 'react';
import { Checkbox, Grid } from '@arco-design/web-react';
import CEllipsis from '../../../../../../../CEllipsis';
import { intersection } from 'lodash-es';
import { useCConfigContext } from '../../../../../../../CConfigProvider';
var Col = Grid.Col, Row = Grid.Row;
var CheckboxGroup = Checkbox.Group;
export var CheckBoxList = function (_a) {
    var _b = _a.value, value = _b === void 0 ? [] : _b, _c = _a.items, items = _c === void 0 ? [] : _c, _d = _a.disabledKeys, disabledKeys = _d === void 0 ? [] : _d, prefixCls = _a.prefixCls, onChange = _a.onChange;
    var locale = useCConfigContext().locale;
    var checkedAll = value.length === items.length;
    // 选择某一个 checkbox
    var onCheckboxGroupChange = function (checkList) {
        onChange === null || onChange === void 0 ? void 0 : onChange(checkList);
    };
    // 全选/取消全选
    var onChangeAll = function (checkedAll) {
        // 获取禁用或者非禁用的 key
        var getKeys = function (isDisabled) {
            if (isDisabled === void 0) { isDisabled = true; }
            return items
                .filter(function (item) { return (isDisabled ? disabledKeys.includes(item.key) : !disabledKeys.includes(item.key)); })
                .map(function (item) { return item.key; });
        };
        // 找出禁用的 key 的值
        var preCheckecAndDisabled = intersection(value, getKeys(true));
        if (checkedAll) {
            // 全选的值 = 非禁用的 key + 禁用的key的值
            onChange === null || onChange === void 0 ? void 0 : onChange(__spreadArray(__spreadArray([], __read(getKeys(false)), false), __read(preCheckecAndDisabled), false));
        }
        else {
            // 取消全选的值 = 禁用的key的值（即取消全选不能影响禁用的 key）
            onChange === null || onChange === void 0 ? void 0 : onChange(preCheckecAndDisabled);
        }
    };
    return (React.createElement("div", { className: "".concat(prefixCls, "-checkbox-list") },
        React.createElement("div", { className: "".concat(prefixCls, "-section-title") },
            React.createElement("span", null, locale.CTable.exportContent)),
        React.createElement(Checkbox, { onChange: onChangeAll, checked: checkedAll, indeterminate: !checkedAll && value.length > 0 }, locale.CTable.selectAll),
        React.createElement(CheckboxGroup, { value: value, onChange: onCheckboxGroupChange },
            React.createElement(Row, { gutter: 16 }, items.map(function (item) { return (React.createElement(Col, { key: item.key, span: 8 },
                React.createElement("div", { className: "".concat(prefixCls, "-checkbox-wrapper") },
                    React.createElement(Checkbox, { disabled: disabledKeys.includes(item.key), value: item.key }),
                    React.createElement(CEllipsis, { content: item.title })))); })))));
};
//# sourceMappingURL=index.js.map