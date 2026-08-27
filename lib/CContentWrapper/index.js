"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icon_1 = require("@arco-design/web-react/icon");
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../CConfigProvider");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var cssPrefix = (0, classNamePrefixFactory_1.default)('content-wrapper');
exports.testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    popover: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["popover"], ["popover"]))),
    icon: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))),
    cancelbutton: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["cancelbutton"], ["cancelbutton"]))),
    submitbutton: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["submitbutton"], ["submitbutton"]))),
    operationList: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["operationList"], ["operationList"]))),
};
var CContentWrapper = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), locale = _b.locale, useCssPrefix = _b.useCssPrefix;
    var cssPrefix = useCssPrefix('content-wrapper');
    var iconCls = useCssPrefix('')(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["icon"], ["icon"])));
    var title = props.title, content = props.content, className = props.className, footer = props.footer, onBack = props.onBack, leftContent = props.leftContent, operationList = props.operationList, customOperation = props.customOperation, tooltip = props.tooltip, footerBtnPosition = props.footerBtnPosition, onCancel = props.onCancel, _c = props.cancelText, cancelText = _c === void 0 ? locale.CContentWrapper.cancelText : _c, cancelButtonProps = props.cancelButtonProps, _d = props.onSubmit, onSubmit = _d === void 0 ? function () { } : _d, _e = props.submitText, submitText = _e === void 0 ? locale.CContentWrapper.submitText : _e, submitButtonProps = props.submitButtonProps, footerContent = props.footerContent, children = props.children, _f = props.layout, layout = _f === void 0 ? 'normal' : _f, hideHeader = props.hideHeader, renderContent = props.renderContent, prefixCls = props.prefixCls, autoWidthForFullPage = props.autoWidthForFullPage, autoHeightWithViewPort = props.autoHeightWithViewPort, configForNormalLayout = props.configForNormalLayout, customTopContent = props.customTopContent, restProps = tslib_1.__rest(props, ["title", "content", "className", "footer", "onBack", "leftContent", "operationList", "customOperation", "tooltip", "footerBtnPosition", "onCancel", "cancelText", "cancelButtonProps", "onSubmit", "submitText", "submitButtonProps", "footerContent", "children", "layout", "hideHeader", "renderContent", "prefixCls", "autoWidthForFullPage", "autoHeightWithViewPort", "configForNormalLayout", "customTopContent"]);
    var _g = tslib_1.__read((0, react_1.useState)(false), 2), loading = _g[0], setLoading = _g[1];
    var defaultConfig = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext);
    var mergeConfig = Object.assign({}, defaultConfig, 'prefixCls' in props ? { prefixCls: prefixCls } : {});
    var finalContent = children !== null && children !== void 0 ? children : content;
    var operationListDom = operationList ? (react_1.default.createElement(react_1.default.Fragment, null, operationList.map(function (item) { return (react_1.default.createElement("div", { key: item.name, className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["operation-list"], ["operation-list"]))), "data-testid": exports.testId.operationList },
        react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["operation-icon"], ["operation-icon"]))) }, item.icon),
        react_1.default.createElement("span", { onClick: item.onClick }, item.name))); }))) : null;
    var titleDom = (react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["title"], ["title"]))) },
        title,
        tooltip && (react_1.default.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["tooltip"], ["tooltip"]))), "data-testid": exports.testId.icon },
            react_1.default.createElement(web_react_1.ConfigProvider, tslib_1.__assign({}, mergeConfig),
                react_1.default.createElement(web_react_1.Popover, { content: tooltip, position: "right" },
                    react_1.default.createElement(icon_1.IconQuestionCircle, null)))))));
    var sidebarClassName = cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["sidebar"], ["sidebar"])));
    var headerNode = !hideHeader && (react_1.default.createElement("div", { className: cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["header"], ["header"]))), style: configForNormalLayout === null || configForNormalLayout === void 0 ? void 0 : configForNormalLayout.headerStyle },
        title ? titleDom : react_1.default.createElement("div", null),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["header-operation"], ["header-operation"]))) },
            operationListDom,
            customOperation)));
    var multiColContentWrapper = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.isValidElement(leftContent)
            ? react_1.default.cloneElement(leftContent, { className: sidebarClassName })
            : leftContent && react_1.default.createElement("div", { className: sidebarClassName }, leftContent),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["content"], ["content"]))) }, renderContent ? (renderContent({
            header: headerNode,
            body: finalContent,
        })) : (react_1.default.createElement(react_1.default.Fragment, null,
            customTopContent,
            headerNode,
            react_1.default.createElement("div", { style: configForNormalLayout === null || configForNormalLayout === void 0 ? void 0 : configForNormalLayout.contentStyle, className: cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["page-content"], ["page-content"]))) }, finalContent))))));
    var defaultFooter = (react_1.default.createElement("div", { className: cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["fullpage-footer-container"], ["fullpage-footer-container"]))), style: { flexDirection: footerBtnPosition === 'left' ? 'row' : 'row-reverse' } },
        react_1.default.createElement(web_react_1.ConfigProvider, tslib_1.__assign({}, mergeConfig),
            react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
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
                }); }, loading: loading, "data-testid": exports.testId.submitbutton }, submitButtonProps), submitText),
            react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ onClick: onCancel, "data-testid": exports.testId.cancelbutton, className: cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["cancel-btn"], ["cancel-btn"]))) }, cancelButtonProps), cancelText)),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["fullpage-footer-content"], ["fullpage-footer-content"]))) }, footerContent)));
    var fullPageContentWrapper = (react_1.default.createElement(react_1.default.Fragment, null,
        customTopContent,
        !hideHeader && (react_1.default.createElement("div", { className: cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["fullpage-header"], ["fullpage-header"]))) },
            react_1.default.createElement("span", { className: cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["back-wrapper"], ["back-wrapper"]))) },
                onBack && react_1.default.createElement(iconbox_react_ve_o_design_1.IconLeft, { className: iconCls, onClick: onBack }),
                title && titleDom),
            react_1.default.createElement("div", { className: cssPrefix(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["header-operation"], ["header-operation"]))) },
                operationListDom,
                customOperation))),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["fullpage-content-wrapper"], ["fullpage-content-wrapper"]))) },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["fullpage-content"], ["fullpage-content"]))) }, finalContent)),
        footer !== null && (footer !== null && footer !== void 0 ? footer : react_1.default.createElement("div", { className: cssPrefix(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["fullpage-footer"], ["fullpage-footer"]))) }, defaultFooter))));
    var layoutClassNameMap = {
        fullPage: cssPrefix(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["fullpage"], ["fullpage"]))),
        normal: cssPrefix(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["multiCol"], ["multiCol"]))),
    };
    return (react_1.default.createElement("div", tslib_1.__assign({ className: (0, classnames_1.default)(cssPrefix(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject([""], [""]))), layoutClassNameMap[layout], className, (_a = {},
            _a[cssPrefix(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["fullpage-tiled"], ["fullpage-tiled"])))] = autoWidthForFullPage,
            _a)), style: autoHeightWithViewPort ? { height: '100vh' } : {}, "data-testid": exports.testId.container }, restProps), layout === 'normal' ? multiColContentWrapper : fullPageContentWrapper));
};
CContentWrapper.displayName = 'CContentWrapper';
exports.default = CContentWrapper;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29;
//# sourceMappingURL=index.js.map