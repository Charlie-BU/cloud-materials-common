"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUrlTabKey = exports.getUrlTabKey = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
/**
 *
 * @returns 从url中获取tabKey查询字段
 */
var getUrlTabKey = function (keyName) {
    if (keyName === void 0) { keyName = 'tabKey'; }
    var searchParamsObj = qs_1.default.parse(window.location.search.substring(1));
    return searchParamsObj === null || searchParamsObj === void 0 ? void 0 : searchParamsObj[keyName];
};
exports.getUrlTabKey = getUrlTabKey;
var changeUrlTabKey = function (options) {
    var _a;
    var tabKey = options.tabKey, _b = options.tabKeyName, tabKeyName = _b === void 0 ? 'tabKey' : _b, _c = options.replaceHistory, replaceHistory = _c === void 0 ? false : _c;
    // qs.parse 默认会解析 query 中的数组和对象，但是下面也是用的 qs.stringify，两个的行为是对等的，因此这里不需要主动去关闭这些功能
    var searchParamsObj = qs_1.default.parse(window.location.search.substring(1));
    var finalSearchObj = tslib_1.__assign(tslib_1.__assign({}, searchParamsObj), (_a = {}, _a[tabKeyName] = tabKey, _a));
    var newUrl = "".concat(window.location.pathname, "?").concat(qs_1.default.stringify(finalSearchObj));
    if (replaceHistory) {
        window.history.replaceState(window.history.state, '', newUrl);
    }
    else {
        window.history.pushState(window.history.state, '', newUrl);
    }
};
exports.changeUrlTabKey = changeUrlTabKey;
//# sourceMappingURL=tabKey.js.map