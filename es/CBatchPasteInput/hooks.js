import { __assign, __read, __spreadArray } from "tslib";
import { formatStr2Arr, hasSeparatorInStr } from './utils';
import useMergeValue from '../hooks/useMergeValue';
import { isObject, isUndefined, uniqBy } from 'lodash-es';
export var useCBatchPasteInput = function (props) {
    var separator = props.separator, onChange = props.onChange, labelInValue = props.labelInValue, value = props.value, defaultValue = props.defaultValue, inputValue = props.inputValue;
    var _a = __read(useMergeValue([], {
        defaultValue: defaultValue ? formatValue(defaultValue) : undefined,
        value: value ? formatValue(value) : undefined,
    }), 2), current = _a[0], setCurrent = _a[1];
    var _b = __read(useMergeValue('', {
        value: inputValue,
    }), 2), currentInputValue = _b[0], setCurrentInputValue = _b[1];
    // 调用用户输入的onChange
    function customOnChangeHandler(value, reason) {
        onChange === null || onChange === void 0 ? void 0 : onChange(labelInValue ? value : value.map(function (item) { return item.value; }), reason);
    }
    // 调用用户传入的onSplit
    function customOnSplit(pasteValue, current, finalValue) {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onSplit) === null || _a === void 0 ? void 0 : _a.call(props, labelInValue ? pasteValue : pasteValue.map(function (item) { return item.value; }), labelInValue ? current : current.map(function (item) { return item.value; }), labelInValue ? finalValue : finalValue.map(function (item) { return item.value; }));
    }
    function valueChangeHandler(value) {
        if (isUndefined(props === null || props === void 0 ? void 0 : props.value)) {
            setCurrent(value);
        }
    }
    function splitStrBySeparator(str) {
        // 根据分隔符将输入字符串处理为数组，再格式化为ObjectValueType类型
        var result = formatValue(formatStr2Arr(str, separator));
        // 处理多次复制的情况，将重复数据进行合并
        var finalValue = uniqBy(__spreadArray(__spreadArray([], __read(formatValue(current)), false), __read(result), false), 'value'); // 合并去重;
        // 调用用户传入的onSplit事件
        customOnSplit(result, current, finalValue);
        return finalValue;
    }
    // 将输入的CBatchPasteInputValueType[] 转换为 ObjectValueType[]
    function formatValue(value) {
        return value.map(function (item) {
            return isObject(item)
                ? __assign(__assign({}, item), { label: item.label, value: item.value }) : { label: item, value: item };
        });
    }
    var cBatchPasteStatus = {
        value: current,
        inputValue: currentInputValue,
    };
    var cBatchPasteStatusControl = {
        /** 切割字符串 并格式化为标准形式 最后与当前控制值融合后返回 */
        splitStrBySeparator: splitStrBySeparator,
        /** 将输入的CBatchPasteInputValueType[] 转换为 ObjectValueType[] */
        formatValue: formatValue,
        /** 处理输入事件,输入根据分隔符切割 */
        handleInputChange: function (inputValue) {
            // 输入有变化时触发
            setCurrentInputValue(inputValue);
            if (hasSeparatorInStr(inputValue, separator)) {
                var finalValue = splitStrBySeparator(inputValue);
                valueChangeHandler(finalValue);
                setCurrentInputValue('');
                // 调用用户传入的onChange
                customOnChangeHandler(finalValue, 'add');
            }
        },
        /** 处理粘贴事件，粘贴时根据分隔符切割 */
        handlePaste: function (e) {
            var _a, _b;
            var str = (_b = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/plain')) !== null && _b !== void 0 ? _b : '';
            e.preventDefault();
            var finalValue = splitStrBySeparator(str);
            setCurrentInputValue('');
            valueChangeHandler(finalValue);
            // 调用用户传入的onChange
            customOnChangeHandler(finalValue, 'add');
            return finalValue;
        },
        /** 处理onChange事件 */
        handleOnChange: function (v) {
            var value = formatValue(v);
            valueChangeHandler(value);
            setCurrentInputValue('');
            // 调用用户传入的onChange
            customOnChangeHandler(value, 'add');
        },
        setValue: function (v) { return valueChangeHandler(v); },
        setInputValue: function (v) { return setCurrentInputValue(v); },
    };
    return [cBatchPasteStatus, cBatchPasteStatusControl];
};
//# sourceMappingURL=hooks.js.map