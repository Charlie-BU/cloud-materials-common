export var errorRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(error|fatal).*$/;
export var warningRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(warning).*$/;
export var successRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(success).*$/;
// 手动将 error/warning/success
export var transformAnsi = function (str) {
    var low = str === null || str === void 0 ? void 0 : str.toLowerCase();
    if (errorRegexp.test(low)) {
        return "\u001B[31m".concat(str, "\u001B[m");
    }
    if (warningRegexp.test(low)) {
        return "\u001B[33m".concat(str, "\u001B[m");
    }
    if (successRegexp.test(low)) {
        return "\u001B[32m".concat(str, "\u001B[m");
    }
    return str;
};
/**
 * Escape carrigage returns like a terminal
 * @param {string} txt - String to escape.
 * @return {string}    - Escaped string.
 */
export var escapeCarriageReturn = function (txt) {
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
//# sourceMappingURL=util.js.map