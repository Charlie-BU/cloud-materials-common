"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyle = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var const_1 = require("./const");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('status');
function getStyle(props) {
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
    if (const_1.BorderType.includes(type) && (borderColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.borderColor))) {
        realStyle.border = "1px solid ".concat(borderColor || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.borderColor));
    }
    if (color || (selectMap === null || selectMap === void 0 ? void 0 : selectMap.color)) {
        realStyle.color = color || selectMap.color;
    }
    return tslib_1.__assign(tslib_1.__assign({}, realStyle), style);
}
exports.getStyle = getStyle;
//# sourceMappingURL=utils.js.map