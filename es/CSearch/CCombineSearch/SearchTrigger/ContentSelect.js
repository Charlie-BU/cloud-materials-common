import React from 'react';
import { InputTag, Tag } from '@arco-design/web-react';
import { isArray } from 'lodash-es';
import { valueToArray } from '../utils';
import CEllipsis from '../../../CEllipsis';
var ContentSelect = function (props) {
    var className = props.className, item = props.item, tempValue = props.tempValue, placeholder = props.placeholder, searchWord = props.searchWord, size = props.size, updateTempValue = props.updateTempValue, updateSearchWord = props.updateSearchWord, updateState = props.updateState;
    var _value = valueToArray(tempValue);
    var renderTag = function (_a) {
        var _b;
        var value = _a.value;
        var option = item.options.find(function (i) { return i.value === value; });
        return (React.createElement(Tag, { closable: true, onClose: function () {
                if (isArray(_value)) {
                    var newVal = _value.filter(function (el) { return el !== value; });
                    updateTempValue(newVal);
                }
                else {
                    updateTempValue(undefined);
                }
            }, bordered: true },
            React.createElement(CEllipsis, { maxWidth: 100, content: (_b = option === null || option === void 0 ? void 0 : option.label) !== null && _b !== void 0 ? _b : value })));
    };
    return (React.createElement(InputTag, { className: className, autoFocus: true, allowClear: false, placeholder: placeholder, value: _value, size: size, inputValue: searchWord, onInputChange: function (val) {
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
export default ContentSelect;
//# sourceMappingURL=ContentSelect.js.map