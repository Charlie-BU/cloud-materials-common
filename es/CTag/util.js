import { __assign } from "tslib";
import { transformOpacity } from '../_utils/color';
import { ARCO_COLORS, COLORS, LINEAR_COLORS, TYPES } from './constant';
/**
 * @description 根据 color 及 type 获取 Tag 样式
 */
export function getTagStyle(color, type, shape) {
    if (!color || !type || !TYPES.includes(type)) {
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
        return __assign(__assign({}, commonStyle), arcoStyle);
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
        return __assign(__assign({}, commonStyle), customStyle);
    }
    return __assign(__assign({}, commonStyle), linearStyle);
}
/**
 * @description 转换为 kebab case
 */
export function toKebabCase(originalString) {
    var _a;
    return (_a = originalString === null || originalString === void 0 ? void 0 : originalString.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x.toLowerCase(); }).join('-');
}
/**
 * @description 获取公共样式
 */
export function getCommonStyle(color, type) {
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
                backgroundColor: transformOpacity(themeColor),
                border: 'var(--tag-border)',
                borderColor: transformOpacity(themeColor),
                color: themeColor,
            };
        case 'outline':
            return {
                border: 'var(--tag-border)',
                borderColor: transformOpacity(themeColor),
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
/**
 * @description 根据 color 获取渐变色
 */
export function getLinearStyle(color, type, shape) {
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
            return __assign(__assign({}, baseStyle), { color: 'var(--tag-color-white)' });
        case 'linearGold':
            return __assign(__assign({}, baseStyle), { color: 'var(--tag-color-gold-text)' });
        default:
            return;
    }
}
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
export function isCustomColor(color) {
    return Boolean(color && COLORS.includes(color));
}
/**
 * @description 判断是否为 Arco 内置颜色
 */
export function isArcoColor(color) {
    return Boolean(color && ARCO_COLORS.includes(color));
}
/**
 * @description 判断是否为内置渐变色
 */
export function isLinearColor(color) {
    return Boolean(color && LINEAR_COLORS.includes(color));
}
//# sourceMappingURL=util.js.map