import { __assign } from "tslib";
import React from 'react';
import { Button } from '@arco-design/web-react';
import cls from 'classnames';
import CLoadingV2 from '../../../../CLoadingV2';
import { useCConfigContext } from '../../../../CConfigProvider';
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
        React.createElement(Button, { type: "primary", style: { margin: '0 16px' }, key: 'reload', onClick: function () { var _a; return (_a = reloadBtnProps === null || reloadBtnProps === void 0 ? void 0 : reloadBtnProps.onClick) === null || _a === void 0 ? void 0 : _a.call(reloadBtnProps); } }, reloadBtnProps === null || reloadBtnProps === void 0 ? void 0 : reloadBtnProps.text),
    ];
    if (type === 'global') {
        return reloadBtnList.concat([
            React.createElement(Button, { key: 'goBack', onClick: function () { var _a; return (_a = goBackBtnProps === null || goBackBtnProps === void 0 ? void 0 : goBackBtnProps.onClick) === null || _a === void 0 ? void 0 : _a.call(goBackBtnProps); } }, goBackBtnProps === null || goBackBtnProps === void 0 ? void 0 : goBackBtnProps.text),
        ]);
    }
    else {
        return reloadBtnList;
    }
};
export var LoadingError = function (props) {
    var _a = useCConfigContext(), getCPrefixCls = _a.getCPrefixCls, locale = _a.locale;
    var cssRoot = getCPrefixCls('detail-page');
    var type = props.type, detailPage = props.detailPage, activeTab = props.activeTab, reloadBtnProps = props.reloadBtnProps, goBackBtnProps = props.goBackBtnProps, cLoadingProps = props.cLoadingProps, title = props.title;
    var classNames = type === 'global' ? cls('detailPage-load-error', cLoadingProps === null || cLoadingProps === void 0 ? void 0 : cLoadingProps.className) : cLoadingProps === null || cLoadingProps === void 0 ? void 0 : cLoadingProps.className;
    return (React.createElement("div", { className: "".concat(cssRoot, "-loading-result-container") },
        React.createElement(CLoadingV2.Result, __assign({ title: title || locale.CDetailPage.loadErrorText, extra: getDefaultExtraBtn({
                type: type,
                reloadBtnProps: __assign({ text: locale.CDetailPage.reloadText, onClick: getDefaultHandleReload({
                        type: type,
                        detailPage: detailPage,
                        activeTab: activeTab,
                    }) }, reloadBtnProps),
                goBackBtnProps: __assign({ text: locale.CDetailPage.goBackHomePage }, goBackBtnProps),
            }) }, cLoadingProps, { className: classNames }))));
};
//# sourceMappingURL=index.js.map