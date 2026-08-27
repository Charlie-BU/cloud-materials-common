import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { Link, Popover } from '@arco-design/web-react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { ArrayTable } from '@storage-fe/formily-arco';
import { IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import ArrayBase from '@storage-fe/formily-arco/es/ArrayBase';
import classNames from 'classnames';
import { useCConfigContext } from '../../../../CConfigProvider';
import { observer } from '@formily/react';
export var cssPrefix = classNamePrefixFactory('cform-array-remove');
var CArrayRemove = observer(function (props) {
    var _a;
    var _b, _c, _d;
    var _e = props.min, min = _e === void 0 ? 0 : _e, _f = props.type, type = _f === void 0 ? 'icon' : _f, popoverInfo = props.popoverInfo, popoverProps = props.popoverProps, addButtonProps = props.addButtonProps, text = props.text, className = props.className, disabledProps = props.disabled;
    var _g = ArrayBase.useRemove(), removeItem = _g.removeItem, showRemove = _g.showRemove, disabled = _g.disabled, index = _g.index;
    var array = ArrayTable.useArray();
    var _h = useCConfigContext(), _j = _h.size, size = _j === void 0 ? 'default' : _j, locale = _h.locale, formatLocale = _h.formatLocale;
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
    return (React.createElement("div", { className: classNames(className, (_a = {},
            _a[cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])))] = type === 'icon',
            _a["".concat(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), "-size-").concat(size)] = Boolean(size),
            _a)) },
        React.createElement(Popover, __assign({ content: popoverContent, disabled: !disableDelete }, popoverProps),
            React.createElement(Link, __assign({ disabled: disabled || disableDelete || disabledProps, icon: (type === 'both' || type === 'icon') && (React.createElement(IconDelete, { color: disabled || (addButtonProps === null || addButtonProps === void 0 ? void 0 : addButtonProps.disabled) || disabledProps || disableDelete ? '#C7CCD6' : '#41464f' })) }, addButtonProps, { onClick: onRemove }), type === 'both' || type === 'text' ? text || locale.CForm.array.deleteText : ''))));
});
CArrayRemove.displayName = 'CArrayRemove';
export default CArrayRemove;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map