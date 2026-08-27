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
var context_1 = require("./context");
var CCheckbox_1 = require("./CCheckbox");
var Group = web_react_1.Checkbox.Group;
var CGroup = function (props) {
    var _a;
    var className = props.className, _b = props.textLineType, textLineType = _b === void 0 ? 'single' : _b, heightSize = props.heightSize, widthSizeInProp = props.widthSize, autoWidth = props.autoWidth, disabled = props.disabled, options = props.options, checkboxProps = props.checkboxProps, _c = props.iconLayout, iconLayout = _c === void 0 ? 'left' : _c, _d = props.horizontalLayout, horizontalLayout = _d === void 0 ? 'center' : _d, restProps = tslib_1.__rest(props, ["className", "textLineType", "heightSize", "widthSize", "autoWidth", "disabled", "options", "checkboxProps", "iconLayout", "horizontalLayout"]);
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    // CCheckbox特有样式
    var prefixCls = useCssPrefix('checkbox');
    // 分段选择器通用样式
    var btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
    var _e = tslib_1.__read((0, react_1.useState)(widthSizeInProp), 2), widthSize = _e[0], setWidthSize = _e[1];
    // Group组件接收的配置
    var contextValue = (0, react_1.useMemo)(function () {
        return {
            textLineType: textLineType,
            checkboxProps: checkboxProps,
            horizontalLayout: horizontalLayout,
            iconLayout: iconLayout,
            widthSize: widthSize,
            heightSize: heightSize,
        };
    }, [widthSize, heightSize, textLineType, checkboxProps, horizontalLayout, iconLayout]);
    var CheckboxListRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (autoWidth === 'groupAdaptive') {
            var maxLength = (_a = (0, lodash_es_1.maxBy)(CheckboxListRef.current, function (item) { return item.offsetWidth; })) === null || _a === void 0 ? void 0 : _a.offsetWidth;
            if (maxLength && maxLength > 0)
                setWidthSize(maxLength);
        }
    }, [autoWidth]);
    var cs = (0, classnames_1.default)(prefixCls(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), prefixCls(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["group"], ["group"]))), btnSelectorCommonPrefixCls(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))), (_a = {},
        _a[prefixCls(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["height-size"], ["height-size"])))] = true,
        _a[prefixCls(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["height-size-small"], ["height-size-small"])))] = heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["height-size"], ["height-size"])))] = true,
        _a[btnSelectorCommonPrefixCls(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["height-size-small"], ["height-size-small"])))] = heightSize === 'small',
        _a[btnSelectorCommonPrefixCls(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["width-size"], ["width-size"])))] = true,
        _a[btnSelectorCommonPrefixCls(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["width-size-", ""], ["width-size-", ""])), widthSize)] = !!widthSize && typeof widthSize === 'string',
        _a), className);
    return (react_1.default.createElement(context_1.GroupConfigContext.Provider, { value: contextValue },
        react_1.default.createElement("div", { "data-cy": utils_1.testId.groupContainer, "data-testid": utils_1.testId.groupContainer, className: cs },
            react_1.default.createElement(Group, tslib_1.__assign({ disabled: disabled }, restProps), options && (0, lodash_es_1.isArray)(options)
                ? options.map(function (optionItem, index) {
                    var option = (0, lodash_es_1.isObject)(optionItem) ? optionItem : { value: optionItem, label: optionItem };
                    return (react_1.default.createElement(CCheckbox_1.CCheckbox
                    // 仅通过Group的option属性来配置多选组时，才能支持同组内自适应
                    , { 
                        // 仅通过Group的option属性来配置多选组时，才能支持同组内自适应
                        ref: function (dom) { return CheckboxListRef.current.push(dom); }, key: option.value, "data-inner-index": index, "data-inner-option": optionItem, disabled: option.disabled || disabled, value: option.value, tag: option.tag, CTagProps: option.CTagProps, arcoPopoverProps: option.arcoPopoverProps }));
                })
                : (0, renderValidChildren_1.renderValidChildren)(props.children, {
                    ref: function (dom) { return CheckboxListRef.current.push(dom); },
                })))));
};
exports.CGroup = CGroup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=CGroup.js.map