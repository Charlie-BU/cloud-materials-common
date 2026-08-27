"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRGBA = exports.transformOpacity = void 0;
var tslib_1 = require("tslib");
/**
 * @description 转换颜色透明度
 */
function transformOpacity(colorString, opacity) {
    if (opacity === void 0) { opacity = 0.2; }
    var _colorString = colorString;
    // 16 进制颜色补全
    if (/^#[A-Fa-f0-9]{3}$/g.test(_colorString)) {
        var _a = tslib_1.__read(_colorString.split('')), hash = _a[0], characters = _a.slice(1);
        _colorString = "".concat(hash).concat(characters.map(function (character) { return character.repeat(2); }).join(''));
    }
    // 16 进制颜色加透明度
    if (/^#[A-Fa-f0-9]{6}$/g.test(_colorString)) {
        return "".concat(_colorString).concat(Math.round(255 * opacity)
            .toString(16)
            .padStart(2, '0'));
    }
    return toRGBA(_colorString, opacity);
}
exports.transformOpacity = transformOpacity;
/**
 * @description 转换为 RGBA 颜色
 */
function toRGBA(colorString, opacity) {
    var _a;
    if (opacity === void 0) { opacity = 0.2; }
    var _b = tslib_1.__read(((_a = colorString.match(/\d+|(\d+\.\d+)/g)) === null || _a === void 0 ? void 0 : _a.map(Number)) || [], 3), red = _b[0], green = _b[1], blue = _b[2];
    return "rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(opacity, ")");
}
exports.toRGBA = toRGBA;
//# sourceMappingURL=color.js.map