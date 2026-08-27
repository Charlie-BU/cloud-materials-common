"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLinearColor = exports.isArcoColor = exports.isCustomColor = exports.getLinearStyle = exports.getCommonStyle = exports.toKebabCase = exports.getTagStyle = void 0;
var tslib_1 = require("tslib");
var color_1 = require("../_utils/color");
var constant_1 = require("./constant");
/**
 * @description 根据 color 及 type 获取 Tag 样式
 */
function getTagStyle(color, type, shape) {
    if (!color || !type || !constant_1.TYPES.includes(type)) {
        return;
    }
    var linearStyle = getLinearStyle(color, type, shape);
    var commonStyle = getCommonStyle(color, type);
    // Arco 内置颜色重写样式
    if (isArcoColor(color)) {
        var arcoStyle = {
            bordered: {
                borderColor: "var(--tag-arco-color-".concat(color, "-20-pct)"),
            },
            outline: {
                backgroundColor: 'var(--tag-color-transparent)',
                borderColor: "var(--tag-arco-color-".concat(color, "-20-pct)"),
            },
        }[type];
        return tslib_1.__assign(tslib_1.__assign({}, commonStyle), arcoStyle);
    }
    // 内置颜色
    if (isCustomColor(color)) {
        var customStyle = {
            bordered: {
                backgroundColor: "rgba(var(--tag-color-".concat(color, "), 0.2)"),
                borderColor: "rgba(var(--tag-color-".concat(color, "), 0.2)"),
            },
            outline: {
                borderColor: "rgba(var(--tag-color-".concat(color, "), 0.2)"),
            },
        }[type];
        return tslib_1.__assign(tslib_1.__assign({}, commonStyle), customStyle);
    }
    return tslib_1.__assign(tslib_1.__assign({}, commonStyle), linearStyle);
}
exports.getTagStyle = getTagStyle;
/**
 * @description 转换为 kebab case
 */
function toKebabCase(originalString) {
    var _a;
    return (_a = originalString === null || originalString === void 0 ? void 0 : originalString.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x.toLowerCase(); }).join('-');
}
exports.toKebabCase = toKebabCase;
/**
 * @description 获取公共样式
 */
function getCommonStyle(color, type) {
    var themeColor = getThemeColor(color);
    if (isLinearColor(color)) {
        return;
    }
    switch (type) {
        case 'default':
            return {
                backgroundColor: themeColor,
                color: 'var(--tag-color-white)',
            };
        case 'bordered':
            return {
                backgroundColor: (0, color_1.transformOpacity)(themeColor),
                border: 'var(--tag-border)',
                borderColor: (0, color_1.transformOpacity)(themeColor),
                color: themeColor,
            };
        case 'outline':
            return {
                border: 'var(--tag-border)',
                borderColor: (0, color_1.transformOpacity)(themeColor),
                color: themeColor,
            };
        case 'text':
        case 'text-dot':
            return {
                backgroundColor: 'var(--tag-color-transparent)',
                border: 'var(--tag-border-none)',
                color: themeColor,
            };
        default:
            return;
    }
}
exports.getCommonStyle = getCommonStyle;
/**
 * @description 根据 color 获取渐变色
 */
function getLinearStyle(color, type, shape) {
    if (!shape || type !== 'default') {
        return;
    }
    var baseStyle = {
        backgroundImage: "var(--tag-color-".concat(toKebabCase(color), ")"),
        border: '1px solid transparent',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'padding-box, border-box',
    };
    switch (color) {
        case 'linearRed':
        case 'linearOrangered':
            return tslib_1.__assign(tslib_1.__assign({}, baseStyle), { color: 'var(--tag-color-white)' });
        case 'linearGold':
            return tslib_1.__assign(tslib_1.__assign({}, baseStyle), { color: 'var(--tag-color-gold-text)' });
        default:
            return;
    }
}
exports.getLinearStyle = getLinearStyle;
/**
 * @description 根据 color 获取颜色
 */
function getThemeColor(color) {
    if (isArcoColor(color)) {
        return "var(--tag-arco-color-".concat(color, ")");
    }
    if (isCustomColor(color)) {
        return "rgb(var(--tag-color-".concat(color, "))");
    }
    return color;
}
/**
 * @description 判断是否为内置颜色
 */
function isCustomColor(color) {
    return Boolean(color && constant_1.COLORS.includes(color));
}
exports.isCustomColor = isCustomColor;
/**
 * @description 判断是否为 Arco 内置颜色
 */
function isArcoColor(color) {
    return Boolean(color && constant_1.ARCO_COLORS.includes(color));
}
exports.isArcoColor = isArcoColor;
/**
 * @description 判断是否为内置渐变色
 */
function isLinearColor(color) {
    return Boolean(color && constant_1.LINEAR_COLORS.includes(color));
}
exports.isLinearColor = isLinearColor;
//# sourceMappingURL=util.js.map