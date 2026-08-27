import { __assign, __makeTemplateObject, __read, __spreadArray } from "tslib";
import { Popover, Spin, Tag } from '@arco-design/web-react';
import stringify from 'fast-json-stable-stringify';
import React from 'react';
import CEllipsis from '../CEllipsis';
import { testId } from './dataCy';
import { isNumber, isObject } from 'lodash-es';
import CCopy from '../CCopy';
export var loadingSpin = function (loading) { return (React.createElement(Spin, { size: 20, style: {
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
var renderToolTipContent = function (_a) {
    var item = _a.item, cssPrefix = _a.cssPrefix, locale = _a.locale, isTextOverflow = _a.isTextOverflow, value = _a.value;
    if ((!item || !item['select-tagLabel']) && value) {
        return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": testId.tooltipLabelId }, value));
    }
    if (!!(item === null || item === void 0 ? void 0 : item.disabled)) {
        return (React.createElement("div", null,
            isTextOverflow && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": testId.tooltipLabelId }, (item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item['select-tagLabel'])),
                React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["tooltip-des"], ["tooltip-des"]))), "data-testid": testId.tooltipDesId }, (item === null || item === void 0 ? void 0 : item.description) || (item === null || item === void 0 ? void 0 : item['select-description'])))),
            (item === null || item === void 0 ? void 0 : item.disabledTooltipContent) && (React.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["tooltip-des"], ["tooltip-des"]))) },
                locale.CAsyncSelect.disabledReason,
                "\uFF1A", item === null || item === void 0 ? void 0 :
                item.disabledTooltipContent))));
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["tooltip-label"], ["tooltip-label"]))), "data-testid": testId.tooltipLabelId }, (item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item['select-tagLabel'])),
        React.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["tooltip-des"], ["tooltip-des"]))), "data-testid": testId.tooltipDesId }, (item === null || item === void 0 ? void 0 : item.description) || (item === null || item === void 0 ? void 0 : item['select-description']))));
};
var renderToolTipContentMaxTag = function (needShowExtraOptions, cssPrefix, locale) {
    var needShowExtraLabels = needShowExtraOptions.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.extra) === null || _a === void 0 ? void 0 : _a['select-tagLabel']; });
    return (React.createElement("div", { onClick: function (e) { return e.stopPropagation(); } },
        React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["tag-label"], ["tag-label"]))) }, needShowExtraLabels.map(function (item) {
            var _a;
            return (React.createElement(CEllipsis, { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["tag-label-div"], ["tag-label-div"]))), showPopover: false, suffix: React.createElement(CCopy, { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: item }), key: (item === null || item === void 0 ? void 0 : item.value) || ((_a = item === null || item === void 0 ? void 0 : item.extra) === null || _a === void 0 ? void 0 : _a['select-tagLabel']) },
                React.createElement("span", null, item)));
        })),
        React.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["tag-label-copy-div"], ["tag-label-copy-div"]))) },
            React.createElement(CCopy, { text: needShowExtraLabels.join(', ') },
                React.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["tag-label-copy-content"], ["tag-label-copy-content"]))) }, locale.CAsyncSelect.copyAll)),
            React.createElement("span", { className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["tag-label-count"], ["tag-label-count"]))) }, "".concat(needShowExtraLabels === null || needShowExtraLabels === void 0 ? void 0 : needShowExtraLabels.length).concat(locale.CAsyncSelect.items)))));
};
export var defaultRenderTag = function (selectedOptions, tagProps, cssPrefix, index, showMaxTagToolTip, locale, maxTagCount, prefixCls) {
    var label = tagProps.label, value = tagProps.value, onClose = tagProps.onClose;
    var isMaxTagLabel = false;
    var needShowExtraOptions = [];
    if (!!maxTagCount) {
        var maxTagCountNumber = isObject(maxTagCount) ? maxTagCount.count : maxTagCount;
        if (isNumber(maxTagCountNumber)) {
            // arco 2.62.0 版本新增 'responsive' 能力，本组件暂时不支持该特性下的tooltip展示
            isMaxTagLabel = index >= maxTagCountNumber;
            if (isMaxTagLabel && Array.isArray(selectedOptions)) {
                needShowExtraOptions = selectedOptions.slice(maxTagCountNumber);
            }
        }
    }
    if (isMaxTagLabel) {
        if (showMaxTagToolTip) {
            return (React.createElement(Popover, { content: renderToolTipContentMaxTag(needShowExtraOptions, cssPrefix, locale), position: 'top', triggerProps: { style: { width: 380 } } },
                React.createElement(Tag, { closable: false, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag"), "data-testid": testId.maxTagId }, label || value)));
        }
        return (React.createElement(Tag, { closable: false, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag") }, label || value));
    }
    else {
        return (React.createElement(Popover, { content: renderToolTipContent({ item: label, cssPrefix: cssPrefix, locale: locale, value: value }), position: 'right' },
            React.createElement(Tag, { closable: true, onClose: onClose, className: "".concat(prefixCls, "-input-tag-tag") }, (label === null || label === void 0 ? void 0 : label['select-tagLabel']) || value)));
    }
};
function isPrimitiveOption(option) {
    return typeof option === 'string' || typeof option === 'number';
}
/**
 * 渲染Option的方法
 */
export var renderOptions = function (data, cssPrefix, locale, optionMode, enableCopy) {
    //如果数据结构异常，返回空数组
    if (!data || !data.list)
        return [];
    //下面的逻辑都是data?.list是Option[]类型的
    var renderLabelsForSingleRow = function (item) {
        return (React.createElement("div", { className: enableCopy ? cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["option-ellipsis"], ["option-ellipsis"]))) : '' },
            React.createElement(CEllipsis, { arcoPopoverProps: {
                    position: 'right',
                }, popoverContent: function (isTextOverflow) { return renderToolTipContent({ item: item, cssPrefix: cssPrefix, locale: locale, isTextOverflow: isTextOverflow }); }, showPopover: ((item === null || item === void 0 ? void 0 : item.disabled) && !!(item === null || item === void 0 ? void 0 : item.disabledTooltipContent)) || 'auto' },
                React.createElement("span", null,
                    React.createElement("span", { className: cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["single-label"], ["single-label"]))), "data-testid": testId.singleLabelId }, item === null || item === void 0 ? void 0 : item.label),
                    React.createElement("span", { className: cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["single-des"], ["single-des"]))), "data-testid": testId.singleDesId }, item === null || item === void 0 ? void 0 : item.description))),
            enableCopy && React.createElement(CCopy, { className: cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: ((item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item.value)) })));
    };
    var renderLabelsForDoubleRow = function (item) {
        return (React.createElement("div", { className: enableCopy ? cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["option-ellipsis-double"], ["option-ellipsis-double"]))) : '' },
            React.createElement(CEllipsis, { arcoPopoverProps: {
                    position: 'right',
                }, popoverContent: function (isTextOverflow) { return renderToolTipContent({ item: item, cssPrefix: cssPrefix, locale: locale, isTextOverflow: isTextOverflow }); }, className: cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["ellipsis"], ["ellipsis"]))), showPopover: ((item === null || item === void 0 ? void 0 : item.disabled) && !!(item === null || item === void 0 ? void 0 : item.disabledTooltipContent)) || 'auto' },
                React.createElement("span", null,
                    React.createElement("span", { className: cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["double-label"], ["double-label"]))), "data-testid": testId.doubleLabelId }, item === null || item === void 0 ? void 0 : item.label),
                    React.createElement("span", { className: cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["double-des"], ["double-des"]))), "data-testid": testId.doubleDesId }, item === null || item === void 0 ? void 0 : item.description))),
            enableCopy && React.createElement(CCopy, { className: cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["tag-label-copy"], ["tag-label-copy"]))), text: ((item === null || item === void 0 ? void 0 : item.label) || (item === null || item === void 0 ? void 0 : item.value)) })));
    };
    var recombinationExtra = function (item) {
        if (item === null || item === void 0 ? void 0 : item.extra) {
            return __assign(__assign({}, item.extra), { 'select-tagLabel': item === null || item === void 0 ? void 0 : item.label, 'select-description': item === null || item === void 0 ? void 0 : item.description });
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
            return __assign(__assign({}, item), { label: renderLabelsForDoubleRow(item), value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
        }
        if (optionMode === 'singleRow') {
            return __assign(__assign({}, item), { label: renderLabelsForSingleRow(item), value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
        }
        return __assign(__assign({}, item), { label: item === null || item === void 0 ? void 0 : item.label, value: item === null || item === void 0 ? void 0 : item.value, disabled: item === null || item === void 0 ? void 0 : item.disabled, extra: recombinationExtra(item) });
    });
    return newDataList;
};
/**
 * 获得第一个可选的option，直接返回用户配置的选项
 */
export var getAutoLoadFirstValue = function (options, mode) {
    var target = options.find(function (option) { return isPrimitiveOption(option) || !option.disabled; });
    if (!target)
        return undefined;
    if (mode === 'multiple')
        return [target];
    else
        return target;
};
/**
 * 合并两个 option 列表, 重复的 option 保留一个
 */
export var mergeOptions = function (initial, cur) {
    // 序列化之后才能正确合并
    var initialStrList = initial.map(function (item) { return stringify(item); });
    var curStrList = cur.map(function (item) { return stringify(item); });
    // 只保留不在 cur 中的 initial option
    var finalInitial = initial.filter(function (_, idx) { return !curStrList.includes(initialStrList[idx]); });
    return __spreadArray(__spreadArray([], __read(finalInitial), false), __read(cur), false);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
//# sourceMappingURL=util.js.map