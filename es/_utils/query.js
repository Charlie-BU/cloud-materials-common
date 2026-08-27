import { __assign } from "tslib";
import qs from 'qs';
import { isFunction } from 'lodash-es';
/**
 * 获取当前 url 中的 query
 * @param parseOptions qs parse 的参数
 * @returns
 */
export var getUrlQuery = function (parseOptions) {
    var query = window.location.search;
    var params = qs.parse(query, __assign({ ignoreQueryPrefix: true }, parseOptions));
    return params;
};
/**
 * 设置 url 中的 query
 * @param params 要设置的新 query 参数
 * @param options
 */
export var setUrlQuery = function (params, options) {
    var _a = options || {}, _b = _a.merge, merge = _b === void 0 ? true : _b, stringifyOptions = _a.stringifyOptions, _c = _a.method, method = _c === void 0 ? 'replaceState' : _c, _newState = _a.newState, genNewUrl = _a.genNewUrl;
    // 以当前的 url query 为基准，然后用新的 query 覆写现有的参数，避免整体替换 query
    var currentParams = getUrlQuery();
    // 合并当前查询参数对象和新的查询参数对象
    var newParams = merge ? Object.assign({}, currentParams, params) : params;
    // 将新的查询参数对象序列化为查询参数字符串
    var newQuery = qs.stringify(newParams, __assign({}, stringifyOptions));
    // 构建新的 URL
    var newUrl = "".concat(window.location.pathname, "?").concat(newQuery).concat(window.location.hash || '');
    // 最终的 URL
    var url = genNewUrl ? genNewUrl(newUrl, newParams, newQuery) : newUrl;
    // 生成新的状态
    var currentState = history.state;
    var newState = isFunction(_newState) ? _newState(currentState) : _newState;
    var state = newState !== null && newState !== void 0 ? newState : currentState;
    if (method === 'replaceState') {
        history.replaceState(state, '', url);
    }
    else {
        history.pushState(state, '', url);
    }
    return { url: url, newParams: newParams, newQuery: newQuery, state: state };
};
//# sourceMappingURL=query.js.map