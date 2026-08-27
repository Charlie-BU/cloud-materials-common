import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { Grid } from '@arco-design/web-react';
import ModuleEditor from './ModuleEditor';
import { useCInfoSectionLayout } from './hooks';
import { DEFAULT_COLUMN, testId, builtInMap } from './constant';
import classNames from 'classnames';
import InfoItem from './InfoItem';
import createBuiltInComponent from '../_factory/builtInComponent';
import { calcSpan, formatListData, formatSectionChildren } from './util';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';
var InfoSectionItem = function (props) {
    var _a;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.Item']) !== null && _a !== void 0 ? _a : {}, [props.colNumber]), title = _c.title, splitItemList = _c.splitItemList, _d = _c.layout, layout = _d === void 0 ? 'horizon' : _d, _e = _c.colNumber, colNumber = _e === void 0 ? DEFAULT_COLUMN : _e, sectionStyle = _c.sectionStyle, wrapperStyle = _c.wrapperStyle, labelWidth = _c.labelWidth, itemStyle = _c.itemStyle, labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, auto = _c.auto, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, onModuleEditorClick = _c.onModuleEditorClick, moduleEditor = _c.moduleEditor, _f = _c.hidden, hidden = _f === void 0 ? false : _f, _g = _c.visible, visible = _g === void 0 ? true : _g, className = _c.className, _h = _c.direction, direction = _h === void 0 ? 'row' : _h;
    var cssPrefix = useCssPrefix('info-section');
    var visibleItem = visible === true ? 'visible' : 'hidden';
    return !hidden ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["section"], ["section"]))), className), style: __assign(__assign({}, sectionStyle), { visibility: visibleItem }) },
        title && (React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["title"], ["title"]))), "data-testid": testId.title },
            title,
            (onModuleEditorClick || moduleEditor) && React.createElement(ModuleEditor, __assign({ onClick: onModuleEditorClick }, moduleEditor)))),
        direction === 'row' ? (React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["row-wrapper"], ["row-wrapper"]))), style: wrapperStyle }, splitItemList === null || splitItemList === void 0 ? void 0 : splitItemList.map(function (itemList, index) {
            return (React.createElement(Grid.Row, { key: index, className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["row"], ["row"])))), gutter: 60 }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key, arr) {
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
                var colSpan = calcSpan({ arr: arr, key: key, infoItem: infoItem, colNumber: colNumber });
                return (React.createElement(Grid.Col, { key: key, span: colSpan },
                    React.createElement(InfoItem, __assign({}, attrList, { columnNum: index }))));
            })));
        }))) : (React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["column-wrapper"], ["column-wrapper"]))), style: wrapperStyle }, splitItemList === null || splitItemList === void 0 ? void 0 : splitItemList.map(function (itemList, index) {
            return (React.createElement("div", { key: index, className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["column"], ["column"]))), cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["column-", ""], ["column-", ""])), colNumber)) }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key) {
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
                return React.createElement(InfoItem, __assign({ key: key }, attrList, { columnNum: index }));
            })));
        }))))) : (React.createElement(React.Fragment, null));
};
var InfoSectionList = function (props) {
    var _a;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection.List']) !== null && _a !== void 0 ? _a : {}), listData = _c.listData, noMargin = _c.noMargin, className = _c.className, style = _c.style, labelWidth = _c.labelWidth, restProps = __rest(_c, ["listData", "noMargin", "className", "style", "labelWidth"]);
    var _d = useCInfoSectionLayout({
        layout: restProps.layout,
        colNumber: restProps.colNumber,
        direction: restProps.direction,
        responsive: restProps.responsive,
    }), layout = _d.layout, colNumber = _d.colNumber, direction = _d.direction;
    var rows = formatListData({ listData: listData, colNumber: colNumber, direction: direction });
    var cssPrefix = useCssPrefix('info-section');
    return (React.createElement("div", { className: noMargin ? className : classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["wrapper"], ["wrapper"]))), className), style: style, "data-cy": testId.container, "data-testid": testId.container }, rows === null || rows === void 0 ? void 0 : rows.map(function (infoSectionData, index) {
        return (React.createElement(InfoSectionItem, __assign({ key: index }, props, infoSectionData, { labelWidth: infoSectionData.labelWidth || labelWidth, layout: infoSectionData.layout || layout, colNumber: (infoSectionData.colNumber || colNumber) })));
    })));
};
var InfoSectionComponent = function (props) {
    var _a;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, cComponentConfig = _b.cComponentConfig;
    var _c = useMergeProps(props, {}, (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CInfoSection']) !== null && _a !== void 0 ? _a : {}), title = _c.title, 
    // layout = 'horizon',
    // colNumber = DEFAULT_COLUMN,
    sectionStyle = _c.sectionStyle, wrapperStyle = _c.wrapperStyle, itemStyle = _c.itemStyle, labelWidth = _c.labelWidth, labelStyle = _c.labelStyle, contentStyle = _c.contentStyle, auto = _c.auto, children = _c.children, 
    // direction = 'row',
    onModuleEditorClick = _c.onModuleEditorClick, moduleEditor = _c.moduleEditor, arcoLabelColProps = _c.arcoLabelColProps, arcoContentColProps = _c.arcoContentColProps, arcoRowProps = _c.arcoRowProps, style = _c.style, _d = _c.hidden, hidden = _d === void 0 ? false : _d, _e = _c.visible, visible = _e === void 0 ? true : _e, _f = _c.noMargin, noMargin = _f === void 0 ? false : _f, className = _c.className, restProps = __rest(_c, ["title", "sectionStyle", "wrapperStyle", "itemStyle", "labelWidth", "labelStyle", "contentStyle", "auto", "children", "onModuleEditorClick", "moduleEditor", "arcoLabelColProps", "arcoContentColProps", "arcoRowProps", "style", "hidden", "visible", "noMargin", "className"]);
    var _g = useCInfoSectionLayout({
        layout: restProps.layout,
        colNumber: restProps.colNumber,
        direction: restProps.direction,
        responsive: restProps.responsive,
    }), _h = _g.layout, layout = _h === void 0 ? 'horizon' : _h, _j = _g.colNumber, colNumber = _j === void 0 ? DEFAULT_COLUMN : _j, _k = _g.direction, direction = _k === void 0 ? 'row' : _k;
    var childrenList = formatSectionChildren({ children: children, direction: direction, colNumber: colNumber });
    var visibleItem = visible === true ? 'visible' : 'hidden';
    var cssPrefix = useCssPrefix('info-section');
    return !hidden ? (React.createElement("div", __assign({}, restProps, { style: __assign({ visibility: visibleItem }, style), className: noMargin ? className : classNames(cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["jsx-wrapper"], ["jsx-wrapper"]))), className), "data-cy": testId.container, "data-testid": testId.container }),
        React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["section"], ["section"]))), style: __assign({}, sectionStyle) },
            title && (React.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["title"], ["title"]))), "data-testid": testId.title },
                title,
                (onModuleEditorClick || moduleEditor) && React.createElement(ModuleEditor, __assign({ onClick: onModuleEditorClick }, moduleEditor)))),
            direction === 'row' ? (React.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["row-wrapper"], ["row-wrapper"]))), style: wrapperStyle }, childrenList === null || childrenList === void 0 ? void 0 : childrenList.map(function (itemList, index) {
                return (React.createElement(Grid.Row, { key: index, className: classNames(cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["row"], ["row"])))), gutter: 60 }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key, arr) {
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
                    var colSpan = calcSpan({ arr: arr, key: key, infoItem: infoItem, colNumber: colNumber });
                    return (React.createElement(Grid.Col, { key: key, span: colSpan }, React.cloneElement(infoItem, __assign(__assign({}, attrList), { columnNum: index, key: key }))));
                })));
            }))) : (React.createElement("div", { className: cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["column-wrapper"], ["column-wrapper"]))), style: wrapperStyle }, childrenList === null || childrenList === void 0 ? void 0 : childrenList.map(function (itemList, index) {
                return (React.createElement("div", { key: index, className: "".concat(cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["column"], ["column"]))), " ").concat(cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["column-", ""], ["column-", ""])), colNumber)) }, itemList === null || itemList === void 0 ? void 0 : itemList.map(function (infoItem, key) {
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
                    return React.cloneElement(infoItem, __assign(__assign({}, attrList), { columnNum: index, key: key }));
                })));
            })))))) : (React.createElement(React.Fragment, null));
};
var InfoSection = Object.assign(InfoSectionComponent, {
    List: createBuiltInComponent(InfoSectionList, builtInMap),
    Item: createBuiltInComponent(InfoItem, builtInMap),
    displayName: 'CInfoSection',
});
export default InfoSection;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
//# sourceMappingURL=index.js.map