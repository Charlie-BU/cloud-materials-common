import { __assign, __makeTemplateObject } from "tslib";
import React, { useRef } from 'react';
import { Grid } from '@arco-design/web-react';
import { testId, labelWidthMap } from './constant';
import classNames from 'classnames';
import CEllipsis from '../CEllipsis';
import { isString, isNil, isBoolean, isArray, isNumber } from 'lodash-es';
import { useBuiltIn } from '../_factory/builtInComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
var InfoItem = function (props) {
    var _a;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.Item']) !== null && _a !== void 0 ? _a : {}), label = _c.label, _d = _c.layout, layout = _d === void 0 ? 'horizon' : _d, content = _c.content, _e = _c.labelWidth, labelWidth = _e === void 0 ? 'normal' : _e, // 6字高频，默认值80px
    labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, itemStyle = _c.itemStyle, _f = _c.columnNum, columnNum = _f === void 0 ? 0 : _f, _g = _c.auto, auto = _g === void 0 ? true : _g, _h = _c.children, children = _h === void 0 ? null : _h, _j = _c.defaultEmptyContent, defaultEmptyContent = _j === void 0 ? '-' : _j, _k = _c.hidden, hidden = _k === void 0 ? false : _k, _l = _c.visible, visible = _l === void 0 ? true : _l, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, cEllipsisProps = _c.cEllipsisProps, _m = _c.enableEllipsis, enableEllipsis = _m === void 0 ? false : _m, extraContent = _c.extraContent;
    var cssPrefix = useCssPrefix('info-section');
    var LABEL_CLASS_NAME = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["label"], ["label"])));
    var ref = useRef(null);
    var visibleItem = visible === true ? 'visible' : 'hidden';
    var renderBuiltIn = useBuiltIn().renderBuiltIn;
    var isValidChildren = function (children) {
        if (!isArray(children)) {
            return React.isValidElement(children) || isString(children) || isNumber(children);
        }
        var res = React.Children.map(children, function (child) {
            return React.isValidElement(child) || isString(child) || isNumber(children);
        });
        return res.reduce(function (pre, cur) { return pre && cur; }, true);
    };
    var getContent = function () {
        if (!isValidChildren(children)) {
            if (!(isNil(content) || isBoolean(content) || content === '')) {
                if (enableEllipsis) {
                    return React.createElement(CEllipsis, __assign({}, cEllipsisProps), renderBuiltIn(content));
                }
                return renderBuiltIn(content, {
                    commonProps: { style: { maxWidth: '100%' } },
                    defaultPropsMap: {
                        CInlineEdit: {
                            style: { margin: '2px 0px 2px 2px' },
                        },
                    },
                });
            }
            return defaultEmptyContent;
        }
        if (enableEllipsis) {
            return React.createElement(CEllipsis, __assign({}, cEllipsisProps), children);
        }
        return children;
    };
    var getContentClassName = function (basicClass) {
        return "".concat(layout === 'horizon' ? cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), basicClass) : classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), basicClass), cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["margin-top-4px"], ["margin-top-4px"])))));
    };
    var getLabelWidth = function (labelWidth) {
        return isString(labelWidth) ? labelWidthMap[labelWidth] : labelWidth;
    };
    return !hidden ? (React.createElement(Grid.Row, __assign({}, arcoRowProps, { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", ""], ["", ""])), layout), props.className), style: __assign({ visibility: visibleItem }, itemStyle), div: arcoLabelColProps === undefined && arcoContentColProps === undefined && arcoRowProps === undefined, "data-testid": testId.item }),
        React.createElement(Grid.Col, __assign({}, arcoLabelColProps, { className: classNames(LABEL_CLASS_NAME, "".concat(LABEL_CLASS_NAME).concat(columnNum)), style: auto ? __assign({ width: getLabelWidth(labelWidth) }, labelStyle) : __assign({}, labelStyle) }), label),
        React.createElement(Grid.Col, __assign({}, arcoContentColProps, { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["content-wrapper"], ["content-wrapper"]))), style: layout === 'vertical' ? __assign({ overflow: 'visible', visibility: visibleItem }, itemStyle) : {} }),
            React.createElement("div", { className: getContentClassName('content'), style: __assign({}, contentStyle) }, getContent()),
            React.createElement("div", { ref: ref, className: getContentClassName('rest-content') }, renderBuiltIn(extraContent, {
                commonProps: { style: { maxWidth: '100%' } },
                defaultPropsMap: {
                    CInlineEdit: {
                        style: { margin: '2px 0px 2px 2px' },
                    },
                },
            }))))) : (React.createElement(React.Fragment, null));
};
export default InfoItem;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=InfoItem.js.map