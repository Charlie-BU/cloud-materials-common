"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeOptions = exports.getAutoLoadFirstValue = exports.renderOptions = exports.defaultRenderTag = exports.loadingSpin = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var fast_json_stable_stringify_1 = tslib_1.__importDefault(require("fast-json-stable-stringify"));
var react_1 = tslib_1.__importDefault(require("react"));
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var dataCy_1 = require("./dataCy");
var lodash_es_1 = require("lodash-es");
var CCopy_1 = tslib_1.__importDefault(require("../CCopy"));
var loadingSpin = function (loading) { return (react_1.default.createElement(web_react_1.Spin, { size: 20, style: {
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        transition: 'all .5s',
        opacity: loading ? 1 : 0,
        pointerEvents: 'none',
        background: 'linear-gradient(transparent, #FFFFFF)',
    } })); };
exports.loadingSpin = loadingSpin;
var renderToolTipContent = function (_a) {
    var item = _a.item, cssPrefix = _a.cssPrefix, locale = _a.locale, isTextOverflow = _a.isTextOverflow, value = _a.value;
    if ((!item || !item['select-tagLabel']) && value) {
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": dataCy_1.testId.tooltipLabelId }, value));
    }
    if (!!(item === null || item === void 0 ? void 0 : item.disabled)) {
        return (react_1.default.createElement("div", null,
            isTextOverflow && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": dataCy_1.testId.tooltipLabelId }, (item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item['select-tagLabel'])),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["tooltip-des"], ["tooltip-des"]))), "data-testid": dataCy_1.testId.tooltipDesId }, (item === null || item === void 0 ? void 0 : item.description) || (item === null || item === void 0 ? void 0 : item['select-description'])))),
            (item === null || item === void 0 ? void 0 : item.disabledTooltipContent) && (react_1.default.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["tooltip-des"], ["tooltip-des"]))) },
                locale.CAsyncSelect.disabledReason,
                "\uFF1A", item === null || item === void 0 ? void 0 :
                item.disabledTooltipContent))));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": dataCy_1.testId.tooltipLabelId }, (item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item['select-tagLabel'])),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["tooltip-des"], ["tooltip-des"]))), "data-testid": dataCy_1.testId.tooltipDesId }, (item === null || item === void 0 ? void 0 : item.description) || (item === null || item === void 0 ? void 0 : item['select-description']))));
};
var renderToolTipContentMaxTag = function (needShowExtraOptions, cssPrefix, locale) {
    var needShowExtraLabels = needShowExtraOptions.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.extra) === null || _a === void 0 ? void 0 : _a['select-tagLabel']; });
    return (react_1.default.createElement("div", { onClick: function (e) { return e.stopPropagation(); } },
        react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["tag-label"], ["tag-label"]))) }, needShowExtraLabels.map(function (item) {
            var _a;
            return (react_1.default.createElement(CEllipsis_1.default, { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["tag-label-div"], ["tag-label-div"]))), showPopover: false, suffix: react_1.default.createElement(CCopy_1.default, { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: item }), key: (item === null || item === void 0 ? void 0 : item.value) || ((_a = item === null || item === void 0 ? void 0 : item.extra) === null || _a === void 0 ? void 0 : _a['select-tagLabel']) },
                react_1.default.createElement("span", null, item)));
        })),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["tag-label-copy-div"], ["tag-label-copy-div"]))) },
            react_1.default.createElement(CCopy_1.default, { text: needShowExtraLabels.join(', ') },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["tag-label-copy-content"], ["tag-label-copy-content"]))) }, locale.CAsyncSelect.copyAll)),
            react_1.default.createElement("span", { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["tag-label-count"], ["tag-label-count"]))) }, "".concat(needShowExtraLabels === null || needShowExtraLabels === void 0 ? void 0 : needShowExtraLabels.length).concat(locale.CAsyncSelect.items)))));
};
var defaultRenderTag = function (selectedOptions, tagProps, cssPrefix, index, showMaxTagToolTip, locale, maxTagCount, prefixCls) {
    var label = tagProps.label, value = tagProps.value, onClose = tagProps.onClose;
    var isMaxTagLabel = false;
    var needShowExtraOptions = [];
    if (!!maxTagCount) {
        var maxTagCountNumber = (0, lodash_es_1.isObject)(maxTagCount) ? maxTagCount.count : maxTagCount;
        if ((0, lodash_es_1.isNumber)(maxTagCountNumber)) {
            // arco 2.62.0 版本新增 'responsive' 能力，本组件暂时不支持该特性下的tooltip展示
            isMaxTagLabel = index >= maxTagCountNumber;
            if (isMaxTagLabel && Array.isArray(selectedOptions)) {
                needShowExtraOptions = selectedOptions.slice(maxTagCountNumber);
            }
        }
    }
    if (isMaxTagLabel) {
        if (showMaxTagToolTip) {
            return (react_1.default.createElement(web_react_1.Popover, { content: renderToolTipContentMaxTag(needShowExtraOptions, cssPrefix, locale), position: 'top', triggerProps: { style: { width: 380 } } },
                react_1.default.createElement(web_react_1.Tag, { closable: false, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag"), "data-testid": dataCy_1.testId.maxTagId }, label || value)));
        }
        return (react_1.default.createElement(web_react_1.Tag, { closable: false, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag") }, label || value));
    }
    else {
        return (react_1.default.createElement(web_react_1.Popover, { content: renderToolTipContent({ item: label, cssPrefix: cssPrefix, locale: locale, value: value }), position: 'right' },
            react_1.default.createElement(web_react_1.Tag, { closable: true, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag") }, (label === null || label === void 0 ? void 0 : label['select-tagLabel']) || value)));
    }
};
exports.defaultRenderTag = defaultRenderTag;
function isPrimitiveOption(option) {
    return typeof option === 'string' || typeof option === 'number';
}
/**
 * 渲染Option的方法
 */
var renderOptions = function (data, cssPrefix, locale, optionMode, enableCopy) {
    //如果数据结构异常，返回空数组
    if (!data || !data.list)
        return [];
    //下面的逻辑都是data?.list是Option[]类型的
    var renderLabelsForSingleRow = function (item) {
        return (react_1.default.createElement("div", { className: enableCopy ? cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["option-ellipsis"], ["option-ellipsis"]))) : '' },
            react_1.default.createElement(CEllipsis_1.default, { arcoPopoverProps: {
                    position: 'right',
                }, popoverContent: function (isTextOverflow) { return renderToolTipContent({ item: item, cssPrefix: cssPrefix, locale: locale, isTextOverflow: isTextOverflow }); }, showPopover: ((item === null || item === void 0 ? void 0 : item.disabled) && !!(item === null || item === void 0 ? void 0 : item.disabledTooltipContent)) || 'auto' },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["single-label"], ["single-label"]))), "data-testid": dataCy_1.testId.singleLabelId }, item === null || item === void 0 ? void 0 : item.label),
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["single-des"], ["single-des"]))), "data-testid": dataCy_1.testId.singleDesId }, item === null || item === void 0 ? void 0 : item.description))),
            enableCopy && react_1.default.createElement(CCopy_1.default, { className: cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: ((item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item.value)) })));
    };
    var renderLabelsForDoubleRow = function (item) {
        return (react_1.default.createElement("div", { className: enableCopy ? cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["option-ellipsis-double"], ["option-ellipsis-double"]))) : '' },
            react_1.default.createElement(CEllipsis_1.default, { arcoPopoverProps: {
                    position: 'right',
                }, popoverContent: function (isTextOverflow) { return renderToolTipContent({ item: item, cssPrefix: cssPrefix, locale: locale, isTextOverflow: isTextOverflow }); }, className: cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["ellipsis"], ["ellipsis"]))), showPopover: ((item === null || item === void 0 ? void 0 : item.disabled) && !!(item === null || item === void 0 ? void 0 : item.disabledTooltipContent)) || 'auto' },
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["double-label"], ["double-label"]))), "data-testid": dataCy_1.testId.doubleLabelId }, item === null || item === void 0 ? void 0 : item.label),
                    react_1.default.createElement("span", { className: cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["double-des"], ["double-des"]))), "data-testid": dataCy_1.testId.doubleDesId }, item === null || item === void 0 ? void 0 : item.description))),
            enableCopy && react_1.default.createElement(CCopy_1.default, { className: cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: ((item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item.value)) })));
    };
    var recombinationExtra = function (item) {
        if (item === null || item === void 0 ? void 0 : item.extra) {
            return tslib_1.__assign(tslib_1.__assign({}, item.extra), { 'select-tagLabel': item === null || item === void 0 ? void 0 : item.label, 'select-description': item === null || item === void 0 ? void 0 : item.description });
        }
        return { 'select-tagLabel': item === null || item === void 0 ? void 0 : item.label, 'select-description': item === null || item === void 0 ? void 0 : item.description };
    };
    var newDataList = data === null || data === void 0 ? void 0 : data.list.map(function (item) {
        //如果data?.list是number或者string类型直接返回
        if (isPrimitiveOption(item)) {
            return item;
            //如果data?.list是Option类型需要跟mode进行样式处理
        }
        if (optionMode === 'doubleRow') {
            return tslib_1.__assign(tslib_1.__assign({}, item), { label: renderLabelsForDoubleRow(item), value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
        }
        if (optionMode === 'singleRow') {
            return tslib_1.__assign(tslib_1.__assign({}, item), { label: renderLabelsForSingleRow(item), value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
        }
        return tslib_1.__assign(tslib_1.__assign({}, item), { label: item === null || item === void 0 ? void 0 : item.label, value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
    });
    return newDataList;
};
exports.renderOptions = renderOptions;
/**
 * 获得第一个可选的option，直接返回用户配置的选项
 */
var getAutoLoadFirstValue = function (options, mode) {
    var target = options.find(function (option) { return isPrimitiveOption(option) || !option.disabled; });
    if (!target)
        return undefined;
    if (mode === 'multiple')
        return [target];
    else
        return target;
};
exports.getAutoLoadFirstValue = getAutoLoadFirstValue;
/**
 * 合并两个 option 列表, 重复的 option 保留一个
 */
var mergeOptions = function (initial, cur) {
    // 序列化之后才能正确合并
    var initialStrList = initial.map(function (item) { return (0, fast_json_stable_stringify_1.default)(item); });
    var curStrList = cur.map(function (item) { return (0, fast_json_stable_stringify_1.default)(item); });
    // 只保留不在 cur 中的 initial option
    var finalInitial = initial.filter(function (_, idx) { return !curStrList.includes(initialStrList[idx]); });
    return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(finalInitial), false), tslib_1.__read(cur), false);
};
exports.mergeOptions = mergeOptions;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=util.js.map