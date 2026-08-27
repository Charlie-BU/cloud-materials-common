"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCLog = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var CConfigProvider_1 = require("../CConfigProvider");
var lodash_es_1 = require("lodash-es");
var useDownload_1 = require("../hooks/useDownload");
var web_react_1 = require("@arco-design/web-react");
var useCLog = function (props, listRef) {
    var _a, _b;
    var _c = props.defaultPage, defaultPage = _c === void 0 ? 1 : _c, dataSource = props.dataSource, fetcher = props.fetcher, onReachBottom = props.onReachBottom, _d = props.serialNumberType, serialNumberType = _d === void 0 ? 'number' : _d, loading = props.loading, _e = props.offsetBottom, offsetBottom = _e === void 0 ? 20 : _e, _f = props.showLatest, showLatest = _f === void 0 ? false : _f, virtualListProps = props.virtualListProps, _g = props.fileName, fileName = _g === void 0 ? 'log.txt' : _g, _h = props.defaultTheme, defaultTheme = _h === void 0 ? 'white' : _h, handleDownload = props.handleDownload, searchText = props.searchText;
    var prefixCls = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext).prefixCls;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    // 主题
    var _j = tslib_1.__read((0, react_1.useState)(defaultTheme), 2), theme = _j[0], setTheme = _j[1];
    // 全屏
    var _k = tslib_1.__read((0, react_1.useState)(false), 2), isFullScreen = _k[0], setFullScreen = _k[1];
    // 搜索
    var _l = tslib_1.__read((0, react_1.useState)(''), 2), keyWord = _l[0], setKeyWord = _l[1];
    var _m = tslib_1.__read((0, react_1.useState)(), 2), logData = _m[0], setLogData = _m[1];
    // 初始数据的 loading
    var _o = tslib_1.__read((0, react_1.useState)(loading), 2), logLoading = _o[0], setLoading = _o[1];
    var _p = tslib_1.__read((0, react_1.useState)(defaultPage), 2), currentPage = _p[0], setCurrentPage = _p[1];
    // 数据是否加载完毕
    var _q = tslib_1.__read((0, react_1.useState)(false), 2), noMoreData = _q[0], setNoMoreData = _q[1];
    // 按钮
    var _r = tslib_1.__read((0, react_1.useState)(true), 2), topDisabled = _r[0], setTopDisabled = _r[1];
    var _s = tslib_1.__read((0, react_1.useState)(true), 2), bottomDisabled = _s[0], setBottomDisabled = _s[1];
    // 保持最新展示
    var _t = tslib_1.__read((0, react_1.useState)(showLatest), 2), keepLatest = _t[0], setKeepLatest = _t[1];
    // 滚动元素
    // 标记是否到达底部
    var refCanTriggerReachBottom = (0, react_1.useRef)(true);
    var refScrollDom = (0, react_1.useRef)(null);
    var innerFetch = !!fetcher;
    var isVirtual = !(0, lodash_es_1.isEmpty)(virtualListProps); // 如开启虚拟列表，首屏的数据需大于等于 threshold， 默认是 100
    var handleListScroll = function () {
        var _a, _b, _c, _d;
        var scrollDom = isVirtual
            ? (_b = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.dom) === null || _b === void 0 ? void 0 : _b.querySelector(".".concat(prefixCls, "-list-content"))
            : (_d = (_c = listRef.current) === null || _c === void 0 ? void 0 : _c.dom) === null || _d === void 0 ? void 0 : _d.querySelector(".".concat(prefixCls, "-list"));
        var scrollTop = scrollDom === null || scrollDom === void 0 ? void 0 : scrollDom.scrollTop;
        var scrollHeight = scrollDom === null || scrollDom === void 0 ? void 0 : scrollDom.scrollHeight;
        var clientHeight = scrollDom === null || scrollDom === void 0 ? void 0 : scrollDom.clientHeight;
        var scrollBottom = scrollHeight - (scrollTop + clientHeight);
        if (scrollDom) {
            refScrollDom.current = scrollDom;
            if (scrollTop <= 0) {
                setTopDisabled(true);
            }
            else {
                setTopDisabled(false);
            }
            if (Math.abs(scrollBottom) < offsetBottom + 1) {
                // 如果用户已经手动滚动到底部，则继续保持实时滚动
                if (showLatest && !keepLatest) {
                    setKeepLatest(function (prev) { return !prev; });
                }
                setBottomDisabled(true);
                if (refCanTriggerReachBottom.current) {
                    var _currentPage = currentPage + 1;
                    setCurrentPage(_currentPage);
                    innerFetch ? handleFetchMore() : onReachBottom === null || onReachBottom === void 0 ? void 0 : onReachBottom(_currentPage);
                    refCanTriggerReachBottom.current = false;
                }
            }
            else {
                // 在用户手动滚动时，停止实时滚动至最新
                if (keepLatest) {
                    setKeepLatest(function (prev) { return !prev; });
                }
                refCanTriggerReachBottom.current = true;
                setBottomDisabled(false);
            }
        }
    };
    var formatLogFileContent = function (logs) {
        var downloadFileContent = '';
        if (logs && (logs === null || logs === void 0 ? void 0 : logs.length) > 0) {
            if (typeof logs[0] === 'string') {
                downloadFileContent = logs.join('\n\r');
            }
            else {
                downloadFileContent = logs.map(function (o) { return o.Log; }).join('\n\r');
            }
        }
        else {
            downloadFileContent = '';
        }
        return downloadFileContent;
    };
    // 下载hooks
    var _u = tslib_1.__read((0, useDownload_1.useDownload)({
        value: formatLogFileContent(logData),
        fileName: fileName,
    }), 2), downloadControls = _u[1];
    // 本地模式
    (0, react_1.useEffect)(function () {
        setLogData(dataSource === null || dataSource === void 0 ? void 0 : dataSource.data);
        setNoMoreData(dataSource ? dataSource.total <= dataSource.data.length : false);
        handleListScroll();
    }, [dataSource]);
    (0, react_1.useEffect)(function () {
        setLoading(loading);
    }, [loading]);
    (0, react_1.useEffect)(function () {
        setKeyWord(searchText || '');
    }, [searchText]);
    var fetcherFn = (0, react_1.useMemo)(function () { return fetcher; }, []);
    // 远程模式
    (0, react_1.useEffect)(function () {
        if (fetcherFn) {
            handleInitFetch();
        }
    }, []);
    // 获取第一次数据
    var handleInitFetch = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var res, noMore, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, (fetcher === null || fetcher === void 0 ? void 0 : fetcher(currentPage))];
                case 1:
                    res = _a.sent();
                    if (res) {
                        noMore = res.total <= res.data.length;
                        setNoMoreData(noMore);
                        setLogData(res.data);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    new Error(locale.CLog.fetcherError);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    handleListScroll();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // 滚动加载更多数据
    var handleFetchMore = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var nextPage, res, totalData, noMore, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (noMoreData) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    nextPage = currentPage + 1;
                    return [4 /*yield*/, (fetcher === null || fetcher === void 0 ? void 0 : fetcher(nextPage))];
                case 2:
                    res = _a.sent();
                    if (res) {
                        setCurrentPage(nextPage);
                        totalData = (logData === null || logData === void 0 ? void 0 : logData.concat(res.data)) || [];
                        noMore = res.total <= totalData.length;
                        setNoMoreData(noMore);
                        setLogData(totalData);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    new Error(locale.CLog.fetcherError);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // end 远程模式
    // 计算 serial 宽度
    var measureSerialWidth = function (item, length) {
        var _a;
        if (item) {
            if (typeof item === 'object' && serialNumberType === 'time') {
                return 140;
            }
            return ((_a = (length + 1).toString()) === null || _a === void 0 ? void 0 : _a.length) * 7 + 12;
        }
        return 0;
    };
    var listProps = tslib_1.__assign(tslib_1.__assign({ offsetBottom: 20 }, (0, lodash_es_1.pick)(props, ['offsetBottom', 'throttleDelay', 'scrollLoading', 'virtualListProps', 'noDataElement'])), { dataSource: logData, onListScroll: handleListScroll });
    var state = {
        listProps: listProps,
        topDisabled: topDisabled,
        bottomDisabled: bottomDisabled,
        showButton: logData &&
            (logData === null || logData === void 0 ? void 0 : logData.length) > 0 &&
            (refScrollDom === null || refScrollDom === void 0 ? void 0 : refScrollDom.current) &&
            ((_a = refScrollDom === null || refScrollDom === void 0 ? void 0 : refScrollDom.current) === null || _a === void 0 ? void 0 : _a.scrollHeight) > ((_b = refScrollDom === null || refScrollDom === void 0 ? void 0 : refScrollDom.current) === null || _b === void 0 ? void 0 : _b.clientHeight),
        loading: logLoading,
        serialWidth: measureSerialWidth((logData === null || logData === void 0 ? void 0 : logData[0]) || '', (logData === null || logData === void 0 ? void 0 : logData.length) || 0),
        isFullScreen: isFullScreen,
        theme: theme,
        keyWord: keyWord,
        logData: logData,
        noMoreData: noMoreData,
        hasLoadMoreFn: innerFetch || onReachBottom,
        keepLatest: keepLatest,
    };
    var controls = {
        onThemeChange: function () {
            setTheme(function (pre) { return (pre === 'white' ? 'black' : 'white'); });
        },
        onFullScreenChange: function () {
            setFullScreen(function (pre) { return !pre; });
        },
        onSearch: function (val) {
            setKeyWord(val);
        },
        onDownload: function () {
            if (handleDownload) {
                handleDownload();
            }
            else {
                downloadControls.downloadFile();
            }
        },
    };
    return [state, controls];
};
exports.useCLog = useCLog;
//# sourceMappingURL=hooks.js.map