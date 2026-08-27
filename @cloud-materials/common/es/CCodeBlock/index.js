import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useEffect, useState } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { Popover, Select, Tabs, Empty } from '@arco-design/web-react';
import Line from './components/Line';
import CCopy from '../CCopy';
import Download from './components/Download';
import { useCConfigContext } from '../CConfigProvider';
import CLoadingV2 from '../CLoadingV2';
var cssPrefix = classNamePrefixFactory('code-block');
export var testId = {
    select: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["select"], ["select"]))),
    tab: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["tab"], ["tab"]))),
    downloadBtn: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["download-btn"], ["download-btn"]))),
    customBtn: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["custom-btn"], ["custom-btn"]))),
    line: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["line"], ["line"]))),
    codeblock: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""]))),
};
var CCodeBlock = function (props) {
    var _a = useCConfigContext(), locale = _a.locale, useCssPrefix = _a.useCssPrefix;
    var cssPrefix = useCssPrefix('code-block');
    var iconCls = useCssPrefix('')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["icon"], ["icon"])));
    var style = props.style, className = props.className, data = props.data, _b = props.type, type = _b === void 0 ? 'normal' : _b, title = props.title, tabTitles = props.tabTitles, selectOptions = props.selectOptions, operationGroup = props.operationGroup, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.showRowNumber, showRowNumber = _d === void 0 ? true : _d, arcoSelectProps = props.arcoSelectProps, arcoTabsProps = props.arcoTabsProps, onChangeTab = props.onChangeTab, noDataElement = props.noDataElement;
    var TabPane = Tabs.TabPane;
    var Option = Select.Option;
    var _e = __read(useState(tabTitles ? tabTitles[0] : ''), 2), tabKey = _e[0], setTabKey = _e[1];
    var currentCode = Array.isArray(data) ? data[tabTitles ? tabTitles.indexOf(tabKey) : 0] : data;
    var formatData = function (value) {
        if (Array.isArray(value)) {
            return value;
        }
        else if (value) {
            var splitData = value.split('\n');
            return splitData;
        }
        else {
            return [];
        }
    };
    var _f = __read(useState(formatData(currentCode)), 2), code = _f[0], setCode = _f[1];
    useEffect(function () {
        setCode(formatData(currentCode));
    }, [currentCode]);
    // 根据最大的 number 的字符长度计算
    var numberWidth = "".concat((code === null || code === void 0 ? void 0 : code.length) + 1).length * 8;
    // normal模式下方的代码框
    var belowContent = (React.createElement(CLoadingV2, { type: "block", loading: loading },
        React.createElement("pre", { className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["below-content"], ["below-content"])))) },
            (code === null || code === void 0 ? void 0 : code.length) > 0 ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["code-group"], ["code-group"])))) },
                code.map(function (o, index) { return (React.createElement(Line, { index: index + 1, key: index, value: o, showRowNumber: showRowNumber, numberWidth: numberWidth })); }),
                ' ')) : (noDataElement || React.createElement(Empty, null)),
            operationGroup && (React.createElement("div", { className: classNames(cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["operation-btn"], ["operation-btn"])))) }, operationGroup.map(function (item, index) {
                var _a;
                if (item.type === 'download') {
                    return React.createElement(Download, { value: currentCode, fileName: (_a = item.fileName) !== null && _a !== void 0 ? _a : 'code.txt', key: index });
                }
                else if (item.type === 'copy') {
                    return (React.createElement(CCopy, { tooltip: locale.CCodeBlock.copyTooltip, successMessage: locale.CCopy.successMessage, text: currentCode, failMessage: locale.CCopy.failMessage, key: index }));
                }
                else if (item.render) {
                    return (React.createElement(Popover, { key: index, content: item.popoverContent },
                        React.createElement("div", { className: classNames(iconCls, cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["custom-icon"], ["custom-icon"])))), onClick: item.onClick, "data-testid": testId.customBtn },
                            ' ',
                            item.render)));
                }
            }))))));
    if (type === 'simple') {
        return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["simple"], ["simple"]))), className, cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject([""], [""])))), "data-testid": testId.codeblock }, data));
    }
    else {
        return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["normal"], ["normal"]))), className, cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject([""], [""])))), "data-testid": testId.codeblock },
            (selectOptions || title || tabTitles) && (React.createElement("div", { className: classNames(cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["header"], ["header"])))) },
                selectOptions && (React.createElement("div", { className: classNames(cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["header-select"], ["header-select"])))) },
                    React.createElement(Select, __assign({ placeholder: locale.CCodeBlock.selectPlaceholder, bordered: false }, arcoSelectProps, { style: { minWidth: 100 }, "data-testid": testId.select }), selectOptions.map(function (option, index) { return (React.createElement(Option, { key: index, value: option, style: { fontFamily: 'Menlo', fontSize: 10 } }, option)); })))),
                title && React.createElement("div", { className: classNames(cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["header-title"], ["header-title"])))) }, title),
                tabTitles && (React.createElement("div", { className: classNames(cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["header-tabs"], ["header-tabs"])))) },
                    React.createElement(Tabs, __assign({ type: 'text', onClickTab: function (key) {
                            onChangeTab ? onChangeTab(key) : setTabKey(key);
                        } }, arcoTabsProps, { "data-testid": testId.tab }), tabTitles.map(function (item) {
                        return React.createElement(TabPane, { key: item, title: item });
                    })))))),
            belowContent));
    }
};
CCodeBlock.displayName = 'CCodeBlock';
export default CCodeBlock;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
//# sourceMappingURL=index.js.map