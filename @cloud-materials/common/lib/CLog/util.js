"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeCarriageReturn = exports.transformAnsi = exports.successRegexp = exports.warningRegexp = exports.errorRegexp = void 0;
exports.errorRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(error|fatal).*$/;
exports.warningRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(warning).*$/;
exports.successRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(success).*$/;
// 手动将 error/warning/success
var transformAnsi = function (str) {
    var low = str === null || str === void 0 ? void 0 : str.toLowerCase();
    if (exports.errorRegexp.test(low)) {
        return "\u001B[31m".concat(str, "\u001B[m");
    }
    if (exports.warningRegexp.test(low)) {
        return "\u001B[33m".concat(str, "\u001B[m");
    }
    if (exports.successRegexp.test(low)) {
        return "\u001B[32m".concat(str, "\u001B[m");
    }
    return str;
};
exports.transformAnsi = transformAnsi;
/**
 * Escape carrigage returns like a terminal
 * @param {string} txt - String to escape.
 * @return {string}    - Escaped string.
 */
var escapeCarriageReturn = function (txt) {
    if (!txt)
        return '';
    if (!/\r/.test(txt))
        return txt;
    txt = txt.replace(/\r+\n/gm, '\n'); // \r followed by \n --> newline
    while (/\r./.test(txt)) {
        txt = txt.replace(/^([^\r\n]*)\r+([^\r\n]+)/gm, function (_, base, insert) {
            return insert + base.slice(insert.length);
        });
    }
    return txt;
};
exports.escapeCarriageReturn = escapeCarriageReturn;
//# sourceMappingURL=util.js.map