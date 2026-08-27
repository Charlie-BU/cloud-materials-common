"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var ContentInput = function (props) {
    var className = props.className, item = props.item, tempValue = props.tempValue, size = props.size, placeholder = props.placeholder, updateTempValue = props.updateTempValue, updateSearchValue = props.updateSearchValue, updateState = props.updateState, onBlur = props.onBlur;
    if (item.mode === 'number') {
        return (react_1.default.createElement(web_react_1.InputNumber, { className: className, autoFocus: true, size: size, hideControl: true, placeholder: placeholder, value: tempValue, onChange: function (val) {
                updateTempValue(val);
            }, onBlur: onBlur }));
    }
    else if (item.mode === 'tag') {
        return (react_1.default.createElement(web_react_1.InputTag, { className: className, autoFocus: true, allowClear: false, placeholder: placeholder, value: tempValue, onChange: function (val) {
                updateTempValue(val);
            }, size: size, onBlur: onBlur, onPressEnter: function (e) {
                e.stopPropagation();
                if (!e.target.value.trim()) {
                    updateSearchValue(tempValue);
                }
            }, onKeyDown: function (e) {
                if (e.key === 'Backspace') {
                    if (!(tempValue === null || tempValue === void 0 ? void 0 : tempValue.length)) {
                        updateState('field', null);
                        updateTempValue(undefined);
                    }
                }
            } }));
    }
    return (react_1.default.createElement(web_react_1.Input, { className: className, autoFocus: true, allowClear: false, placeholder: placeholder, value: tempValue, onChange: function (val) {
            updateTempValue(val);
        }, size: size, onBlur: onBlur }));
};
exports.default = ContentInput;
//# sourceMappingURL=ContentInput.js.map