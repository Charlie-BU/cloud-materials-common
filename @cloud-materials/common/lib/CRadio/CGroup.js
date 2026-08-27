"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGroup = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var renderValidChildren_1 = require("../_utils/renderValidChildren");
var CConfigProvider_1 = require("../CConfigProvider");
var utils_1 = require("./utils");
var context_1 = tslib_1.__importDefault(require("./context"));
var CRadio_1 = require("./CRadio");
var Group = web_react_1.Radio.Group;
var CGroup = function (props) {
    var _a;
    var className = props.className, _b = props.textLineType, textLineType = _b === void 0 ? 'single' : _b, _c = props.type, type = _c === void 0 ? 'button' : _c, heightSize = props.heightSize, widthSizeInProp = props.widthSize, autoWidth = props.autoWidth, disabled = props.disabled, options = props.options, checkedStyle = props.checkedStyle, _d = props.iconLayout, iconLayout = _d === void 0 ? 'left' : _d, _e = props.horizontalLayout, horizontalLayout = _e === void 0 ? 'center' : _e, radioProps = props.radioProps, restProps = tslib_1.__rest(props, ["className", "textLineType", "type", "heightSize", "widthSize", "autoWidth", "disabled", "options", "checkedStyle", "iconLayout", "horizontalLayout", "radioProps"]);
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var isButtonRadio = type === 'button';
    // CRadio特有样式
    var prefixCls = useCssPrefix('radio');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    // 宽度
    var _f = tslib_1.__read((0, react_1.useState)(widthSizeInProp), 2), widthSize = _f[0], setWidthSize = _f[1];
    // Group组件接收的配置
    var contextValue = (0, react_1.useMemo)(function () {
        return {
            textLineType: textLineType,
            radioProps: radioProps,
            horizontalLayout: horizontalLayout,
            iconLayout: iconLayout,
            widthSize: widthSize,
            heightSize: heightSize,
            type: type,
        };
    }, [widthSize, heightSize, textLineType, radioProps, horizontalLayout, iconLayout, type]);
    var RadioListRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (autoWidth === 'groupAdaptive') {
            var maxLength = (_a = (0, lodash_es_1.maxBy)(RadioListRef.current, function (item) { return item.offsetWidth; })) === null || _a === void 0 ? void 0 : _a.offsetWidth;
            if (maxLength && maxLength > 0)
                setWidthSize(maxLength);
        }
    }, [autoWidth]);
    var cs = (0, classnames_1.default)(prefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), prefixCls(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["group"], ["group"]))), (_a = {},
        _a[btnSelectorCommonPrefixCls(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""])))] = isButtonRadio,
        _a[prefixCls(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["checked-style-", ""], ["checked-style-", ""])), checkedStyle)] = isButtonRadio && !!checkedStyle,
        _a[btnSelectorCommonPrefixCls(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["height-size"], ["height-size"])))] = isButtonRadio,
        _a[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["height-size-small"], ["height-size-small"])))] = isButtonRadio && heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["width-size"], ["width-size"])))] = isButtonRadio,
        _a[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["width-size-", ""], ["width-size-", ""])), widthSize)] = isButtonRadio && !!widthSize && typeof widthSize === 'string',
        _a), className);
    return (react_1.default.createElement(context_1.default.Provider, { value: contextValue },
        react_1.default.createElement(Group, tslib_1.__assign({}, restProps, { type: type, disabled: disabled, className: cs, "data-cy": utils_1.testId.groupContainer, "data-testid": utils_1.testId.groupContainer }), options && (0, lodash_es_1.isArray)(options)
            ? options.map(function (optionItem, index) {
                var option = (0, lodash_es_1.isObject)(optionItem) ? optionItem : { value: optionItem, label: optionItem };
                return (react_1.default.createElement(CRadio_1.CRadio, { ref: function (dom) { return RadioListRef.current.push(dom); }, key: option.value, "data-inner-option": optionItem, "data-inner-index": index, disabled: option.disabled || disabled, value: option.value, tag: option.tag, CTagProps: option.CTagProps, arcoPopoverProps: option.arcoPopoverProps }));
            })
            : (0, renderValidChildren_1.renderValidChildren)(props.children, {
                ref: function (dom) { return RadioListRef.current.push(dom); },
            }))));
};
exports.CGroup = CGroup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=CGroup.js.map