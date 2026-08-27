"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var use_url_state_1 = tslib_1.__importDefault(require("@ahooksjs/use-url-state"));
var classNamePrefixFactory_1 = require("../_utils/classNamePrefixFactory");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var useMergeProps_1 = require("../hooks/useMergeProps");
var CConfigProvider_1 = require("../CConfigProvider");
var CDetailHeader_1 = tslib_1.__importDefault(require("./CDetailHeader"));
var CDetailContentWrapper_1 = tslib_1.__importDefault(require("./CDetailContentWrapper"));
var cssRoot = "".concat(classNamePrefixFactory_1.GLOBAL_PREFIX, "-detail");
exports.testId = {
    container: "".concat(cssRoot, "-container"),
};
var defaultProps = { cDetailContentWrapper: true };
function CDetail(props) {
    var _a;
    var _b;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('detail');
    var _c = (0, useMergeProps_1.useMergeProps)(props, defaultProps, {}), style = _c.style, className = _c.className, cDetailHeaderProps = _c.cDetailHeaderProps, cDetailContentWrapper = _c.cDetailContentWrapper, content = _c.content, tabContentMap = _c.tabContentMap, urlTabKey = _c.urlTabKey;
    var _d = cDetailHeaderProps || {}, arcoTabsProps = _d.arcoTabsProps, restDetailHeaderProps = tslib_1.__rest(_d, ["arcoTabsProps"]);
    var _e = arcoTabsProps || {}, defaultActiveTab = _e.defaultActiveTab, activeTab = _e.activeTab, onChange = _e.onChange, restArcoTabProps = tslib_1.__rest(_e, ["defaultActiveTab", "activeTab", "onChange"]);
    var firstRenderRef = (0, react_1.useRef)(true);
    var detailHeaderRef = react_1.default.createRef();
    var initialTabState = activeTab || defaultActiveTab || ((_b = cDetailHeaderProps === null || cDetailHeaderProps === void 0 ? void 0 : cDetailHeaderProps.tabs) === null || _b === void 0 ? void 0 : _b[0].key);
    var _f = tslib_1.__read((0, react_1.useState)(initialTabState), 2), tab = _f[0], setTab = _f[1];
    var _g = tslib_1.__read((0, use_url_state_1.default)(urlTabKey ? (_a = {}, _a[urlTabKey] = initialTabState, _a) : {}), 2), query = _g[0], setQuery = _g[1];
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
    (0, react_1.useEffect)(function () {
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
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className), "data-testid": exports.testId.container },
        cDetailHeaderProps && (react_1.default.createElement(CDetailHeader_1.default, tslib_1.__assign({ arcoTabsProps: tslib_1.__assign({ activeTab: realActiveTab, onChange: changeActiveTab }, restArcoTabProps) }, restDetailHeaderProps, { ref: detailHeaderRef }))),
        cDetailContentWrapper ? (react_1.default.createElement(CDetailContentWrapper_1.default, tslib_1.__assign({}, detailContentWrapperProps), contentNode)) : (contentNode)));
}
CDetail.displayName = 'CDetail';
CDetail.CDetailHeader = CDetailHeader_1.default;
CDetail.CDetailContentWrapper = CDetailContentWrapper_1.default;
exports.default = CDetail;
var templateObject_1;
//# sourceMappingURL=index.js.map