import { __assign } from "tslib";
import CTag from '../../../CTag';
import React, { useMemo } from 'react';
import { transformToString } from '../../utils';
import { useCConfigContext } from '../../../CConfigProvider';
import InlineItem from './InlineItem';
import classNames from 'classnames';
var SearchViewItem = function (props) {
    var _a;
    var _b, _c, _d;
    var value = props.value, item = props.item, alignType = props.alignType, current = props.current, enableEdit = props.enableEdit, updateParams = props.updateParams, updateState = props.updateState, updateTempValue = props.updateTempValue;
    var alignTypeisInline = alignType === 'inline';
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var itemCls = getCPrefixCls('search-combine-view-item');
    var prefixClassName = "".concat(itemCls, "-prefix");
    var edit = ((_c = (_b = item.viewItemConfig) === null || _b === void 0 ? void 0 : _b.enableEdit) !== null && _c !== void 0 ? _c : enableEdit) !== false;
    var onClose = function (e) {
        var _a;
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        updateParams((_a = {}, _a[item.fieldName] = undefined, _a));
        if ((current === null || current === void 0 ? void 0 : current.fieldName) === item.fieldName) {
            updateState('default', null);
        }
    };
    var onClick = function () {
        if (!alignTypeisInline && edit) {
            updateState('value', item);
            updateTempValue(value);
        }
    };
    var cTagProps = {
        className: classNames((_a = {},
            _a[itemCls] = true,
            _a[getCPrefixCls('search-combine-view-item-nonedit')] = !edit,
            _a)),
        closable: true,
        onClose: onClose,
        onClick: onClick,
    };
    var tagContent = useMemo(function () {
        if (typeof item.renderViewItem === 'function') {
            return null;
        }
        return transformToString(value, item);
    }, [value, item]);
    var contentNode = null;
    if (typeof item.renderViewItem === 'function') {
        contentNode = item.renderViewItem(cTagProps, { item: item, value: value, prefixClassName: prefixClassName });
    }
    else {
        contentNode = (React.createElement(CTag, __assign({}, cTagProps, { cEllipsisProps: { arcoPopoverProps: { className: "".concat(itemCls, "-pop") } } }),
            !((_d = item.viewItemConfig) === null || _d === void 0 ? void 0 : _d.hiddenLable) && React.createElement("span", { className: prefixClassName }, "".concat(item.label, "\uFF1A")),
            tagContent));
    }
    if (alignTypeisInline) {
        return (React.createElement(InlineItem, __assign({}, props, { itemCls: itemCls }), contentNode));
    }
    return React.createElement(React.Fragment, null, contentNode);
};
export default SearchViewItem;
//# sourceMappingURL=Item.js.map