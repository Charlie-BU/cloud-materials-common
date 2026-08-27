import { __assign, __awaiter, __generator, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useContext, useState } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { Button, ConfigProvider, Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
import { IconLeft } from '@arco-design/iconbox-react-ve-o-design';
var cssPrefix = classNamePrefixFactory('content-wrapper');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["popover"], ["popover"]))),
    icon: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["icon"], ["icon"]))),
    cancelbutton: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["cancelbutton"], ["cancelbutton"]))),
    submitbutton: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["submitbutton"], ["submitbutton"]))),
    operationList: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["operationList"], ["operationList"]))),
};
var CContentWrapper = function (props) {
    var _a;
    var _b = useCConfigContext(), locale = _b.locale, useCssPrefix = _b.useCssPrefix;
    var cssPrefix = useCssPrefix('content-wrapper');
    var iconCls = useCssPrefix('')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["icon"], ["icon"])));
    var title = props.title, content = props.content, className = props.className, footer = props.footer, onBack = props.onBack, leftContent = props.leftContent, operationList = props.operationList, customOperation = props.customOperation, tooltip = props.tooltip, footerBtnPosition = props.footerBtnPosition, onCancel = props.onCancel, _c = props.cancelText, cancelText = _c === void 0 ? locale.CContentWrapper.cancelText : _c, cancelButtonProps = props.cancelButtonProps, _d = props.onSubmit, onSubmit = _d === void 0 ? function () { } : _d, _e = props.submitText, submitText = _e === void 0 ? locale.CContentWrapper.submitText : _e, submitButtonProps = props.submitButtonProps, footerContent = props.footerContent, children = props.children, _f = props.layout, layout = _f === void 0 ? 'normal' : _f, hideHeader = props.hideHeader, renderContent = props.renderContent, prefixCls = props.prefixCls, autoWidthForFullPage = props.autoWidthForFullPage, autoHeightWithViewPort = props.autoHeightWithViewPort, configForNormalLayout = props.configForNormalLayout, customTopContent = props.customTopContent, restProps = __rest(props, ["title", "content", "className", "footer", "onBack", "leftContent", "operationList", "customOperation", "tooltip", "footerBtnPosition", "onCancel", "cancelText", "cancelButtonProps", "onSubmit", "submitText", "submitButtonProps", "footerContent", "children", "layout", "hideHeader", "renderContent", "prefixCls", "autoWidthForFullPage", "autoHeightWithViewPort", "configForNormalLayout", "customTopContent"]);
    var _g = __read(useState(false), 2), loading = _g[0], setLoading = _g[1];
    var defaultConfig = useContext(ConfigProvider.ConfigContext);
    var mergeConfig = Object.assign({}, defaultConfig, 'prefixCls' in props ? { prefixCls: prefixCls } : {});
    var finalContent = children !== null && children !== void 0 ? children : content;
    var operationListDom = operationList ? (React.createElement(React.Fragment, null, operationList.map(function (item) { return (React.createElement("div", { key: item.name, className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["operation-list"], ["operation-list"]))), "data-testid": testId.operationList },
        React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["operation-icon"], ["operation-icon"]))) }, item.icon),
        React.createElement("span", { onClick: item.onClick }, item.name))); }))) : null;
    var titleDom = (React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["title"], ["title"]))) },
        title,
        tooltip && (React.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["tooltip"], ["tooltip"]))), "data-testid": testId.icon },
            React.createElement(ConfigProvider, __assign({}, mergeConfig),
                React.createElement(Popover, { content: tooltip, position: "right" },
                    React.createElement(IconQuestionCircle, null)))))));
    var sidebarClassName = cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["sidebar"], ["sidebar"])));
    var headerNode = !hideHeader && (React.createElement("div", { className: cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["header"], ["header"]))), style: configForNormalLayout === null || configForNormalLayout === void 0 ? void 0 : configForNormalLayout.headerStyle },
        title ? titleDom : React.createElement("div", null),
        React.createElement("div", { className: cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["header-operation"], ["header-operation"]))) },
            operationListDom,
            customOperation)));
    var multiColContentWrapper = (React.createElement(React.Fragment, null,
        React.isValidElement(leftContent)
            ? React.cloneElement(leftContent, { className: sidebarClassName })
            : leftContent && React.createElement("div", { className: sidebarClassName }, leftContent),
        React.createElement("div", { className: cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["content"], ["content"]))) }, renderContent ? (renderContent({
            header: headerNode,
            body: finalContent,
        })) : (React.createElement(React.Fragment, null,
            customTopContent,
            headerNode,
            React.createElement("div", { style: configForNormalLayout === null || configForNormalLayout === void 0 ? void 0 : configForNormalLayout.contentStyle, className: cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["page-content"], ["page-content"]))) }, finalContent))))));
    var defaultFooter = (React.createElement("div", { className: cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["fullpage-footer-container"], ["fullpage-footer-container"]))), style: { flexDirection: footerBtnPosition === 'left' ? 'row' : 'row-reverse' } },
        React.createElement(ConfigProvider, __assign({}, mergeConfig),
            React.createElement(Button, __assign({ type: "primary", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                setLoading(true);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, , 3, 4]);
                                return [4 /*yield*/, onSubmit()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                setLoading(false);
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, loading: loading, "data-testid": testId.submitbutton }, submitButtonProps), submitText),
            React.createElement(Button, __assign({ onClick: onCancel, "data-testid": testId.cancelbutton, className: cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["cancel-btn"], ["cancel-btn"]))) }, cancelButtonProps), cancelText)),
        React.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["fullpage-footer-content"], ["fullpage-footer-content"]))) }, footerContent)));
    var fullPageContentWrapper = (React.createElement(React.Fragment, null,
        customTopContent,
        !hideHeader && (React.createElement("div", { className: cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["fullpage-header"], ["fullpage-header"]))) },
            React.createElement("span", { className: cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["back-wrapper"], ["back-wrapper"]))) },
                onBack && React.createElement(IconLeft, { className: iconCls, onClick: onBack }),
                title && titleDom),
            React.createElement("div", { className: cssPrefix(templateObject_22 || (templateObject_22 = __makeTemplateObject(["header-operation"], ["header-operation"]))) },
                operationListDom,
                customOperation))),
        React.createElement("div", { className: cssPrefix(templateObject_23 || (templateObject_23 = __makeTemplateObject(["fullpage-content-wrapper"], ["fullpage-content-wrapper"]))) },
            React.createElement("div", { className: cssPrefix(templateObject_24 || (templateObject_24 = __makeTemplateObject(["fullpage-content"], ["fullpage-content"]))) }, finalContent)),
        footer !== null && (footer !== null && footer !== void 0 ? footer : React.createElement("div", { className: cssPrefix(templateObject_25 || (templateObject_25 = __makeTemplateObject(["fullpage-footer"], ["fullpage-footer"]))) }, defaultFooter))));
    var layoutClassNameMap = {
        fullPage: cssPrefix(templateObject_26 || (templateObject_26 = __makeTemplateObject(["fullpage"], ["fullpage"]))),
        normal: cssPrefix(templateObject_27 || (templateObject_27 = __makeTemplateObject(["multiCol"], ["multiCol"]))),
    };
    return (React.createElement("div", __assign({ className: classNames(cssPrefix(templateObject_28 || (templateObject_28 = __makeTemplateObject([""], [""]))), layoutClassNameMap[layout], className, (_a = {},
            _a[cssPrefix(templateObject_29 || (templateObject_29 = __makeTemplateObject(["fullpage-tiled"], ["fullpage-tiled"])))] = autoWidthForFullPage,
            _a)), style: autoHeightWithViewPort ? { height: '100vh' } : {}, "data-testid": testId.container }, restProps), layout === 'normal' ? multiColContentWrapper : fullPageContentWrapper));
};
CContentWrapper.displayName = 'CContentWrapper';
export default CContentWrapper;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29;
//# sourceMappingURL=index.js.map