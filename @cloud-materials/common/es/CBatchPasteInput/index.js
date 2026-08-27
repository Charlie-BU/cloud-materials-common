import { __assign, __awaiter, __generator, __makeTemplateObject, __read, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { InputTag, Tag, Popover } from '@arco-design/web-react';
import { isLegalIp } from './utils';
import { useCBatchPasteInput } from './hooks';
import { useCConfigContext } from '../CConfigProvider';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { isFunction } from 'lodash-es';
var CBatchPasteInput = function (props) {
    var _a = useCConfigContext(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix('batch-paste');
    var onChange = props.onChange, onInputChange = props.onInputChange, onPaste = props.onPaste, onSplit = props.onSplit, _b = props.saveOnBlur, saveOnBlur = _b === void 0 ? true : _b, _c = props.labelInValue, labelInValue = _c === void 0 ? false : _c, _d = props.placeholder, placeholder = _d === void 0 ? locale.CBatchPasteInput.defaultPlaceholder : _d, tagValidator = props.tagValidator, value = props.value, defaultValue = props.defaultValue, inputValue = props.inputValue, separator = props.separator, style = props.style, className = props.className, validatorMode = props.validatorMode, arcoTagProps = props.arcoTagProps, tagTips = props.tagTips, otherProps = __rest(props, ["onChange", "onInputChange", "onPaste", "onSplit", "saveOnBlur", "labelInValue", "placeholder", "tagValidator", "value", "defaultValue", "inputValue", "separator", "style", "className", "validatorMode", "arcoTagProps", "tagTips"]);
    var _e = __read(useCBatchPasteInput({
        value: value,
        defaultValue: defaultValue,
        inputValue: inputValue,
        separator: separator,
        onChange: onChange,
        labelInValue: labelInValue,
        onSplit: onSplit,
    }), 2), cBatchPasteStatus = _e[0], cBatchPasteStatusControl = _e[1];
    // 自定义输入框tag样式
    var tagRender = function (props, tagIndex, values) {
        var label = props.label, value = props.value, closable = props.closable, onClose = props.onClose;
        var validatorResult = true;
        if (tagValidator) {
            validatorResult = tagValidator(value);
        }
        else {
            validatorResult = validatorMode ? isLegalIp(value, validatorMode) : true;
        }
        var finalArcoTagProps = isFunction(arcoTagProps) ? arcoTagProps({ value: value, values: values, tagIndex: tagIndex }) : arcoTagProps;
        var TagContent = (React.createElement(Tag, __assign({ closable: closable, onClose: onClose, closeIcon: React.createElement(IconClose, null) }, finalArcoTagProps, { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["tag"], ["tag"]))), validatorResult ? cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["tag-normal"], ["tag-normal"]))) : cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["tag-error"], ["tag-error"]))), finalArcoTagProps === null || finalArcoTagProps === void 0 ? void 0 : finalArcoTagProps.className) }), label));
        return tagTips ? React.createElement(Popover, { content: tagTips }, TagContent) : TagContent;
    };
    return (React.createElement(InputTag, __assign({ "data-cy": "batch-paste-input", className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["input"], ["input"]))), className), style: style, allowClear: true, icon: { removeIcon: React.createElement(IconClose, null), clearIcon: React.createElement(IconClose, null) }, placeholder: placeholder, renderTag: tagRender, defaultValue: [], onChange: function (v) {
            // 输入回车触发,且value不重复时触发
            cBatchPasteStatusControl.handleOnChange(v);
        }, value: cBatchPasteStatus.value, onPaste: function (e) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 粘贴时触发
                cBatchPasteStatusControl.handlePaste(e);
                // 调用用户传入的onPaste
                onPaste === null || onPaste === void 0 ? void 0 : onPaste(e);
                return [2 /*return*/];
            });
        }); }, inputValue: cBatchPasteStatus.inputValue, onInputChange: function (inputValue) {
            // 输入改变触发
            cBatchPasteStatusControl.handleInputChange(inputValue);
            // 调用用户传入的onInputChange
            onInputChange === null || onInputChange === void 0 ? void 0 : onInputChange(inputValue);
        }, saveOnBlur: saveOnBlur, onBlur: function () {
            cBatchPasteStatusControl.setInputValue('');
        } }, otherProps)));
};
CBatchPasteInput.displayName = 'CBatchPasteInput';
export default CBatchPasteInput;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map