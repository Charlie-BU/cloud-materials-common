"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var utils_1 = require("../utils");
var CEllipsis_1 = tslib_1.__importDefault(require("../../../CEllipsis"));
var ContentSelect = function (props) {
    var className = props.className, item = props.item, tempValue = props.tempValue, placeholder = props.placeholder, searchWord = props.searchWord, size = props.size, updateTempValue = props.updateTempValue, updateSearchWord = props.updateSearchWord, updateState = props.updateState;
    var _value = (0, utils_1.valueToArray)(tempValue);
    var renderTag = function (_a) {
        var _b;
        var value = _a.value;
        var option = item.options.find(function (i) { return i.value === value; });
        return (react_1.default.createElement(web_react_1.Tag, { closable: true, onClose: function () {
                if ((0, lodash_es_1.isArray)(_value)) {
                    var newVal = _value.filter(function (el) { return el !== value; });
                    updateTempValue(newVal);
                }
                else {
                    updateTempValue(undefined);
                }
            }, bordered: true },
            react_1.default.createElement(CEllipsis_1.default, { maxWidth: 100, content: (_b = option === null || option === void 0 ? void 0 : option.label) !== null && _b !== void 0 ? _b : value })));
    };
    return (react_1.default.createElement(web_react_1.InputTag, { className: className, autoFocus: true, allowClear: false, placeholder: placeholder, value: _value, size: size, inputValue: searchWord, onInputChange: function (val) {
            updateSearchWord(val);
        }, onChange: function (val, reason) {
            if (reason === 'remove') {
                updateTempValue(val);
            }
        }, onKeyDown: function (e) {
            if (e.key === 'Backspace') {
                if (!(_value === null || _value === void 0 ? void 0 : _value.length) && !searchWord) {
                    updateState('field', null);
                    updateTempValue(undefined);
                }
            }
        }, renderTag: renderTag }));
};
exports.default = ContentSelect;
//# sourceMappingURL=ContentSelect.js.map