import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { Input, Space } from '@arco-design/web-react';
import CStatus from '../../CStatus';
import COperationMenu from '../../COperationMenu';
import { IconSearch, IconContrastAlt, IconFullscreen, IconFullscreenExit, IconDownload, } from '@arco-design/iconbox-react-ve-o-design';
import cls from 'classnames';
import { testId } from '../dataCy';
import { DefaultOperationEnum } from '../interface';
import { get, isEmpty } from 'lodash-es';
var defaultOperationProps = {
    defaultButtonType: 'outline',
    arcoButtonProps: { size: 'mini' },
    displayNum: 3,
};
export var Header = function (_a) {
    var cStatusProps = _a.cStatusProps, title = _a.title, showSearch = _a.showSearch, keyWord = _a.keyWord, renderOperation = _a.renderOperation, theme = _a.theme, isFullScreen = _a.isFullScreen, controls = _a.controls, logData = _a.logData, operationConfig = _a.operationConfig, extraHeaderContent = _a.extraHeaderContent;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
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
                icon: React.createElement(IconContrastAlt, { className: theme === 'black' ? 'theme-tran' : '' }),
                iconOnly: true,
            },
            arcoPopoverProps: { content: locale.CLog.theme, position: isFullScreen ? 'bottom' : 'top' },
        },
        download: {
            onClick: function () { return controls.onDownload(); },
            arcoButtonProps: {
                icon: React.createElement(IconDownload, null),
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
                icon: isFullScreen ? React.createElement(IconFullscreenExit, null) : React.createElement(IconFullscreen, null),
                iconOnly: true,
            },
            arcoPopoverProps: {
                content: isFullScreen ? locale.CLog.exitFullscreen : locale.CLog.fullscreen,
                position: isFullScreen ? 'bottom' : 'top',
            },
        },
    };
    var defaultOperation = [DefaultOperationEnum.theme, DefaultOperationEnum.download, DefaultOperationEnum.fullScreen];
    var getOperationConfig = function () {
        var _a;
        // 无配置时，默认展示组件自带的三个按钮
        if (!operationConfig) {
            var operations = defaultOperation.map(function (o) { return defaultOperationMap[o]; });
            return __assign(__assign({}, defaultOperationProps), { operations: operations });
        }
        else {
            var operations = (_a = operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.operations) === null || _a === void 0 ? void 0 : _a.map(function (o, index) {
                if (o.hasOwnProperty('type')) {
                    // 使用 get 忽略下 ts
                    if (get(o, 'type') && defaultOperation.includes(get(o, 'type', DefaultOperationEnum.theme))) {
                        var operation = defaultOperationMap[get(o, 'type', DefaultOperationEnum.theme)];
                        if (index >= ((operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.displayNum) || 3)) {
                            operation = __assign(__assign({}, operation), { name: defaultOperationNameMap[get(o, 'type', DefaultOperationEnum.theme)] });
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
            return __assign(__assign(__assign({}, operations), defaultOperationProps), { displayNum: (operationConfig === null || operationConfig === void 0 ? void 0 : operationConfig.displayNum) || (defaultOperationProps === null || defaultOperationProps === void 0 ? void 0 : defaultOperationProps.displayNum), operations: operations });
        }
    };
    var operationMenuProps = getOperationConfig();
    var hasDefaultHeader = !isEmpty(cStatusProps) || title || operationMenuProps || showSearch;
    return (React.createElement("div", { className: cls(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["header"], ["header"])))), "data-cy": testId.header },
        hasDefaultHeader && (React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["header-content-wp"], ["header-content-wp"]))) },
            React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header-content"], ["header-content"]))) },
                React.createElement(Space, { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-title"], ["header-title"]))), size: 12 },
                    cStatusProps && React.createElement(CStatus, __assign({}, cStatusProps)),
                    title && React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["header-title-content"], ["header-title-content"]))) }, title)),
                renderOperation ? (renderOperation(operationMenuProps)) : (React.createElement(Space, { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["header-operation"], ["header-operation"]))), size: 24 },
                    showSearch && (React.createElement(Input, { prefix: React.createElement(IconSearch, null), placeholder: locale.CLog.placeholder, style: { width: 240 }, value: keyWord, onChange: controls.onSearch })),
                    operationMenuProps && React.createElement(COperationMenu, __assign({}, operationMenuProps))))))),
        extraHeaderContent && extraHeaderContent));
};
export default Header;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Header.js.map