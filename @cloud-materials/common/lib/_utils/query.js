"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUrlQuery = exports.getUrlQuery = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var lodash_es_1 = require("lodash-es");
/**
 * 获取当前 url 中的 query
 * @param parseOptions qs parse 的参数
 * @returns
 */
var getUrlQuery = function (parseOptions) {
    var query = window.location.search;
    var params = qs_1.default.parse(query, tslib_1.__assign({ ignoreQueryPrefix: true }, parseOptions));
    return params;
};
exports.getUrlQuery = getUrlQuery;
/**
 * 设置 url 中的 query
 * @param params 要设置的新 query 参数
 * @param options
 */
var setUrlQuery = function (params, options) {
    var _a = options || {}, _b = _a.merge, merge = _b === void 0 ? true : _b, stringifyOptions = _a.stringifyOptions, _c = _a.method, method = _c === void 0 ? 'replaceState' : _c, _newState = _a.newState, genNewUrl = _a.genNewUrl;
    // 以当前的 url query 为基准，然后用新的 query 覆写现有的参数，避免整体替换 query
    var currentParams = (0, exports.getUrlQuery)();
    // 合并当前查询参数对象和新的查询参数对象
    var newParams = merge ? Object.assign({}, currentParams, params) : params;
    // 将新的查询参数对象序列化为查询参数字符串
    var newQuery = qs_1.default.stringify(newParams, tslib_1.__assign({}, stringifyOptions));
    // 构建新的 URL
    var newUrl = "".concat(window.location.pathname, "?").concat(newQuery).concat(window.location.hash || '');
    // 最终的 URL
    var url = genNewUrl ? genNewUrl(newUrl, newParams, newQuery) : newUrl;
    // 生成新的状态
    var currentState = history.state;
    var newState = (0, lodash_es_1.isFunction)(_newState) ? _newState(currentState) : _newState;
    var state = newState !== null && newState !== void 0 ? newState : currentState;
    if (method === 'replaceState') {
        history.replaceState(state, '', url);
    }
    else {
        history.pushState(state, '', url);
    }
    return { url: url, newParams: newParams, newQuery: newQuery, state: state };
};
exports.setUrlQuery = setUrlQuery;
//# sourceMappingURL=query.js.map