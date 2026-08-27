"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var Line_1 = tslib_1.__importDefault(require("./components/Line"));
var CCopy_1 = tslib_1.__importDefault(require("../CCopy"));
var Download_1 = tslib_1.__importDefault(require("./components/Download"));
var CConfigProvider_1 = require("../CConfigProvider");
var CLoadingV2_1 = tslib_1.__importDefault(require("../CLoadingV2"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('code-block');
exports.testId = {
    select: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["select"], ["select"]))),
    tab: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["tab"], ["tab"]))),
    downloadBtn: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["download-btn"], ["download-btn"]))),
    customBtn: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["custom-btn"], ["custom-btn"]))),
    line: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["line"], ["line"]))),
    codeblock: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject([""], [""]))),
};
var CCodeBlock = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, useCssPrefix = _a.useCssPrefix;
    var cssPrefix = useCssPrefix('code-block');
    var iconCls = useCssPrefix('')(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["icon"], ["icon"])));
    var style = props.style, className = props.className, data = props.data, _b = props.type, type = _b === void 0 ? 'normal' : _b, title = props.title, tabTitles = props.tabTitles, selectOptions = props.selectOptions, operationGroup = props.operationGroup, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.showRowNumber, showRowNumber = _d === void 0 ? true : _d, arcoSelectProps = props.arcoSelectProps, arcoTabsProps = props.arcoTabsProps, onChangeTab = props.onChangeTab, noDataElement = props.noDataElement;
    var TabPane = web_react_1.Tabs.TabPane;
    var Option = web_react_1.Select.Option;
    var _e = tslib_1.__read((0, react_1.useState)(tabTitles ? tabTitles[0] : ''), 2), tabKey = _e[0], setTabKey = _e[1];
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
    var _f = tslib_1.__read((0, react_1.useState)(formatData(currentCode)), 2), code = _f[0], setCode = _f[1];
    (0, react_1.useEffect)(function () {
        setCode(formatData(currentCode));
    }, [currentCode]);
    // 根据最大的 number 的字符长度计算
    var numberWidth = "".concat((code === null || code === void 0 ? void 0 : code.length) + 1).length * 8;
    // normal模式下方的代码框
    var belowContent = (react_1.default.createElement(CLoadingV2_1.default, { type: "block", loading: loading },
        react_1.default.createElement("pre", { className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["below-content"], ["below-content"])))) },
            (code === null || code === void 0 ? void 0 : code.length) > 0 ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["code-group"], ["code-group"])))) },
                code.map(function (o, index) { return (react_1.default.createElement(Line_1.default, { index: index + 1, key: index, value: o, showRowNumber: showRowNumber, numberWidth: numberWidth })); }),
                ' ')) : (noDataElement || react_1.default.createElement(web_react_1.Empty, null)),
            operationGroup && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["operation-btn"], ["operation-btn"])))) }, operationGroup.map(function (item, index) {
                var _a;
                if (item.type === 'download') {
                    return react_1.default.createElement(Download_1.default, { value: currentCode, fileName: (_a = item.fileName) !== null && _a !== void 0 ? _a : 'code.txt', key: index });
                }
                else if (item.type === 'copy') {
                    return (react_1.default.createElement(CCopy_1.default, { tooltip: locale.CCodeBlock.copyTooltip, successMessage: locale.CCopy.successMessage, text: currentCode, failMessage: locale.CCopy.failMessage, key: index }));
                }
                else if (item.render) {
                    return (react_1.default.createElement(web_react_1.Popover, { key: index, content: item.popoverContent },
                        react_1.default.createElement("div", { className: (0, classnames_1.default)(iconCls, cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["custom-icon"], ["custom-icon"])))), onClick: item.onClick, "data-testid": exports.testId.customBtn },
                            ' ',
                            item.render)));
                }
            }))))));
    if (type === 'simple') {
        return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["simple"], ["simple"]))), className, cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject([""], [""])))), "data-testid": exports.testId.codeblock }, data));
    }
    else {
        return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["normal"], ["normal"]))), className, cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject([""], [""])))), "data-testid": exports.testId.codeblock },
            (selectOptions || title || tabTitles) && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["header"], ["header"])))) },
                selectOptions && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["header-select"], ["header-select"])))) },
                    react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ placeholder: locale.CCodeBlock.selectPlaceholder, bordered: false }, arcoSelectProps, { style: { minWidth: 100 }, "data-testid": exports.testId.select }), selectOptions.map(function (option, index) { return (react_1.default.createElement(Option, { key: index, value: option, style: { fontFamily: 'Menlo', fontSize: 10 } }, option)); })))),
                title && react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"])))) }, title),
                tabTitles && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["header-tabs"], ["header-tabs"])))) },
                    react_1.default.createElement(web_react_1.Tabs, tslib_1.__assign({ type: 'text', onClickTab: function (key) {
                            onChangeTab ? onChangeTab(key) : setTabKey(key);
                        } }, arcoTabsProps, { "data-testid": exports.testId.tab }), tabTitles.map(function (item) {
                        return react_1.default.createElement(TabPane, { key: item, title: item });
                    })))))),
            belowContent));
    }
};
CCodeBlock.displayName = 'CCodeBlock';
exports.default = CCodeBlock;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
//# sourceMappingURL=index.js.map