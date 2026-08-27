"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var ModuleEditor_1 = tslib_1.__importDefault(require("./ModuleEditor"));
var hooks_1 = require("./hooks");
var constant_1 = require("./constant");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var InfoItem_1 = tslib_1.__importDefault(require("./InfoItem"));
var builtInComponent_1 = tslib_1.__importDefault(require("../_factory/builtInComponent"));
var util_1 = require("./util");
var CConfigProvider_1 = require("../CConfigProvider");
var hooks_2 = require("../hooks");
var InfoSectionItem = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = (0, hooks_2.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.Item']) !== null && _a !== void 0 ? _a : {}, [props.colNumber]), title = _c.title, splitItemList = _c.splitItemList, _d = _c.layout, layout = _d === void 0 ? 'horizon' : _d, _e = _c.colNumber, colNumber = _e === void 0 ? constant_1.DEFAULT_COLUMN : _e, sectionStyle = _c.sectionStyle, wrapperStyle = _c.wrapperStyle, labelWidth = _c.labelWidth, itemStyle = _c.itemStyle, labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, auto = _c.auto, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, onModuleEditorClick = _c.onModuleEditorClick, moduleEditor = _c.moduleEditor, _f = _c.hidden, hidden = _f === void 0 ? false : _f, _g = _c.visible, visible = _g === void 0 ? true : _g, className = _c.className, _h = _c.direction, direction = _h === void 0 ? 'row' : _h;
    var cssPrefix = useCssPrefix('info-section');
    var visibleItem = visible === true ? 'visible' : 'hidden';
    return !hidden ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["section"], ["section"]))), className), style: tslib_1.__assign(tslib_1.__assign({}, sectionStyle), { visibility: visibleItem }) },
        title && (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["title"], ["title"]))), "data-testid": constant_1.testId.title },
            title,
            (onModuleEditorClick || moduleEditor) && react_1.default.createElement(ModuleEditor_1.default, tslib_1.__assign({ onClick: onModuleEditorClick }, moduleEditor)))),
        direction === 'row' ? (react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["row-wrapper"], ["row-wrapper"]))), style: wrapperStyle }, splitItemList === null || splitItemList === void 0 ? void 0 : splitItemList.map(function (itemList, index) {
            return (react_1.default.createElement(web_react_1.Grid.Row, { key: index, className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["row"], ["row"])))), gutter: 60 }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key, arr) {
                var attrList = Object.assign({}, {
                    layout: layout,
                    itemStyle: itemStyle,
                    labelStyle: labelStyle,
                    labelWidth: labelWidth,
                    contentStyle: contentStyle,
                    auto: auto,
                    arcoLabelColProps: arcoLabelColProps,
                    arcoContentColProps: arcoContentColProps,
                    arcoRowProps: arcoRowProps,
                    visible: visible,
                }, infoItem);
                var colSpan = (0, util_1.calcSpan)({ arr: arr, key: key, infoItem: infoItem, colNumber: colNumber });
                return (react_1.default.createElement(web_react_1.Grid.Col, { key: key, span: colSpan },
                    react_1.default.createElement(InfoItem_1.default, tslib_1.__assign({}, attrList, { columnNum: index }))));
            })));
        }))) : (react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["column-wrapper"], ["column-wrapper"]))), style: wrapperStyle }, splitItemList === null || splitItemList === void 0 ? void 0 : splitItemList.map(function (itemList, index) {
            return (react_1.default.createElement("div", { key: index, className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["column"], ["column"]))), cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["column-", ""], ["column-", ""])), colNumber)) }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key) {
                var attrList = Object.assign({}, {
                    layout: layout,
                    itemStyle: itemStyle,
                    labelStyle: labelStyle,
                    labelWidth: labelWidth,
                    contentStyle: contentStyle,
                    auto: auto,
                    arcoLabelColProps: arcoLabelColProps,
                    arcoContentColProps: arcoContentColProps,
                    arcoRowProps: arcoRowProps,
                    visible: visible,
                }, infoItem);
                return react_1.default.createElement(InfoItem_1.default, tslib_1.__assign({ key: key }, attrList, { columnNum: index }));
            })));
        }))))) : (react_1.default.createElement(react_1.default.Fragment, null));
};
var InfoSectionList = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = (0, hooks_2.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.List']) !== null && _a !== void 0 ? _a : {}), listData = _c.listData, noMargin = _c.noMargin, className = _c.className, style = _c.style, labelWidth = _c.labelWidth, restProps = tslib_1.__rest(_c, ["listData", "noMargin", "className", "style", "labelWidth"]);
    var _d = (0, hooks_1.useCInfoSectionLayout)({
        layout: restProps.layout,
        colNumber: restProps.colNumber,
        direction: restProps.direction,
        responsive: restProps.responsive,
    }), layout = _d.layout, colNumber = _d.colNumber, direction = _d.direction;
    var rows = (0, util_1.formatListData)({ listData: listData, colNumber: colNumber, direction: direction });
    var cssPrefix = useCssPrefix('info-section');
    return (react_1.default.createElement("div", { className: noMargin ? className : (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["wrapper"], ["wrapper"]))), className), style: style, "data-cy": constant_1.testId.container, "data-testid": constant_1.testId.container }, rows === null || rows === void 0 ? void 0 : rows.map(function (infoSectionData, index) {
        return (react_1.default.createElement(InfoSectionItem, tslib_1.__assign({ key: index }, props, infoSectionData, { labelWidth: infoSectionData.labelWidth || labelWidth, layout: infoSectionData.layout || layout, colNumber: (infoSectionData.colNumber || colNumber) })));
    })));
};
var InfoSectionComponent = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = (0, hooks_2.useMergeProps)(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection']) !== null && _a !== void 0 ? _a : {}), title = _c.title, 
    // layout = 'horizon',
    // colNumber = DEFAULT_COLUMN,
    sectionStyle = _c.sectionStyle, wrapperStyle = _c.wrapperStyle, itemStyle = _c.itemStyle, labelWidth = _c.labelWidth, labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, auto = _c.auto, children = _c.children, 
    // direction = 'row',
    onModuleEditorClick = _c.onModuleEditorClick, moduleEditor = _c.moduleEditor, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, style = _c.style, _d = _c.hidden, hidden = _d === void 0 ? false : _d, _e = _c.visible, visible = _e === void 0 ? true : _e, _f = _c.noMargin, noMargin = _f === void 0 ? false : _f, className = _c.className, restProps = tslib_1.__rest(_c, ["title", "sectionStyle", "wrapperStyle", "itemStyle", "labelWidth", "labelStyle", "contentStyle", "auto", "children", "onModuleEditorClick", "moduleEditor", "arcoLabelColProps", "arcoContentColProps", "arcoRowProps", "style", "hidden", "visible", "noMargin", "className"]);
    var _g = (0, hooks_1.useCInfoSectionLayout)({
        layout: restProps.layout,
        colNumber: restProps.colNumber,
        direction: restProps.direction,
        responsive: restProps.responsive,
    }), _h = _g.layout, layout = _h === void 0 ? 'horizon' : _h, _j = _g.colNumber, colNumber = _j === void 0 ? constant_1.DEFAULT_COLUMN : _j, _k = _g.direction, direction = _k === void 0 ? 'row' : _k;
    var childrenList = (0, util_1.formatSectionChildren)({ children: children, direction: direction, colNumber: colNumber });
    var visibleItem = visible === true ? 'visible' : 'hidden';
    var cssPrefix = useCssPrefix('info-section');
    return !hidden ? (react_1.default.createElement("div", tslib_1.__assign({}, restProps, { style: tslib_1.__assign({ visibility: visibleItem }, style), className: noMargin ? className : (0, classnames_1.default)(cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["jsx-wrapper"], ["jsx-wrapper"]))), className), "data-cy": constant_1.testId.container, "data-testid": constant_1.testId.container }),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["section"], ["section"]))), style: tslib_1.__assign({}, sectionStyle) },
            title && (react_1.default.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["title"], ["title"]))), "data-testid": constant_1.testId.title },
                title,
                (onModuleEditorClick || moduleEditor) && react_1.default.createElement(ModuleEditor_1.default, tslib_1.__assign({ onClick: onModuleEditorClick }, moduleEditor)))),
            direction === 'row' ? (react_1.default.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["row-wrapper"], ["row-wrapper"]))), style: wrapperStyle }, childrenList === null || childrenList === void 0 ? void 0 : childrenList.map(function (itemList, index) {
                return (react_1.default.createElement(web_react_1.Grid.Row, { key: index, className: (0, classnames_1.default)(cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["row"], ["row"])))), gutter: 60 }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key, arr) {
                    var attrList = Object.assign({}, {
                        layout: layout,
                        itemStyle: itemStyle,
                        labelStyle: labelStyle,
                        labelWidth: labelWidth,
                        contentStyle: contentStyle,
                        auto: auto,
                        arcoLabelColProps: arcoLabelColProps,
                        arcoContentColProps: arcoContentColProps,
                        arcoRowProps: arcoRowProps,
                        visible: visible,
                    }, infoItem.props);
                    var colSpan = (0, util_1.calcSpan)({ arr: arr, key: key, infoItem: infoItem, colNumber: colNumber });
                    return (react_1.default.createElement(web_react_1.Grid.Col, { key: key, span: colSpan }, react_1.default.cloneElement(infoItem, tslib_1.__assign(tslib_1.__assign({}, attrList), { columnNum: index, key: key }))));
                })));
            }))) : (react_1.default.createElement("div", { className: cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["column-wrapper"], ["column-wrapper"]))), style: wrapperStyle }, childrenList === null || childrenList === void 0 ? void 0 : childrenList.map(function (itemList, index) {
                return (react_1.default.createElement("div", { key: index, className: "".concat(cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["column"], ["column"]))), " ").concat(cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["column-", ""], ["column-", ""])), colNumber)) }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key) {
                    var attrList = Object.assign({}, {
                        layout: layout,
                        itemStyle: itemStyle,
                        labelStyle: labelStyle,
                        labelWidth: labelWidth,
                        contentStyle: contentStyle,
                        auto: auto,
                        arcoLabelColProps: arcoLabelColProps,
                        arcoContentColProps: arcoContentColProps,
                        arcoRowProps: arcoRowProps,
                        visible: visible,
                    }, infoItem.props);
                    return react_1.default.cloneElement(infoItem, tslib_1.__assign(tslib_1.__assign({}, attrList), { columnNum: index, key: key }));
                })));
            })))))) : (react_1.default.createElement(react_1.default.Fragment, null));
};
var InfoSection = Object.assign(InfoSectionComponent, {
    List: (0, builtInComponent_1.default)(InfoSectionList, constant_1.builtInMap),
    Item: (0, builtInComponent_1.default)(InfoItem_1.default, constant_1.builtInMap),
    displayName: 'CInfoSection',
});
exports.default = InfoSection;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
//# sourceMappingURL=index.js.map