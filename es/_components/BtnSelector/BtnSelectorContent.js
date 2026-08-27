import { __makeTemplateObject } from "tslib";
import React, { useContext } from 'react';
import classNames from 'classnames';
import { isObject, isUndefined } from 'lodash-es';
import CEllipsis from '../../CEllipsis';
import { CConfigContext } from '../../CConfigProvider';
// 分段选择器（CRadio和CCheckbox）的公共内容区组件
// 负责处理CRadio的children或者option
export var BtnSelectorContent = function (props) {
    var _a;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var prefixCls = useCssPrefix('btn-selector-content');
    var textLineType = props.textLineType, option = props.option, _b = props.iconLayout, iconLayout = _b === void 0 ? 'left' : _b, _c = props.horizontalLayout, horizontalLayout = _c === void 0 ? 'center' : _c, children = props.children;
    var mergedOption = !option || isObject(option) ? option : { label: option, value: option };
    var _d = (mergedOption !== null && mergedOption !== void 0 ? mergedOption : {}), icon = _d.icon, label = _d.label, description = _d.description;
    var labelRender = !option ? children : React.createElement(CEllipsis, null, !isUndefined(label) ? label : null);
    var isDoubleTextLineType = textLineType === 'double';
    var textLineTypePrefix = textLineType === 'double' ? 'doubleline' : 'singleline';
    return (React.createElement("div", { className: classNames((_a = {},
            _a[prefixCls(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"])))] = true,
            _a[prefixCls(templateObject_2 || (templateObject_2 = __makeTemplateObject(["iconLayout-right"], ["iconLayout-right"])))] = iconLayout === 'right',
            _a[prefixCls(templateObject_3 || (templateObject_3 = __makeTemplateObject(["horizontalLayout-stretch"], ["horizontalLayout-stretch"])))] = horizontalLayout === 'stretch',
            _a)) },
        React.createElement("div", { className: prefixCls(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["", ""])), textLineTypePrefix) },
            React.createElement("div", { className: prefixCls(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", "-container"], ["", "-container"])), textLineTypePrefix) },
                icon ? React.createElement("span", { className: prefixCls(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", "-icon"], ["", "-icon"])), textLineTypePrefix) }, icon) : null,
                React.createElement("div", { className: prefixCls(templateObject_7 || (templateObject_7 = __makeTemplateObject(["", "-content"], ["", "-content"])), textLineTypePrefix) }, isDoubleTextLineType ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: prefixCls(templateObject_8 || (templateObject_8 = __makeTemplateObject(["doubleline-content-label"], ["doubleline-content-label"]))) }, labelRender),
                    React.createElement("div", { className: prefixCls(templateObject_9 || (templateObject_9 = __makeTemplateObject(["doubleline-content-description"], ["doubleline-content-description"]))) }, description))) : (labelRender))))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=BtnSelectorContent.js.map