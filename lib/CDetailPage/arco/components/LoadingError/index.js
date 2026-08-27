"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingError = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../../CLoadingV2"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
var getDefaultHandleReload = function (options) {
    var type = options.type, detailPage = options.detailPage, activeTab = options.activeTab;
    if (type === 'global') {
        return function () {
            return detailPage === null || detailPage === void 0 ? void 0 : detailPage.refresh({
                reset: true,
            });
        };
    }
    else {
        return function () { return activeTab === null || activeTab === void 0 ? void 0 : activeTab.refresh(); };
    }
};
var getDefaultExtraBtn = function (options) {
    var type = options.type, reloadBtnProps = options.reloadBtnProps, goBackBtnProps = options.goBackBtnProps;
    var reloadBtnList = [
        react_1.default.createElement(web_react_1.Button, { type: "primary", style: { margin: '0 16px' }, key: 'reload', onClick: function () { var _a; return (_a = reloadBtnProps === null || reloadBtnProps === void 0 ? void 0 : reloadBtnProps.onClick) === null || _a === void 0 ? void 0 : _a.call(reloadBtnProps); } }, reloadBtnProps === null || reloadBtnProps === void 0 ? void 0 : reloadBtnProps.text),
    ];
    if (type === 'global') {
        return reloadBtnList.concat([
            react_1.default.createElement(web_react_1.Button, { key: 'goBack', onClick: function () { var _a; return (_a = goBackBtnProps === null || goBackBtnProps === void 0 ? void 0 : goBackBtnProps.onClick) === null || _a === void 0 ? void 0 : _a.call(goBackBtnProps); } }, goBackBtnProps === null || goBackBtnProps === void 0 ? void 0 : goBackBtnProps.text),
        ]);
    }
    else {
        return reloadBtnList;
    }
};
var LoadingError = function (props) {
    var _a = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _a.getCPrefixCls, locale = _a.locale;
    var cssRoot = getCPrefixCls('detail-page');
    var type = props.type, detailPage = props.detailPage, activeTab = props.activeTab, reloadBtnProps = props.reloadBtnProps, goBackBtnProps = props.goBackBtnProps, cLoadingProps = props.cLoadingProps, title = props.title;
    var classNames = type === 'global' ? (0, classnames_1.default)('detailPage-load-error', cLoadingProps === null || cLoadingProps === void 0 ? void 0 : cLoadingProps.className) : cLoadingProps === null || cLoadingProps === void 0 ? void 0 : cLoadingProps.className;
    return (react_1.default.createElement("div", { className: "".concat(cssRoot, "-loading-result-container") },
        react_1.default.createElement(CLoadingV2_1.default.Result, tslib_1.__assign({ title: title || locale.CDetailPage.loadErrorText, extra: getDefaultExtraBtn({
                type: type,
                reloadBtnProps: tslib_1.__assign({ text: locale.CDetailPage.reloadText, onClick: getDefaultHandleReload({
                        type: type,
                        detailPage: detailPage,
                        activeTab: activeTab,
                    }) }, reloadBtnProps),
                goBackBtnProps: tslib_1.__assign({ text: locale.CDetailPage.goBackHomePage }, goBackBtnProps),
            }) }, cLoadingProps, { className: classNames }))));
};
exports.LoadingError = LoadingError;
//# sourceMappingURL=index.js.map