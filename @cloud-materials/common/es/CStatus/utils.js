import { __assign } from "tslib";
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { BorderType } from './const';
export var cssPrefix = classNamePrefixFactory('status');
export function getStyle(props) {
    var _a = props.type, type = _a === void 0 ? 'normal' : _a, status = props.status, statusName = props.statusName, tagColor = props.tagColor, highlightColor = props.highlightColor, borderColor = props.borderColor, style = props.style, color = props.color, statusMap = props.statusMap, waitColor = props.waitColor;
    var _status = status === 'wait' && waitColor === 'blue' ? 'loading' : status;
    var selectMap = statusName ? statusMap[statusName] : {};
    var typeStyle = {
        heavy: {
            backgroundColor: "var(--heavy-bg)",
            border: "1px solid var(--disable-border)",
            color: "var(--heavy-color)",
        },
        tag: {
            backgroundColor: tagColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.tagColor) || "var(--".concat(_status, "-tag-bg)"),
            border: "1px solid var(--".concat(_status, "-border)"),
            color: "var(--".concat(_status, "-ht-color)"),
        },
        border: {
            border: "1px solid var(--".concat(_status, "-border)"),
            color: "var(--".concat(_status, "-nbd-color)"),
        },
        highlight: {
            backgroundColor: highlightColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.highlightColor) || "var(--".concat(_status, "-highlight-bg)"),
            color: "var(--".concat(_status, "-ht-color)"),
        },
        dot: {
            color: "var(--".concat(_status, "-nbd-color)"),
        },
        normal: {
            color: "var(--".concat(_status, "-nbd-color)"),
        },
    };
    var realStyle = typeStyle[type];
    if (BorderType.includes(type) && (borderColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.borderColor))) {
        realStyle.border = "1px solid ".concat(borderColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.borderColor));
    }
    if (color || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.color)) {
        realStyle.color = color || selectMap.color;
    }
    return __assign(__assign({}, realStyle), style);
}
//# sourceMappingURL=utils.js.map