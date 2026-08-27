"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../../../CConfigProvider");
var Popover_1 = tslib_1.__importDefault(require("./Popover"));
var Content_1 = tslib_1.__importDefault(require("./Content"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var utils_1 = require("../utils");
var CLoadingV2_1 = tslib_1.__importDefault(require("../../../CLoadingV2"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('combine-search-trigger');
var SearchTrigger = function (props) {
    var _a;
    var alignType = props.alignType, trigger = props.trigger, className = props.className, style = props.style, popoverClassName = props.popoverClassName, popoverStyle = props.popoverStyle, params = props.params, current = props.current, status = props.status, list = props.list, tempValue = props.tempValue, placeholder = props.placeholder, defaultField = props.defaultField, fuzzy = props.fuzzy, loading = props.loading, fuzzyConfig = props.fuzzyConfig, searchWord = props.searchWord, errState = props.errState, enableEdit = props.enableEdit, ellipsisProps = props.ellipsisProps, listGroup = props.listGroup, keyboardTip = props.keyboardTip, popoverTriggerProps = props.popoverTriggerProps, filterUserInput = props.filterUserInput, updateTempValue = props.updateTempValue, updateState = props.updateState, updateSearchField = props.updateSearchField, updateSearchValue = props.updateSearchValue, updateSearchWord = props.updateSearchWord;
    var alignTypeisInline = alignType === 'inline';
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var triggerCls = getCPrefixCls('search-combine-trigger');
    var focused = status !== 'default';
    var popSelectRef = (0, react_1.useRef)(null);
    var changeField = function (e) {
        e.stopPropagation();
        updateState('field');
    };
    var keyBoardEventHandle = function (e) {
        var _a, _b;
        var enableSelectEvent = true;
        var keyHandler = {
            // 按下Escape
            Escape: function () {
                updateState('field', null);
                updateTempValue(undefined);
                if (status === 'field') {
                    updateState('default', null);
                }
            },
            // 按下Enter
            Enter: function () {
                var _a, _b, _c, _d, _e;
                // e.key 无法区分是否是中文输入法输入的Enter，当处于composing中按enter时，keyCode为229
                if (e.keyCode !== 13) {
                    return;
                }
                // 同时按下shift和enter键，触发多选的保存
                var shiftEnter = current &&
                    ((current.type === 'select' && current.mode === 'multiple') ||
                        (current.type === 'custom' && !current.hideFooter));
                if (e.shiftKey && shiftEnter) {
                    updateSearchValue((0, lodash_es_1.isArray)(tempValue) && !tempValue.length ? undefined : tempValue, current === null || current === void 0 ? void 0 : current.fieldName);
                    updateState('default', null);
                    updateTempValue(undefined);
                    enableSelectEvent = false;
                    return;
                }
                // 仅按下enter键
                // 模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，但搜索项无匹配时，将搜索词作为搜索条件
                // 非模糊匹配下，配置了defaultField，未选择搜索项，输入了搜索词，不关注是否有有处于active的选项，将搜索词作为搜索条件
                if (!current && defaultField && (0, lodash_es_1.isString)(tempValue) && !!tempValue.trim()) {
                    var defaultFieldName_1 = undefined;
                    if (fuzzy) {
                        if (!((_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.activeOptionValue)) {
                            defaultFieldName_1 = defaultField.fieldName;
                            var candidate_1 = (_b = popSelectRef.current) === null || _b === void 0 ? void 0 : _b.getOptionInfoList();
                            if (defaultField.type === 'auto' && (candidate_1 === null || candidate_1 === void 0 ? void 0 : candidate_1.length)) {
                                defaultFieldName_1 = (_c = list.filter(function (el) { return el.type === 'select'; }).find(function (el) {
                                    return el.options.some(function (item) { return item.value === candidate_1[0].value; });
                                })) === null || _c === void 0 ? void 0 : _c.fieldName;
                            }
                        }
                    }
                    else {
                        defaultFieldName_1 = defaultField.fieldName;
                    }
                    if (defaultFieldName_1) {
                        var defaultItem = list.find(function (el) { return el.fieldName === defaultFieldName_1; });
                        var _value = (0, utils_1.valueToArray)(params === null || params === void 0 ? void 0 : params[defaultFieldName_1]);
                        var multValue = (0, lodash_es_1.xor)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(_value), false), tslib_1.__read(tempValue.trim().split(',').filter(Boolean)), false));
                        updateSearchValue((defaultItem === null || defaultItem === void 0 ? void 0 : defaultItem.type) === 'select' && (defaultItem.mode === 'multiple' || defaultItem.multiValues)
                            ? multValue
                            : tempValue, defaultFieldName_1);
                        enableSelectEvent = false;
                    }
                }
                // select筛选时，allowCreate时，搜索未匹配到搜索项，则用搜索词作为搜索条件
                if (current &&
                    current.type === 'select' &&
                    current.allowCreate &&
                    !((_d = popSelectRef.current) === null || _d === void 0 ? void 0 : _d.activeOptionValue) &&
                    (0, lodash_es_1.isString)(searchWord) &&
                    !!searchWord.trim()) {
                    // enableEdit 可编辑时，使用tempValue。否则使用已选择的值，因为tempValue为undefined
                    updateSearchValue(current.mode === 'multiple' || current.multiValues
                        ? (0, lodash_es_1.uniq)(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((0, utils_1.valueToArray)(enableEdit ? tempValue : params === null || params === void 0 ? void 0 : params[current.fieldName])), false), tslib_1.__read(((_e = searchWord.trim().split(',').filter(Boolean)) !== null && _e !== void 0 ? _e : [])), false))
                        : searchWord.trim(), current.fieldName);
                }
                // inputTag需要两次回车，因此没在这里处理，而是在组件上处理
                // inputTag onPressEnter 阻止事件冒泡
                if ((current === null || current === void 0 ? void 0 : current.type) === 'input') {
                    updateSearchValue(tempValue);
                    enableSelectEvent = false;
                }
            },
            // 按下Backspace
            Backspace: function () {
                // InputTag组件阻止了KeyboardEvent Backspace事件的冒泡。
                // - 因此select类型搜索和input的tag类型搜索的事件需要在ContentSelect上进行处理
                // input类型的搜索在这里进行处理
                if ((current === null || current === void 0 ? void 0 : current.type) === 'input' && !tempValue) {
                    updateState('field', null);
                    updateTempValue(undefined);
                }
            },
            // 按下 Tab，触发 active 下一个 option
            Tab: function () {
                var _a;
                e.preventDefault();
                (_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.hotkeyHandler(new KeyboardEvent('keydown', { keyCode: 40 }));
            },
        };
        (_a = keyHandler[e.key]) === null || _a === void 0 ? void 0 : _a.call(keyHandler);
        enableSelectEvent && ((_b = popSelectRef.current) === null || _b === void 0 ? void 0 : _b.hotkeyHandler(e));
    };
    (0, react_1.useEffect)(function () {
        updateSearchWord(undefined);
    }, [status, current === null || current === void 0 ? void 0 : current.fieldName]);
    return (react_1.default.createElement(web_react_1.Spin, { loading: loading === 'block', block: true },
        react_1.default.createElement(web_react_1.Popover, { style: tslib_1.__assign(tslib_1.__assign({}, popoverStyle), ((current === null || current === void 0 ? void 0 : current.type) === 'custom' ? current.popoverStyle : {})), trigger: trigger, triggerProps: tslib_1.__assign(tslib_1.__assign({ position: 'bl', showArrow: false, clickToClose: false, popupStyle: { padding: 0 }, popupAlign: { bottom: 6 }, autoFitPosition: false }, popoverTriggerProps), { onClickOutside: trigger === 'hover' || ((0, lodash_es_1.isArray)(trigger) && trigger.includes('hover'))
                    ? function () {
                        var _a;
                        updateState('default', null);
                        (_a = popoverTriggerProps === null || popoverTriggerProps === void 0 ? void 0 : popoverTriggerProps.onClickOutside) === null || _a === void 0 ? void 0 : _a.call(popoverTriggerProps);
                    }
                    : popoverTriggerProps === null || popoverTriggerProps === void 0 ? void 0 : popoverTriggerProps.onClickOutside }), popupVisible: focused, onVisibleChange: function (val) {
                updateState(val ? (current ? 'value' : 'field') : 'default', null);
                updateSearchWord(undefined);
                updateTempValue(undefined);
            }, className: popoverClassName, content: react_1.default.createElement(CLoadingV2_1.default.Spin, { loading: loading !== 'none', arcoSpinProps: { block: true } },
                react_1.default.createElement(Popover_1.default, { popSelectRef: popSelectRef, list: list, params: params, status: status, current: current, tempValue: tempValue, fuzzy: fuzzy, fuzzyConfig: fuzzyConfig, searchWord: searchWord, enableEdit: enableEdit, ellipsisProps: ellipsisProps, listGroup: listGroup, keyboardTip: keyboardTip, filterUserInput: filterUserInput, updateState: updateState, updateSearchField: updateSearchField, updateSearchValue: updateSearchValue, updateTempValue: updateTempValue, updateSearchWord: updateSearchWord })) },
            react_1.default.createElement("div", { className: alignTypeisInline
                    ? getCPrefixCls('search-combine-trigger-inline')
                    : (0, classnames_1.default)(triggerCls, (_a = {}, _a["".concat(triggerCls, "-focused")] = focused, _a["".concat(triggerCls, "-err")] = errState, _a), className), style: style, "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), onKeyDown: keyBoardEventHandle },
                alignTypeisInline ? null : react_1.default.createElement(iconbox_react_ve_o_design_1.IconSearch, { className: "".concat(triggerCls, "-search") }),
                status !== 'default' && current && (react_1.default.createElement("span", { className: "".concat(triggerCls, "-label"), onClick: changeField, tabIndex: 0, onKeyDown: function (e) { var _a; return (_a = popSelectRef.current) === null || _a === void 0 ? void 0 : _a.hotkeyHandler(e); } },
                    current.label,
                    ":")),
                react_1.default.createElement(Content_1.default, { className: "".concat(triggerCls, "-content"), current: current, alignType: alignType, readOnly: !fuzzy, tempValue: tempValue, placeholder: placeholder, defaultField: defaultField, searchWord: searchWord, updateTempValue: updateTempValue, updateSearchValue: updateSearchValue, updateSearchWord: updateSearchWord, updateState: updateState }),
                loading === 'inline' && react_1.default.createElement(iconbox_react_ve_o_design_1.IconLoading, { className: "".concat(triggerCls, "-loading") })))));
};
exports.default = SearchTrigger;
var templateObject_1;
//# sourceMappingURL=index.js.map