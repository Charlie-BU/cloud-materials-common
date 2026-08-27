"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var utils_1 = require("./utils");
var hooks_1 = require("./hooks");
var CConfigProvider_1 = require("../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var lodash_es_1 = require("lodash-es");
var CBatchPasteInput = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _a.useCssPrefix, locale = _a.locale;
    var cssPrefix = useCssPrefix('batch-paste');
    var onChange = props.onChange, onInputChange = props.onInputChange, onPaste = props.onPaste, onSplit = props.onSplit, _b = props.saveOnBlur, saveOnBlur = _b === void 0 ? true : _b, _c = props.labelInValue, labelInValue = _c === void 0 ? false : _c, _d = props.placeholder, placeholder = _d === void 0 ? locale.CBatchPasteInput.defaultPlaceholder : _d, tagValidator = props.tagValidator, value = props.value, defaultValue = props.defaultValue, inputValue = props.inputValue, separator = props.separator, style = props.style, className = props.className, validatorMode = props.validatorMode, arcoTagProps = props.arcoTagProps, tagTips = props.tagTips, otherProps = tslib_1.__rest(props, ["onChange", "onInputChange", "onPaste", "onSplit", "saveOnBlur", "labelInValue", "placeholder", "tagValidator", "value", "defaultValue", "inputValue", "separator", "style", "className", "validatorMode", "arcoTagProps", "tagTips"]);
    var _e = tslib_1.__read((0, hooks_1.useCBatchPasteInput)({
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
            validatorResult = validatorMode ? (0, utils_1.isLegalIp)(value, validatorMode) : true;
        }
        var finalArcoTagProps = (0, lodash_es_1.isFunction)(arcoTagProps) ? arcoTagProps({ value: value, values: values, tagIndex: tagIndex }) : arcoTagProps;
        var TagContent = (react_1.default.createElement(web_react_1.Tag, tslib_1.__assign({ closable: closable, onClose: onClose, closeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null) }, finalArcoTagProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["tag"], ["tag"]))), validatorResult ? cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["tag-normal"], ["tag-normal"]))) : cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["tag-error"], ["tag-error"]))), finalArcoTagProps === null || finalArcoTagProps === void 0 ? void 0 : finalArcoTagProps.className) }), label));
        return tagTips ? react_1.default.createElement(web_react_1.Popover, { content: tagTips }, TagContent) : TagContent;
    };
    return (react_1.default.createElement(web_react_1.InputTag, tslib_1.__assign({ "data-cy": "batch-paste-input", className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["input"], ["input"]))), className), style: style, allowClear: true, icon: { removeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null), clearIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null) }, placeholder: placeholder, renderTag: tagRender, defaultValue: [], onChange: function (v) {
            // 输入回车触发,且value不重复时触发
            cBatchPasteStatusControl.handleOnChange(v);
        }, value: cBatchPasteStatus.value, onPaste: function (e) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
exports.default = CBatchPasteInput;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map