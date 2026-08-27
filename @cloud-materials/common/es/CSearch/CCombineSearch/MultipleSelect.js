import { __assign, __read, __rest } from "tslib";
import React, { useEffect, useState } from 'react';
import { Checkbox, Select } from '@arco-design/web-react';
import { useCConfigContext } from '../../CConfigProvider';
var MultipleSelect = function (props) {
    var _a = useCConfigContext(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var selectCls = getCPrefixCls('search-combine-select');
    var options = props.options, value = props.value, searchWord = props.searchWord, onChange = props.onChange, popSelectRef = props.popSelectRef, rest = __rest(props, ["options", "value", "searchWord", "onChange", "popSelectRef"]);
    var optionLength = options.length;
    var currentLength = (value === null || value === void 0 ? void 0 : value.length) || 0;
    var _b = __read(useState(currentLength === optionLength), 2), checked = _b[0], setChecked = _b[1];
    var indeterminate = currentLength > 0 && currentLength < optionLength;
    var onCheckboxChange = function (checked) {
        var val = checked ? options.map(function (o) { return o.value; }) : undefined;
        onChange(val);
    };
    var onSelectChange = function (val) {
        onChange(val);
    };
    useEffect(function () {
        setChecked(currentLength === optionLength);
    }, [optionLength, currentLength]);
    useEffect(function () {
        return function () {
            if (popSelectRef === null || popSelectRef === void 0 ? void 0 : popSelectRef.current) {
                popSelectRef.current = null;
            }
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Checkbox, { className: "".concat(selectCls, "-all"), indeterminate: indeterminate, checked: checked, onChange: onCheckboxChange }, locale.CSearch.selectAll),
        React.createElement(Select, __assign({ ref: popSelectRef, popupVisible: true, defaultActiveFirstOption: false, dropdownMenuStyle: { maxHeight: '400px' }, mode: "multiple", options: options, inputValue: searchWord, value: value, getPopupContainer: function (node) { return node; }, triggerProps: {
                autoAlignPopupMinWidth: true,
                autoAlignPopupWidth: false,
                popupStyle: { boxShadow: 'none', border: 'none' },
                style: { position: 'static' },
            }, triggerElement: React.createElement("div", { className: selectCls }), onChange: onSelectChange }, rest))));
};
export default MultipleSelect;
//# sourceMappingURL=MultipleSelect.js.map