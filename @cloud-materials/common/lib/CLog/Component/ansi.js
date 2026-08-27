"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var anser_1 = tslib_1.__importDefault(require("anser"));
var lodash_es_1 = require("lodash-es");
var util_1 = require("../util");
/**
 * Converts ANSI strings into JSON output.
 * @name ansiToJSON
 * @function
 * @param {String} input The input string.
 * @param {boolean} use_classes If `true`, HTML classes will be appended
 *                              to the HTML output.
 * @return {Array} The parsed input.
 */
function ansiToJSON(input) {
    input = (0, util_1.escapeCarriageReturn)(fixBackspace(input));
    return anser_1.default.ansiToJson(input, {
        json: true,
        remove_empty: true,
        use_classes: false,
    });
}
/**
 * Create the style attribute.
 * @name createStyle
 * @function
 * @param {AnserJsonEntry} bundle
 * @return {Object} returns the style object
 */
function createStyle(bundle) {
    var style = {};
    if (bundle.bg) {
        style.backgroundColor = "rgb(".concat(bundle.bg, ")");
    }
    if (bundle.fg) {
        style.color = "rgb(".concat(bundle.fg, ")");
    }
    return style;
}
/**
 * Converts an Anser bundle into a React Node.
 * @param linkify whether links should be converting into clickable anchor tags.
 * @param useClasses should render the span with a class instead of style.
 * @param bundle Anser output.
 * @param key
 */
function convertBundleIntoReact(searchText, bundle, key) {
    var style = tslib_1.__assign(tslib_1.__assign({}, createStyle(bundle)), { wordBreak: 'break-all' });
    if (!searchText) {
        return react_1.default.createElement('span', { style: style, key: key }, bundle.content);
    }
    var content = [];
    var searchRegex = new RegExp((0, lodash_es_1.escapeRegExp)(searchText), 'ig');
    var index = 0;
    var match;
    while ((match = searchRegex.exec(bundle.content)) !== null) {
        var startIndex = match.index;
        if (startIndex > index) {
            content.push(bundle.content.substring(index, startIndex));
        }
        // Make sure the href we generate from the link is fully qualified. We assume http
        // if it starts with a www because many sites don't support https
        content.push(react_1.default.createElement('span', {
            key: index,
            style: { backgroundColor: '#A2C1FF', fontWeight: 700, color: '#0c0d0e' },
        }, searchText));
        index = searchRegex.lastIndex;
    }
    if (index < bundle.content.length) {
        content.push(bundle.content.substring(index));
    }
    return react_1.default.createElement('span', { style: tslib_1.__assign(tslib_1.__assign({}, style), { wordBreak: 'break-all' }), key: key }, content);
}
function Ansi(props) {
    var className = props.className, children = props.children, searchText = props.searchText;
    return react_1.default.createElement('code', { className: className }, ansiToJSON(children !== null && children !== void 0 ? children : '').map(convertBundleIntoReact.bind(null, searchText !== null && searchText !== void 0 ? searchText : '')));
}
exports.default = Ansi;
// This is copied from the Jupyter Classic source code
// notebook/static/base/js/utils.js to handle \b in a way
// that is **compatible with Jupyter classic**.   One can
// argue that this behavior is questionable:
//   https://stackoverflow.com/questions/55440152/multiple-b-doesnt-work-as-expected-in-jupyter#
function fixBackspace(txt) {
    var tmp = txt;
    do {
        txt = tmp;
        // Cancel out anything-but-newline followed by backspace
        tmp = txt.replace(/[^\n]\x08/gm, '');
    } while (tmp.length < txt.length);
    return txt;
}
//# sourceMappingURL=ansi.js.map