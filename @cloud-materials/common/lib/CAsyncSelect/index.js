"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var util_1 = require("./util");
var web_react_1 = require("@arco-design/web-react");
var useAsyncSelect_1 = require("./hooks/useAsyncSelect");
var dataCy_1 = require("./dataCy");
var useControlledValue_1 = require("../hooks/useControlledValue");
var CConfigProvider_1 = require("../CConfigProvider");
var ConfigProvider_1 = require("@arco-design/web-react/es/ConfigProvider");
var ahooks_1 = require("ahooks");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var icon_1 = require("@arco-design/web-react/icon");
var lodash_es_1 = require("lodash-es");
var CAsyncSelect = (0, react_1.forwardRef)(function (props, ref) {
    var style = props.style, className = props.className, wrapperClassName = props.wrapperClassName, wrapperStyle = props.wrapperStyle, _a = props.dropMenuMaxHeight, dropMenuMaxHeight = _a === void 0 ? 312 : _a, _b = props.optionMode, optionMode = _b === void 0 ? 'singleRow' : _b, reloadKey = props.reloadKey, onDataSourceChange = props.onDataSourceChange, _c = props.enableSearch, enableSearch = _c === void 0 ? true : _c, _d = props.showMaxTagToolTip, showMaxTagToolTip = _d === void 0 ? false : _d, _e = props.enableCopy, enableCopy = _e === void 0 ? false : _e, emptyProps = props.emptyProps, _f = props.showRefreshBtn, showRefreshBtn = _f === void 0 ? false : _f, _g = props.isControlStateChange, isControlStateChange = _g === void 0 ? false : _g, restProps = tslib_1.__rest(props, ["style", "className", "wrapperClassName", "wrapperStyle", "dropMenuMaxHeight", "optionMode", "reloadKey", "onDataSourceChange", "enableSearch", "showMaxTagToolTip", "enableCopy", "emptyProps", "showRefreshBtn", "isControlStateChange"]);
    var _h = tslib_1.__read((0, useControlledValue_1.useControlledValue)(props), 2), state = _h[0], setState = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)([]), 2), selectedOption = _j[0], setSelectedOption = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(false), 2), popupVisible = _k[0], setPopupVisible = _k[1];
    var _l = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _l.useCssPrefix, locale = _l.locale;
    var prefixCls = (0, react_1.useContext)(ConfigProvider_1.ConfigContext).prefixCls;
    var cssPrefix = useCssPrefix('async-select');
    // 异步下拉组件是否有包装层
    var hasOuterWrapper = showRefreshBtn;
    //是否是多选且双行模式
    var isMuiAndDoubleRows = optionMode === 'doubleRow' && restProps.mode === 'multiple';
    var _m = tslib_1.__read((0, useAsyncSelect_1.useCAsyncSelect)(props), 2), _o = _m[0], data = _o.data, loading = _o.loading, loadingMore = _o.loadingMore, autoLoadFirstValue = _o.autoLoadFirstValue, asyncSelectControls = _m[1];
    var onChange = function (val, option) {
        var _a, _b, _c, _d, _e, _f;
        if (!isControlStateChange) {
            setState(val);
        }
        setSelectedOption(option);
        if (!props.labelInValue) {
            // 如果未设置labelInValue，则直接对外传val
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, val, option);
        }
        else {
            // 如果设置了labelInValue，则对label进行处理后传出（未经处理的label是fragment）
            if (!option || (Array.isArray(option) && !option.length)) {
                (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, val, option);
            }
            else if (Array.isArray(val)) {
                // 多选模式
                var formatOptionArr_1 = Array.isArray(option) ? option : [option];
                var res = val.map(function (item) {
                    var _a, _b;
                    var relatedOption = formatOptionArr_1.find(function (optionItem) { return optionItem.value === item.value; });
                    return {
                        value: item.value,
                        label: (_b = (_a = relatedOption === null || relatedOption === void 0 ? void 0 : relatedOption.extra) === null || _a === void 0 ? void 0 : _a['select-tagLabel']) !== null && _b !== void 0 ? _b : item.value,
                    };
                });
                (_c = props.onChange) === null || _c === void 0 ? void 0 : _c.call(props, res, option);
            }
            else {
                // 单选模式
                var formatOptionArr = Array.isArray(option) ? option : [option];
                var relatedOption = formatOptionArr.find(function (optionItem) { return optionItem.value === val.value; });
                val.label = (_e = (_d = relatedOption === null || relatedOption === void 0 ? void 0 : relatedOption.extra) === null || _d === void 0 ? void 0 : _d['select-tagLabel']) !== null && _e !== void 0 ? _e : val.value;
                (_f = props.onChange) === null || _f === void 0 ? void 0 : _f.call(props, val, option);
            }
        }
    };
    /**
     * 重置能力：清空value并重新fetch数据
     */
    var reset = (0, react_1.useCallback)(function () {
        // 清空选中值
        if (props.mode === 'multiple') {
            onChange([], []);
        }
        else {
            onChange(undefined, []);
        }
        // 清空自动选中的第一项
        asyncSelectControls.clearAutoLoadFirstValue();
        asyncSelectControls.setAutoLoadFirstFlag(false);
        // 清空搜索值
        asyncSelectControls.clearSearchWord();
        // 重新加载第一页数据
        asyncSelectControls.reload();
    }, []);
    /**
     * 刷新能力：重新fetch数据，但不清除已选值
     */
    var refresh = (0, react_1.useCallback)(function () {
        // 清空自动选中的第一项
        asyncSelectControls.clearAutoLoadFirstValue();
        // 清空搜索值
        asyncSelectControls.clearSearchWord();
        // 重新加载第一页数据
        asyncSelectControls.reload();
    }, []);
    // 支持ref
    (0, react_1.useImperativeHandle)(ref, function () {
        return {
            data: data,
            reset: function () {
                reset();
            },
            refresh: function () {
                refresh();
            },
        };
    });
    // 数据源发生变化时，调用onDataSourceChange
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        var options = (_a = data === null || data === void 0 ? void 0 : data.list) !== null && _a !== void 0 ? _a : [];
        var mergedOptions = options;
        onDataSourceChange === null || onDataSourceChange === void 0 ? void 0 : onDataSourceChange({
            page: (_b = data === null || data === void 0 ? void 0 : data.page) !== null && _b !== void 0 ? _b : 1,
            noMore: (_c = data === null || data === void 0 ? void 0 : data.noMore) !== null && _c !== void 0 ? _c : false,
            list: mergedOptions,
        });
    }, [data]);
    // reloadKey发生变化时，重新加载数据源并清除已选项
    (0, ahooks_1.useUpdateEffect)(function () {
        reset();
    }, [reloadKey]);
    var getEmptyDropdownRender = function (loading) {
        if (!loading) {
            if (props.dropdownRender) {
                return props.dropdownRender(react_1.default.createElement(web_react_1.Empty, tslib_1.__assign({}, emptyProps)));
            }
            return react_1.default.createElement(web_react_1.Empty, tslib_1.__assign({}, emptyProps));
        }
        return react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["drop-down-loading"], ["drop-down-loading"]))) });
    };
    var customDropdownRender = function (menu) {
        var _a;
        var isNotEmpty = Boolean((_a = data === null || data === void 0 ? void 0 : data.list) === null || _a === void 0 ? void 0 : _a.length);
        if (isNotEmpty || restProps.allowCreate) {
            return (react_1.default.createElement("div", { className: isMuiAndDoubleRows ? cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["drop-down-mui"], ["drop-down-mui"]))) : cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["drop-down"], ["drop-down"]))), "data-testid": dataCy_1.testId.dropDownId },
                props.dropdownRender ? props.dropdownRender(menu) : menu,
                (0, util_1.loadingSpin)(loadingMore)));
        }
        else {
            return (react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["drop-down"], ["drop-down"]))) },
                react_1.default.createElement(react_1.default.Fragment, null,
                    getEmptyDropdownRender(loading),
                    (0, util_1.loadingSpin)(loading))));
        }
    };
    var onFocus = function (val) {
        var _a;
        //CCopy方法内置的copy方法会重新focus已经active的元素 若超出缓存时间会reload 用下行代码暂时避免
        if (enableCopy && popupVisible)
            return;
        asyncSelectControls === null || asyncSelectControls === void 0 ? void 0 : asyncSelectControls.clearSearchWord();
        asyncSelectControls === null || asyncSelectControls === void 0 ? void 0 : asyncSelectControls.handleFocusCacheData();
        (_a = restProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(restProps, val);
    };
    var onClear = function (val) {
        var _a;
        asyncSelectControls === null || asyncSelectControls === void 0 ? void 0 : asyncSelectControls.clearSearchWord();
        (_a = restProps.onClear) === null || _a === void 0 ? void 0 : _a.call(restProps, val);
    };
    var onVisibleChange = function (val) {
        var _a;
        setPopupVisible(val);
        (_a = restProps.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(restProps, val);
    };
    var renderFormat = function (options, value) {
        var _a, _b, _c;
        if (!restProps.renderFormat) {
            if (!!options) {
                if (restProps.mode === 'multiple')
                    return options === null || options === void 0 ? void 0 : options.extra;
                return ((_a = options.extra) === null || _a === void 0 ? void 0 : _a.placeholder) || ((_b = options.extra) === null || _b === void 0 ? void 0 : _b['select-tagLabel']) || (options === null || options === void 0 ? void 0 : options.children);
            }
            return (0, lodash_es_1.isObject)(value) ? value === null || value === void 0 ? void 0 : value.value : value;
        }
        return (_c = restProps.renderFormat) === null || _c === void 0 ? void 0 : _c.call(restProps, options, value);
    };
    var renderTag = function (props, index, values) {
        var _a;
        if (!restProps.renderTag) {
            return (0, util_1.defaultRenderTag)(selectedOption, props, cssPrefix, index, showMaxTagToolTip, locale, restProps === null || restProps === void 0 ? void 0 : restProps.maxTagCount, prefixCls);
        }
        return (_a = restProps.renderTag) === null || _a === void 0 ? void 0 : _a.call(restProps, props, index, values);
    };
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        if (autoLoadFirstValue) {
            if (Array.isArray(autoLoadFirstValue)) {
                var value = autoLoadFirstValue.map(function (item) {
                    var _a;
                    return (_a = item === null || item === void 0 ? void 0 : item.value) !== null && _a !== void 0 ? _a : item;
                });
                var autoLoadFirstValueOption = autoLoadFirstValue.map(function (item) {
                    var _a, _b;
                    return ({
                        value: (_a = item === null || item === void 0 ? void 0 : item.value) !== null && _a !== void 0 ? _a : item,
                        label: (_b = item === null || item === void 0 ? void 0 : item.label) !== null && _b !== void 0 ? _b : item,
                    });
                });
                onChange(props.labelInValue ? autoLoadFirstValueOption : value, []);
            }
            else {
                var value = (_a = autoLoadFirstValue === null || autoLoadFirstValue === void 0 ? void 0 : autoLoadFirstValue.value) !== null && _a !== void 0 ? _a : autoLoadFirstValue;
                var autoLoadFirstValueOption = {
                    value: (_b = autoLoadFirstValue === null || autoLoadFirstValue === void 0 ? void 0 : autoLoadFirstValue.value) !== null && _b !== void 0 ? _b : autoLoadFirstValue,
                    label: (_c = autoLoadFirstValue === null || autoLoadFirstValue === void 0 ? void 0 : autoLoadFirstValue.label) !== null && _c !== void 0 ? _c : autoLoadFirstValue,
                };
                onChange(props.labelInValue ? autoLoadFirstValueOption : value, []);
            }
        }
    }, [autoLoadFirstValue]);
    var SelectCom = (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ clearIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null), suffixIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconDown, null), removeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null) }, restProps, { style: style, className: (0, classnames_1.default)(className, dataCy_1.cssRoot), "data-cy": dataCy_1.testId.selectId, "data-testid": dataCy_1.testId.selectId, filterOption: false, dropdownMenuStyle: { maxHeight: dropMenuMaxHeight }, onFocus: onFocus, onClear: onClear, onChange: onChange, options: (0, util_1.renderOptions)(data, cssPrefix, locale, optionMode, enableCopy), dropdownRender: customDropdownRender, loading: loading || loadingMore, value: state, onVisibleChange: onVisibleChange, onSearch: asyncSelectControls.onSearch, onPopupScroll: asyncSelectControls.popupScrollHandler, showSearch: restProps.showSearch === undefined ? enableSearch : restProps.showSearch, renderFormat: renderFormat, renderTag: renderTag })));
    if (!hasOuterWrapper) {
        return SelectCom;
    }
    else {
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["wrapper"], ["wrapper"]))), wrapperClassName), style: wrapperStyle },
            SelectCom,
            showRefreshBtn && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["refresh-container"], ["refresh-container"])))) },
                react_1.default.createElement(web_react_1.Button, { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["refresh-btn"], ["refresh-btn"]))), style: { backgroundColor: 'var(--color-bg-1)' }, onClick: refresh }, loading ? (react_1.default.createElement(icon_1.IconLoading, { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["loading-icon"], ["loading-icon"]))) })) : (react_1.default.createElement(iconbox_react_ve_o_design_1.IconRefresh, { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["refresh-icon"], ["refresh-icon"]))) })))))));
    }
});
// CAsyncSelect.ForDrawer = CAsyncSelectForDrawer;
exports.default = CAsyncSelect;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map