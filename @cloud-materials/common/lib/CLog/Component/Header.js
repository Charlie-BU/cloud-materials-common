"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var web_react_1 = require("@arco-design/web-react");
var CStatus_1 = tslib_1.__importDefault(require("../../CStatus"));
var COperationMenu_1 = tslib_1.__importDefault(require("../../COperationMenu"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var dataCy_1 = require("../dataCy");
var interface_1 = require("../interface");
var lodash_es_1 = require("lodash-es");
var defaultOperationProps = {
    defaultButtonType: 'outline',
    arcoButtonProps: { size: 'mini' },
    displayNum: 3,
};
var Header = function (_a) {
    var cStatusProps = _a.cStatusProps, title = _a.title, showSearch = _a.showSearch, keyWord = _a.keyWord, renderOperation = _a.renderOperation, theme = _a.theme, isFullScreen = _a.isFullScreen, controls = _a.controls, logData = _a.logData, operationConfig = _a.operationConfig, extraHeaderContent = _a.extraHeaderContent;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('log');
    var defaultOperationNameMap = {
        theme: locale.CLog.theme,
        download: locale.CLog.download,
        fullScreen: isFullScreen ? locale.CLog.exitFullscreen : locale.CLog.fullscreen,
    };
    var defaultOperationMap = {
        theme: {
            onClick: function () { return controls.onThemeChange(); },
            arcoButtonProps: {
                icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconContrastAlt, { className: theme === 'black' ? 'theme-tran' : '' }),
                iconOnly: true,
            },
            arcoPopoverProps: { content: locale.CLog.theme, position: isFullScreen ? 'bottom' : 'top' },
        },
        download: {
            onClick: function () { return controls.onDownload(); },
            arcoButtonProps: {
                icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconDownload, null),
                iconOnly: true,
                disabled: !logData || (logData === null || logData === void 0 ? void 0 : logData.length) === 0,
            },
            arcoPopoverProps: {
                content: !logData || (logData === null || logData === void 0 ? void 0 : logData.length) === 0 ? locale.CLog.noData : locale.CLog.download,
                position: isFullScreen ? 'bottom' : 'top',
            },
        },
        fullScreen: {
            onClick: function () { return controls.onFullScreenChange(); },
            arcoButtonProps: {
                icon: isFullScreen ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconFullscreenExit, null) : react_1.default.createElement(iconbox_react_ve_o_design_1.IconFullscreen, null),
                iconOnly: true,
            },
            arcoPopoverProps: {
                content: isFullScreen ? locale.CLog.exitFullscreen : locale.CLog.fullscreen,
                position: isFullScreen ? 'bottom' : 'top',
            },
        },
    };
    var defaultOperation = [interface_1.DefaultOperationEnum.theme, interface_1.DefaultOperationEnum.download, interface_1.DefaultOperationEnum.fullScreen];
    var getOperationConfig = function () {
        var _a;
        // 无配置时，默认展示组件自带的三个按钮
        if (!operationConfig) {
            var operations = defaultOperation.map(function (o) { return defaultOperationMap[o]; });
            return tslib_1.__assign(tslib_1.__assign({}, defaultOperationProps), { operations: operations });
        }
        else {
            var operations = (_a = operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.operations) === null || _a === void 0 ? void 0 : _a.map(function (o, index) {
                if (o.hasOwnProperty('type')) {
                    // 使用 get 忽略下 ts
                    if ((0, lodash_es_1.get)(o, 'type') && defaultOperation.includes((0, lodash_es_1.get)(o, 'type', interface_1.DefaultOperationEnum.theme))) {
                        var operation = defaultOperationMap[(0, lodash_es_1.get)(o, 'type', interface_1.DefaultOperationEnum.theme)];
                        if (index >= ((operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.displayNum) || 3)) {
                            operation = tslib_1.__assign(tslib_1.__assign({}, operation), { name: defaultOperationNameMap[(0, lodash_es_1.get)(o, 'type', interface_1.DefaultOperationEnum.theme)] });
                        }
                        return operation;
                    }
                }
                else {
                    return o;
                }
            });
            if (!operations || (operations === null || operations === void 0 ? void 0 : operations.length) === 0) {
                return undefined;
            }
            return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, operations), defaultOperationProps), { displayNum: (operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.displayNum) || (defaultOperationProps === null || defaultOperationProps === void 0 ? void 0 : defaultOperationProps.displayNum), operations: operations });
        }
    };
    var operationMenuProps = getOperationConfig();
    var hasDefaultHeader = !(0, lodash_es_1.isEmpty)(cStatusProps) || title || operationMenuProps || showSearch;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["header"], ["header"])))), "data-cy": dataCy_1.testId.header },
        hasDefaultHeader && (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["header-content-wp"], ["header-content-wp"]))) },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header-content"], ["header-content"]))) },
                react_1.default.createElement(web_react_1.Space, { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"]))), size: 12 },
                    cStatusProps && react_1.default.createElement(CStatus_1.default, tslib_1.__assign({}, cStatusProps)),
                    title && react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["header-title-content"], ["header-title-content"]))) }, title)),
                renderOperation ? (renderOperation(operationMenuProps)) : (react_1.default.createElement(web_react_1.Space, { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["header-operation"], ["header-operation"]))), size: 24 },
                    showSearch && (react_1.default.createElement(web_react_1.Input, { prefix: react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearch, null), placeholder: locale.CLog.placeholder, style: { width: 240 }, value: keyWord, onChange: controls.onSearch })),
                    operationMenuProps && react_1.default.createElement(COperationMenu_1.default, tslib_1.__assign({}, operationMenuProps))))))),
        extraHeaderContent && extraHeaderContent));
};
exports.Header = Header;
exports.default = exports.Header;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Header.js.map