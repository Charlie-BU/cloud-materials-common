"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var constant_1 = require("./constant");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var lodash_es_1 = require("lodash-es");
var builtInComponent_1 = require("../_factory/builtInComponent");
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_1 = require("../hooks");
var InfoItem = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = (0, hooks_1.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.Item']) !== null && _a !== void 0 ? _a : {}), label = _c.label, _d = _c.layout, layout = _d === void 0 ? 'horizon' : _d, content = _c.content, _e = _c.labelWidth, labelWidth = _e === void 0 ? 'normal' : _e, // 6字高频，默认值80px
    labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, itemStyle = _c.itemStyle, _f = _c.columnNum, columnNum = _f === void 0 ? 0 : _f, _g = _c.auto, auto = _g === void 0 ? true : _g, _h = _c.children, children = _h === void 0 ? null : _h, _j = _c.defaultEmptyContent, defaultEmptyContent = _j === void 0 ? '-' : _j, _k = _c.hidden, hidden = _k === void 0 ? false : _k, _l = _c.visible, visible = _l === void 0 ? true : _l, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, cEllipsisProps = _c.cEllipsisProps, _m = _c.enableEllipsis, enableEllipsis = _m === void 0 ? false : _m, extraContent = _c.extraContent;
    var cssPrefix = useCssPrefix('info-section');
    var LABEL_CLASS_NAME = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["label"], ["label"])));
    var ref = (0, react_1.useRef)(null);
    var visibleItem = visible === true ? 'visible' : 'hidden';
    var renderBuiltIn = (0, builtInComponent_1.useBuiltIn)().renderBuiltIn;
    var isValidChildren = function (children) {
        if (!(0, lodash_es_1.isArray)(children)) {
            return react_1.default.isValidElement(children) || (0, lodash_es_1.isString)(children) || (0, lodash_es_1.isNumber)(children);
        }
        var res = react_1.default.Children.map(children, function (child) {
            return react_1.default.isValidElement(child) || (0, lodash_es_1.isString)(child) || (0, lodash_es_1.isNumber)(children);
        });
        return res.reduce(function (pre, cur) { return pre && cur; }, true);
    };
    var getContent = function () {
        if (!isValidChildren(children)) {
            if (!((0, lodash_es_1.isNil)(content) || (0, lodash_es_1.isBoolean)(content) || content === '')) {
                if (enableEllipsis) {
                    return react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({}, cEllipsisProps), renderBuiltIn(content));
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
            return react_1.default.createElement(CEllipsis_1.default, tslib_1.__assign({}, cEllipsisProps), children);
        }
        return children;
    };
    var getContentClassName = function (basicClass) {
        return "".concat(layout === 'horizon' ? cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), basicClass) : (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), basicClass), cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["margin-top-4px"], ["margin-top-4px"])))));
    };
    var getLabelWidth = function (labelWidth) {
        return (0, lodash_es_1.isString)(labelWidth) ? constant_1.labelWidthMap[labelWidth] : labelWidth;
    };
    return !hidden ? (react_1.default.createElement(web_react_1.Grid.Row, tslib_1.__assign({}, arcoRowProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), layout), props.className), style: tslib_1.__assign({ visibility: visibleItem }, itemStyle), div: arcoLabelColProps === undefined && arcoContentColProps === undefined && arcoRowProps === undefined, "data-testid": constant_1.testId.item }),
        react_1.default.createElement(web_react_1.Grid.Col, tslib_1.__assign({}, arcoLabelColProps, { className: (0, classnames_1.default)(LABEL_CLASS_NAME, "".concat(LABEL_CLASS_NAME).concat(columnNum)), style: auto ? tslib_1.__assign({ width: getLabelWidth(labelWidth) }, labelStyle) : tslib_1.__assign({}, labelStyle) }), label),
        react_1.default.createElement(web_react_1.Grid.Col, tslib_1.__assign({}, arcoContentColProps, { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["content-wrapper"], ["content-wrapper"]))), style: layout === 'vertical' ? tslib_1.__assign({ overflow: 'visible', visibility: visibleItem }, itemStyle) : {} }),
            react_1.default.createElement("div", { className: getContentClassName('content'), style: tslib_1.__assign({}, contentStyle) }, getContent()),
            react_1.default.createElement("div", { ref: ref, className: getContentClassName('rest-content') }, renderBuiltIn(extraContent, {
                commonProps: { style: { maxWidth: '100%' } },
                defaultPropsMap: {
                    CInlineEdit: {
                        style: { margin: '2px 0px 2px 2px' },
                    },
                },
            }))))) : (react_1.default.createElement(react_1.default.Fragment, null));
};
exports.default = InfoItem;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=InfoItem.js.map