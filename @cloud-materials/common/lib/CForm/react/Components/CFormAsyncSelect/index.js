"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var useCFormAsyncSelect_1 = tslib_1.__importDefault(require("./hooks/useCFormAsyncSelect"));
var lodash_es_1 = require("lodash-es");
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
var viewUtils_1 = require("./viewUtils");
var const_1 = require("./const");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../../CLoadingV2"));
var ahooks_1 = require("ahooks");
var CEllipsis_1 = tslib_1.__importDefault(require("../../../../CEllipsis"));
var CFormAsyncSelect = react_1.default.forwardRef(function (props, ref) {
    var _a, _b, _c;
    var _d = tslib_1.__read((0, useCFormAsyncSelect_1.default)((0, lodash_es_1.pick)(props, [
        'autoLoad',
        'dataSource',
        'enableRemoteLoadWhenDataSourceControlled',
        'expiredTime',
        'fetchData',
        'fetchInitData',
        'ifAutoLoadFirst',
        'labelInValue',
        'mode',
        'onChange',
        'onDataSourceChange',
        'onError',
        'onFetchDataLoadingChange',
        'value',
    ])), 2), state = _d[0], control = _d[1];
    var className = props.className, dropdownMenuStyle = props.dropdownMenuStyle, _e = props.filterOption, filterOption = _e === void 0 ? false : _e, _f = props.loadThrottleWait, loadThrottleWait = _f === void 0 ? 200 : _f, loading = props.loading, _g = props.renderFormatType, renderFormatType = _g === void 0 ? 'label' : _g, customRenderOptions = props.renderOptions, _h = props.searchDebounceWait, searchDebounceWait = _h === void 0 ? 300 : _h, showRefreshBtn = props.showRefreshBtn, _j = props.rootMargin, rootMargin = _j === void 0 ? 10 : _j, wrapperClassName = props.wrapperClassName, wrapperStyle = props.wrapperStyle;
    var _k = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _k.useCssPrefix, locale = _k.locale;
    var cssPrefix = useCssPrefix('cform-async-select');
    var hasOuterWrapper = !!showRefreshBtn;
    var refreshBtnProps = typeof showRefreshBtn === 'object' ? showRefreshBtn : {};
    var localLoading = loading !== null && loading !== void 0 ? loading : !!state.loadingType;
    // flash为true，立马重新fetchData；否则autoLoad为false时通过focus获取
    var handleRefresh = function (flash) {
        if (flash === void 0) { flash = true; }
        if (state.enableFetchData) {
            if (flash) {
                control.reload();
            }
            else {
                control.resetFetchState(true);
            }
        }
    };
    var handleReset = function () {
        var _a;
        !state.valueControlled && control.setValue(undefined);
        !(0, lodash_es_1.isUndefined)(state.value) && ((_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, undefined, []));
        handleRefresh(false);
    };
    var handleRefreshBtnClick = function (e) {
        var _a;
        (_a = refreshBtnProps.onClick) === null || _a === void 0 ? void 0 : _a.call(refreshBtnProps, e);
        handleRefresh();
    };
    (0, react_1.useImperativeHandle)(ref, function () { return (tslib_1.__assign({ data: state.dataSource, refresh: handleRefresh, reset: handleReset }, control)); }, [state.dataSource]);
    var handleChange = function (v, option) {
        var _a, _b, _c;
        var value = v;
        if (props.labelInValue && option) {
            if (Array.isArray(option)) {
                value = option.map(function (el, index) { var _a, _b, _c; return ({ value: el.value, label: (_b = (_a = el.extra) === null || _a === void 0 ? void 0 : _a[const_1.LabelAlias]) !== null && _b !== void 0 ? _b : (_c = v[index]) === null || _c === void 0 ? void 0 : _c.label }); });
            }
            else {
                value = { value: option.value, label: (_b = (_a = option === null || option === void 0 ? void 0 : option.extra) === null || _a === void 0 ? void 0 : _a[const_1.LabelAlias]) !== null && _b !== void 0 ? _b : v.label };
            }
        }
        !state.valueControlled && control.setValue(value);
        (_c = props.onChange) === null || _c === void 0 ? void 0 : _c.call(props, value, option);
    };
    var debounceSearch = (0, react_1.useCallback)((0, lodash_es_1.debounce)(function (val) { return control.setSearchWord(val); }, searchDebounceWait), []);
    var handleSearch = function (val) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        debounceSearch(val);
        (_a = props.onSearch) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([props, val], tslib_1.__read(rest), false));
    };
    var handleFocus = function (e) {
        var _a;
        if (state.enableFetchData &&
            (control.getDataSourceExpired() || ((0, lodash_es_1.isUndefined)(state.dataSource) && !state.enableAutoFetchData))) {
            control.reload();
        }
        (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };
    var handleVisibleChange = function (visible) {
        var _a;
        state.searchWord && control.setSearchWord('');
        (_a = props.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(props, visible);
    };
    var throttleLoad = (0, ahooks_1.useThrottleFn)(function () { return control.loadMore(); }, { wait: loadThrottleWait }).run;
    var handlePopupScroll = function (element) {
        var _a;
        var scrollTop = element.scrollTop, scrollHeight = element.scrollHeight, clientHeight = element.clientHeight;
        var scrollBottom = scrollHeight - (scrollTop + clientHeight);
        if (!state.errorType && state.enableFetchData && (0, lodash_es_1.isUndefined)(state.loadingType) && scrollBottom < rootMargin) {
            throttleLoad();
        }
        (_a = props.onPopupScroll) === null || _a === void 0 ? void 0 : _a.call(props, element);
    };
    var renderFormat = function (option, value) {
        var _a, _b, _c;
        var label;
        var val = typeof value === 'object' ? value.value : value;
        if (option) {
            label = (_b = (_a = option.extra) === null || _a === void 0 ? void 0 : _a[const_1.LabelAlias]) !== null && _b !== void 0 ? _b : option.children;
        }
        else {
            label = typeof value === 'object' ? (_c = value.label) !== null && _c !== void 0 ? _c : value.value : value;
        }
        if (renderFormatType === 'value') {
            return val;
        }
        if (renderFormatType === 'labelWithValue') {
            return (react_1.default.createElement(CEllipsis_1.default, { content: react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("span", null, label !== null && label !== void 0 ? label : ''),
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["format-value"], ["format-value"]))) }, " (".concat(val !== null && val !== void 0 ? val : '', ")"))) }));
        }
        return label;
    };
    var dropdownRender = function (menu) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j;
        if (state.loadingType || state.errorType) {
            var dropdownNode = (react_1.default.createElement(react_1.default.Fragment, null,
                !!((_c = (_b = state.dataSource) === null || _b === void 0 ? void 0 : _b.list) === null || _c === void 0 ? void 0 : _c.length) && menu,
                react_1.default.createElement(CLoadingV2_1.default, { type: "inline", loading: !!state.loadingType, className: (0, classnames_1.default)((_a = {},
                        _a[cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["menu"], ["menu"])))] = true,
                        _a[cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["menu-loading-empty"], ["menu-loading-empty"])))] = state.loadingType && !((_d = state.dataSource) === null || _d === void 0 ? void 0 : _d.list.length),
                        _a[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["menu-loading"], ["menu-loading"])))] = state.loadingType && !!((_e = state.dataSource) === null || _e === void 0 ? void 0 : _e.list.length),
                        _a)), hasError: !!state.errorType, onReload: function () {
                        if (state.errorType === 'init') {
                            control.reload();
                        }
                        else if (state.errorType === 'loadmore') {
                            control.loadMore();
                        }
                    } })));
            return (_g = (_f = props.dropdownRender) === null || _f === void 0 ? void 0 : _f.call(props, dropdownNode, menu, state.loadingType, state.errorType)) !== null && _g !== void 0 ? _g : dropdownNode;
        }
        return (_j = (_h = props.dropdownRender) === null || _h === void 0 ? void 0 : _h.call(props, undefined, menu)) !== null && _j !== void 0 ? _j : menu;
    };
    // const renderTag: SelectProps['renderTag'] = props => {
    //   return (
    //     <Tag closable={props.closable} onClose={props.onClose}>
    //       <CEllipsis content={props.label ?? props.value} />
    //     </Tag>
    //   );
    // };
    var selectDom = (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ allowClear: true, clearIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null), suffixIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconDown, null), removeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null) }, props, { className: (0, classnames_1.default)(className, cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject([""], [""])))), dropdownMenuStyle: tslib_1.__assign({ maxHeight: 312 }, dropdownMenuStyle), dropdownRender: dropdownRender, filterOption: state.dataSourceControlled ? filterOption : false, loading: localLoading, onChange: handleChange, onFocus: handleFocus, onPopupScroll: handlePopupScroll, onSearch: handleSearch, onVisibleChange: handleVisibleChange, options: customRenderOptions
            ? customRenderOptions((_a = state.dataSource) === null || _a === void 0 ? void 0 : _a.list)
            : (0, viewUtils_1.renderOptions)({
                locale: locale,
                dataSource: (_b = state.dataSource) === null || _b === void 0 ? void 0 : _b.list,
                optionMode: props.optionMode,
                cssPrefix: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject([""], [""]))),
                getPopupContainer: props.getPopupContainer,
            }), renderFormat: (_c = props.renderFormat) !== null && _c !== void 0 ? _c : renderFormat, value: state.value })));
    if (!hasOuterWrapper)
        return selectDom;
    return (react_1.default.createElement("div", { style: wrapperStyle, className: (0, classnames_1.default)(wrapperClassName, cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["wrapper"], ["wrapper"])))) },
        selectDom,
        showRefreshBtn && (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ iconOnly: true, icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconRefresh, null), className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["wrapper-btn"], ["wrapper-btn"]))), size: props.size }, refreshBtnProps, { loading: localLoading !== null && localLoading !== void 0 ? localLoading : refreshBtnProps.loading, onClick: handleRefreshBtnClick })))));
});
exports.default = CFormAsyncSelect;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=index.js.map