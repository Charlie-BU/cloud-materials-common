import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useState, useEffect, useRef } from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { GLOBAL_PREFIX } from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { useMergeProps } from '../hooks/useMergeProps';
import { useCConfigContext } from '../CConfigProvider';
import CDetailHeader from './CDetailHeader';
import CDetailContentWrapper from './CDetailContentWrapper';
var cssRoot = "".concat(GLOBAL_PREFIX, "-detail");
export var testId = {
    container: "".concat(cssRoot, "-container"),
};
var defaultProps = { cDetailContentWrapper: true };
function CDetail(props) {
    var _a;
    var _b;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('detail');
    var _c = useMergeProps(props, defaultProps, {}), style = _c.style, className = _c.className, cDetailHeaderProps = _c.cDetailHeaderProps, cDetailContentWrapper = _c.cDetailContentWrapper, content = _c.content, tabContentMap = _c.tabContentMap, urlTabKey = _c.urlTabKey;
    var _d = cDetailHeaderProps || {}, arcoTabsProps = _d.arcoTabsProps, restDetailHeaderProps = __rest(_d, ["arcoTabsProps"]);
    var _e = arcoTabsProps || {}, defaultActiveTab = _e.defaultActiveTab, activeTab = _e.activeTab, onChange = _e.onChange, restArcoTabProps = __rest(_e, ["defaultActiveTab", "activeTab", "onChange"]);
    var firstRenderRef = useRef(true);
    var detailHeaderRef = React.createRef();
    var initialTabState = activeTab || defaultActiveTab || ((_b = cDetailHeaderProps === null || cDetailHeaderProps === void 0 ? void 0 : cDetailHeaderProps.tabs) === null || _b === void 0 ? void 0 : _b[0].key);
    var _f = __read(useState(initialTabState), 2), tab = _f[0], setTab = _f[1];
    var _g = __read(useUrlState(urlTabKey ? (_a = {}, _a[urlTabKey] = initialTabState, _a) : {}), 2), query = _g[0], setQuery = _g[1];
    var realActiveTab = urlTabKey ? query[urlTabKey] : tab;
    var setRealActiveTab = function (tab) {
        var _a;
        if (urlTabKey) {
            setQuery((_a = {}, _a[urlTabKey] = tab, _a));
        }
        else {
            setTab(tab);
        }
    };
    var detailContentWrapperProps = typeof cDetailContentWrapper === 'object' ? cDetailContentWrapper : {};
    var contentNode = tabContentMap ? tabContentMap === null || tabContentMap === void 0 ? void 0 : tabContentMap[realActiveTab] : content;
    //TODO:这部分的设计还有优化空间
    //受控模式，用户外部手动修改activeTab，内部state需要同步更新
    useEffect(function () {
        // 第一次不需要再次赋值。
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        if (realActiveTab !== activeTab) {
            setRealActiveTab(activeTab);
        }
    }, [activeTab]);
    var changeActiveTab = function (tab) {
        if (tab !== realActiveTab) {
            setRealActiveTab(tab);
            onChange === null || onChange === void 0 ? void 0 : onChange(tab);
        }
    };
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className), "data-testid": testId.container },
        cDetailHeaderProps && (React.createElement(CDetailHeader, __assign({ arcoTabsProps: __assign({ activeTab: realActiveTab, onChange: changeActiveTab }, restArcoTabProps) }, restDetailHeaderProps, { ref: detailHeaderRef }))),
        cDetailContentWrapper ? (React.createElement(CDetailContentWrapper, __assign({}, detailContentWrapperProps), contentNode)) : (contentNode)));
}
CDetail.displayName = 'CDetail';
CDetail.CDetailHeader = CDetailHeader;
CDetail.CDetailContentWrapper = CDetailContentWrapper;
export default CDetail;
var templateObject_1;
//# sourceMappingURL=index.js.map