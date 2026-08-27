"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxList = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CEllipsis_1 = tslib_1.__importDefault(require("../../../../../../../CEllipsis"));
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../../../../../../CConfigProvider");
var Col = web_react_1.Grid.Col, Row = web_react_1.Grid.Row;
var CheckboxGroup = web_react_1.Checkbox.Group;
var CheckBoxList = function (_a) {
    var _b = _a.value, value = _b === void 0 ? [] : _b, _c = _a.items, items = _c === void 0 ? [] : _c, _d = _a.disabledKeys, disabledKeys = _d === void 0 ? [] : _d, prefixCls = _a.prefixCls, onChange = _a.onChange;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
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
        var preCheckecAndDisabled = (0, lodash_es_1.intersection)(value, getKeys(true));
        if (checkedAll) {
            // 全选的值 = 非禁用的 key + 禁用的key的值
            onChange === null || onChange === void 0 ? void 0 : onChange(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(getKeys(false)), false), tslib_1.__read(preCheckecAndDisabled), false));
        }
        else {
            // 取消全选的值 = 禁用的key的值（即取消全选不能影响禁用的 key）
            onChange === null || onChange === void 0 ? void 0 : onChange(preCheckecAndDisabled);
        }
    };
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-checkbox-list") },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-section-title") },
            react_1.default.createElement("span", null, locale.CTable.exportContent)),
        react_1.default.createElement(web_react_1.Checkbox, { onChange: onChangeAll, checked: checkedAll, indeterminate: !checkedAll && value.length > 0 }, locale.CTable.selectAll),
        react_1.default.createElement(CheckboxGroup, { value: value, onChange: onCheckboxGroupChange },
            react_1.default.createElement(Row, { gutter: 16 }, items.map(function (item) { return (react_1.default.createElement(Col, { key: item.key, span: 8 },
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-checkbox-wrapper") },
                    react_1.default.createElement(web_react_1.Checkbox, { disabled: disabledKeys.includes(item.key), value: item.key }),
                    react_1.default.createElement(CEllipsis_1.default, { content: item.title })))); })))));
};
exports.CheckBoxList = CheckBoxList;
//# sourceMappingURL=index.js.map