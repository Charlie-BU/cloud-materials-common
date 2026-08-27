"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var formily_arco_1 = require("@storage-fe/formily-arco");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var ArrayBase_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/ArrayBase"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
var react_2 = require("@formily/react");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-array-remove');
var CArrayRemove = (0, react_2.observer)(function (props) {
    var _a;
    var _b, _c, _d;
    var _e = props.min, min = _e === void 0 ? 0 : _e, _f = props.type, type = _f === void 0 ? 'icon' : _f, popoverInfo = props.popoverInfo, popoverProps = props.popoverProps, addButtonProps = props.addButtonProps, text = props.text, className = props.className, disabledProps = props.disabled;
    var _g = ArrayBase_1.default.useRemove(), removeItem = _g.removeItem, showRemove = _g.showRemove, disabled = _g.disabled, index = _g.index;
    var array = formily_arco_1.ArrayTable.useArray();
    var _h = (0, CConfigProvider_1.useCConfigContext)(), _j = _h.size, size = _j === void 0 ? 'default' : _j, locale = _h.locale, formatLocale = _h.formatLocale;
    if (!showRemove)
        return null;
    var currentCount = (_d = (_c = (_b = array === null || array === void 0 ? void 0 : array.field) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
    var disableDelete = currentCount <= min;
    var popoverContent;
    if (typeof popoverInfo === 'function') {
        popoverContent = popoverInfo(currentCount);
    }
    else if (typeof popoverInfo === 'string') {
        popoverContent = popoverInfo.replace('${count}', "".concat(min));
    }
    else {
        popoverContent = formatLocale(locale.CForm.array.lessCountText, { count: min });
    }
    var onRemove = function () {
        var _a;
        removeItem();
        (_a = props === null || props === void 0 ? void 0 : props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, index);
    };
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(className, (_a = {},
            _a[(0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])))] = type === 'icon',
            _a["".concat((0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), "-size-").concat(size)] = Boolean(size),
            _a)) },
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ content: popoverContent, disabled: !disableDelete }, popoverProps),
            react_1.default.createElement(web_react_1.Link, tslib_1.__assign({ disabled: disabled || disableDelete || disabledProps, icon: (type === 'both' || type === 'icon') && (react_1.default.createElement(iconbox_react_ve_o_design_1.IconDelete, { color: disabled || (addButtonProps === null || addButtonProps === void 0 ? void 0 : addButtonProps.disabled) || disabledProps || disableDelete ? '#C7CCD6' : '#41464f' })) }, addButtonProps, { onClick: onRemove }), type === 'both' || type === 'text' ? text || locale.CForm.array.deleteText : ''))));
});
CArrayRemove.displayName = 'CArrayRemove';
exports.default = CArrayRemove;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map