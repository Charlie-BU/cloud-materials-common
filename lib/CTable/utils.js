"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryToNumber = exports.loadScript = exports.fallbackText = exports.isEmpty = exports.isEmptyValue = exports.getTextWidth = exports.filterDataKey = exports.setGlobalFontSize = exports.TableFontSize = void 0;
exports.TableFontSize = {
    CN: '12px',
    US: '14px',
};
var GLOBAL_FONT_SIZE = exports.TableFontSize.CN;
/**
 * @description 支持bytePlus环境下英文大小为14px
 * @param fontSize String
 */
var setGlobalFontSize = function (fontSize) {
    GLOBAL_FONT_SIZE = fontSize;
};
exports.setGlobalFontSize = setGlobalFontSize;
function filterDataKey(str) {
    var _a, _b;
    // str 可能不是字符，避免报错
    var key = (_a = str === null || str === void 0 ? void 0 : str.toString) === null || _a === void 0 ? void 0 : _a.call(str);
    return ((_b = key === null || key === void 0 ? void 0 : key.replace) === null || _b === void 0 ? void 0 : _b.call(key, /\W/g, '')) || 'default'; // 如果为空的key则转化成default
}
exports.filterDataKey = filterDataKey;
var getCssStyle = function (element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
};
var getBodyFont = function () {
    var fontWeight = getCssStyle(document.body, 'font-weight') || 'normal';
    // const fontSize = getCssStyle(document.body, 'font-size') || '12px';
    /**
     * 1. 在 vestack 子应用中获取不到比较准确的 body style
     * 2. 在火山中，cell 里面的字体大小和 body 也不太一样，body 为 14px，cell 为 13px，因此这里暂时写死为 13px
     * 2023-5-5 更新 Table 内部的文字大小改为 12px
     */
    var fontSize = GLOBAL_FONT_SIZE;
    var fontFamily = getCssStyle(document.body, 'font-family') || 'Helvetica';
    return "".concat(fontWeight, " ").concat(fontSize, " ").concat(fontFamily);
};
// 全局使用同一个 canvas 来获取字体的宽度，优化性能
var helperCanvas = document.createElement('canvas');
// 缓存 body 的 font，避免重复获取 body 的字体
var cachedBodyFont;
var getTextWidth = function (text, font) {
    if (text === undefined || text === null) {
        return 0;
    }
    if (!cachedBodyFont) {
        // 延迟到具体调用的时候再获取字体，如果在模块的全局执行，在统一平台中，获取到的字体不对
        cachedBodyFont = getBodyFont();
    }
    var context = helperCanvas.getContext('2d');
    context.font = font || cachedBodyFont;
    var metrics = context.measureText(text);
    return metrics.width;
};
exports.getTextWidth = getTextWidth;
/** 判断值是否是空值，比如在表单判断一个Input是否有输入*/
function isEmptyValue(value) {
    if (value === undefined || value === '')
        return true;
    return false;
}
exports.isEmptyValue = isEmptyValue;
var isEmpty = function (value) {
    return value === '' || value === undefined || value === null || Number.isNaN(value);
};
exports.isEmpty = isEmpty;
/** 对空值做些文本的兜底显示 */
function fallbackText(value) {
    return (0, exports.isEmpty)(value) ? '-' : value;
}
exports.fallbackText = fallbackText;
/** 加载脚本 */
function loadScript(url, cb) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = cb;
    document.body.appendChild(script);
}
exports.loadScript = loadScript;
/** 尝试把字符串转成数字， 如果失败就返回原字符串 */
function tryToNumber(numberString) {
    var num = Number(numberString);
    if (Number.isNaN(num))
        return numberString;
    return num;
}
exports.tryToNumber = tryToNumber;
//# sourceMappingURL=utils.js.map