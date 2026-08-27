export * from './lifeCycle';
export * from './component';
export var TableMode;
(function (TableMode) {
    TableMode["LOCAL"] = "local";
    TableMode["REMOTE"] = "remote";
    TableMode["LOAD_MORE"] = "loadMore";
})(TableMode || (TableMode = {}));
export var FetchTypes;
(function (FetchTypes) {
    FetchTypes["INIT"] = "init";
    FetchTypes["CHANGE_PAGE"] = "changePage";
    FetchTypes["REFRESH"] = "refresh";
    FetchTypes["SORT"] = "sort";
    FetchTypes["FILTER"] = "filter";
    FetchTypes["LOAD_MORE"] = "loadMore";
})(FetchTypes || (FetchTypes = {}));
// 现阶段只有数据请求会导致 table 状态改变
// 由于 ts 无法将 enum 赋值为另一个变量，这里重复写了一遍 FetchTypes 的内容
export var StatusChangeReason;
(function (StatusChangeReason) {
    StatusChangeReason["INIT"] = "init";
    StatusChangeReason["CHANGE_PAGE"] = "changePage";
    StatusChangeReason["REFRESH"] = "refresh";
    StatusChangeReason["SORT"] = "sort";
    StatusChangeReason["FILTER"] = "filter";
    StatusChangeReason["LOAD_MORE"] = "loadMore";
})(StatusChangeReason || (StatusChangeReason = {}));
//# sourceMappingURL=index.js.map