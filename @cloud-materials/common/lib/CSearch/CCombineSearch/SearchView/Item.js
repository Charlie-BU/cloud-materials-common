"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CTag_1 = tslib_1.__importDefault(require("../../../CTag"));
var react_1 = tslib_1.__importStar(require("react"));
var utils_1 = require("../../utils");
var CConfigProvider_1 = require("../../../CConfigProvider");
var InlineItem_1 = tslib_1.__importDefault(require("./InlineItem"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var SearchViewItem = function (props) {
    var _a;
    var _b, _c, _d;
    var value = props.value, item = props.item, alignType = props.alignType, current = props.current, enableEdit = props.enableEdit, updateParams = props.updateParams, updateState = props.updateState, updateTempValue = props.updateTempValue;
    var alignTypeisInline = alignType === 'inline';
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
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
        className: (0, classnames_1.default)((_a = {},
            _a[itemCls] = true,
            _a[getCPrefixCls('search-combine-view-item-nonedit')] = !edit,
            _a)),
        closable: true,
        onClose: onClose,
        onClick: onClick,
    };
    var tagContent = (0, react_1.useMemo)(function () {
        if (typeof item.renderViewItem === 'function') {
            return null;
        }
        return (0, utils_1.transformToString)(value, item);
    }, [value, item]);
    var contentNode = null;
    if (typeof item.renderViewItem === 'function') {
        contentNode = item.renderViewItem(cTagProps, { item: item, value: value, prefixClassName: prefixClassName });
    }
    else {
        contentNode = (react_1.default.createElement(CTag_1.default, tslib_1.__assign({}, cTagProps, { cEllipsisProps: { arcoPopoverProps: { className: "".concat(itemCls, "-pop") } } }),
            !((_d = item.viewItemConfig) === null || _d === void 0 ? void 0 : _d.hiddenLable) && react_1.default.createElement("span", { className: prefixClassName }, "".concat(item.label, "\uFF1A")),
            tagContent));
    }
    if (alignTypeisInline) {
        return (react_1.default.createElement(InlineItem_1.default, tslib_1.__assign({}, props, { itemCls: itemCls }), contentNode));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, contentNode);
};
exports.default = SearchViewItem;
//# sourceMappingURL=Item.js.map