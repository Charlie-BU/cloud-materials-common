"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusChangeReason = exports.FetchTypes = exports.TableMode = void 0;
var tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lifeCycle"), exports);
tslib_1.__exportStar(require("./component"), exports);
var TableMode;
(function (TableMode) {
    TableMode["LOCAL"] = "local";
    TableMode["REMOTE"] = "remote";
    TableMode["LOAD_MORE"] = "loadMore";
})(TableMode = exports.TableMode || (exports.TableMode = {}));
var FetchTypes;
(function (FetchTypes) {
    FetchTypes["INIT"] = "init";
    FetchTypes["CHANGE_PAGE"] = "changePage";
    FetchTypes["REFRESH"] = "refresh";
    FetchTypes["SORT"] = "sort";
    FetchTypes["FILTER"] = "filter";
    FetchTypes["LOAD_MORE"] = "loadMore";
})(FetchTypes = exports.FetchTypes || (exports.FetchTypes = {}));
// 现阶段只有数据请求会导致 table 状态改变
// 由于 ts 无法将 enum 赋值为另一个变量，这里重复写了一遍 FetchTypes 的内容
var StatusChangeReason;
(function (StatusChangeReason) {
    StatusChangeReason["INIT"] = "init";
    StatusChangeReason["CHANGE_PAGE"] = "changePage";
    StatusChangeReason["REFRESH"] = "refresh";
    StatusChangeReason["SORT"] = "sort";
    StatusChangeReason["FILTER"] = "filter";
    StatusChangeReason["LOAD_MORE"] = "loadMore";
})(StatusChangeReason = exports.StatusChangeReason || (exports.StatusChangeReason = {}));
//# sourceMappingURL=index.js.map