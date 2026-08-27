"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../../CConfigProvider");
var MultipleSelect = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var selectCls = getCPrefixCls('search-combine-select');
    var options = props.options, value = props.value, searchWord = props.searchWord, onChange = props.onChange, popSelectRef = props.popSelectRef, rest = tslib_1.__rest(props, ["options", "value", "searchWord", "onChange", "popSelectRef"]);
    var optionLength = options.length;
    var currentLength = (value === null || value === void 0 ? void 0 : value.length) || 0;
    var _b = tslib_1.__read((0, react_1.useState)(currentLength === optionLength), 2), checked = _b[0], setChecked = _b[1];
    var indeterminate = currentLength > 0 && currentLength < optionLength;
    var onCheckboxChange = function (checked) {
        var val = checked ? options.map(function (o) { return o.value; }) : undefined;
        onChange(val);
    };
    var onSelectChange = function (val) {
        onChange(val);
    };
    (0, react_1.useEffect)(function () {
        setChecked(currentLength === optionLength);
    }, [optionLength, currentLength]);
    (0, react_1.useEffect)(function () {
        return function () {
            if (popSelectRef === null || popSelectRef === void 0 ? void 0 : popSelectRef.current) {
                popSelectRef.current = null;
            }
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(web_react_1.Checkbox, { className: "".concat(selectCls, "-all"), indeterminate: indeterminate, checked: checked, onChange: onCheckboxChange }, locale.CSearch.selectAll),
        react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ ref: popSelectRef, popupVisible: true, defaultActiveFirstOption: false, dropdownMenuStyle: { maxHeight: '400px' }, mode: "multiple", options: options, inputValue: searchWord, value: value, getPopupContainer: function (node) { return node; }, triggerProps: {
                autoAlignPopupMinWidth: true,
                autoAlignPopupWidth: false,
                popupStyle: { boxShadow: 'none', border: 'none' },
                style: { position: 'static' },
            }, triggerElement: react_1.default.createElement("div", { className: selectCls }), onChange: onSelectChange }, rest))));
};
exports.default = MultipleSelect;
//# sourceMappingURL=MultipleSelect.js.map