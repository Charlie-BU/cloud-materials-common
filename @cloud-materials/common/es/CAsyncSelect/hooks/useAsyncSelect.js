import { __assign, __awaiter, __generator, __read } from "tslib";
import { useInfiniteScroll } from 'ahooks';
import { debounce } from 'lodash-es';
import { useCallback, useRef, useState } from 'react';
import { getAutoLoadFirstValue, mergeOptions } from '../util';
import { useScrollLoad } from './useScrollLoad';
export var useCAsyncSelect = function (props) {
    var fetchData = props.fetchData, fetchInitData = props.fetchInitData, _a = props.searchDebounceTime, searchDebounceTime = _a === void 0 ? 300 : _a, _b = props.loadDebounceTime, loadDebounceTime = _b === void 0 ? 500 : _b, _c = props.staleTime, staleTime = _c === void 0 ? 60 * 1000 : _c, onError = props.onError, _d = props.autoLoad, autoLoad = _d === void 0 ? false : _d, _e = props.ifAutoLoadFirst, ifAutoLoadFirst = _e === void 0 ? false : _e, _f = props.enableRollingLoad, enableRollingLoad = _f === void 0 ? true : _f, showSearch = props.showSearch, _g = props.enableSearch, enableSearch = _g === void 0 ? true : _g, dataSource = props.dataSource, initOptions = props.initOptions, mode = props.mode;
    //存储searchWord的state
    var _h = __read(useState(''), 2), searchWord = _h[0], setSearchWord = _h[1];
    var _j = __read(useState(), 2), autoLoadFirstValue = _j[0], setAutoLoadFirstValue = _j[1];
    var _k = __read(useState(true), 2), isFirstInitOptionsHandle = _k[0], setIsFirstInitOptionsHandle = _k[1];
    var _l = __read(useState(false), 2), autoLoadFirstFlag = _l[0], setAutoLoadFirstFlag = _l[1];
    var cacheDataRef = useRef(true);
    var compatibleSearch = showSearch === undefined ? enableSearch : showSearch;
    //useInfiniteScroll函数的调用主体
    var _m = useInfiniteScroll(function (d) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, handleService(d)];
    }); }); }, {
        isNoMore: function (d) { return (d === null || d === void 0 ? void 0 : d.noMore) || false; },
        reloadDeps: [searchWord],
        onError: onError,
        onSuccess: function (d) {
            //获取到数据之后，开始缓存倒计时
            setTimeout(function () {
                cacheDataRef.current = false;
            }, staleTime);
            if (!searchWord && d.page === 1) {
                // 不是搜索的情况下，第一页数据加载完之后的一些处理
                handleDataAboutPage(d);
            }
        },
        manual: !autoLoad,
    }), data = _m.data, loading = _m.loading, loadingMore = _m.loadingMore, loadMore = _m.loadMore, noMore = _m.noMore, reload = _m.reload, loadMoreAsync = _m.loadMoreAsync, reloadAsync = _m.reloadAsync, mutate = _m.mutate, cancel = _m.cancel;
    //处理service的相关逻辑
    var handleService = function (d) {
        var _a;
        // 数据源受控
        if (dataSource) {
            if (d) {
                return fetchData({ page: dataSource.page + 1, searchWord: searchWord, cacheData: data });
            }
        }
        // 传入initOptions的逻辑
        if (initOptions) {
            //第一次处理initOptions，直接返回initOptions（没有focus之前），focus之后直接忽略这段逻辑，走正常fetchData的逻辑
            if (isFirstInitOptionsHandle) {
                setIsFirstInitOptionsHandle(false);
                return {
                    list: initOptions,
                    page: 1,
                    noMore: false,
                };
            }
        }
        //d没有值说明还没开始加载，从第一页开始处理
        if (!d) {
            return fetchData({ page: 1, searchWord: searchWord, cacheData: data });
            //如果d有值（第一页数据加载完毕，准备加载第二页数据），清除fetchInitData、initOptions的数据长度后计算page
        }
        return fetchData({ page: ((_a = d === null || d === void 0 ? void 0 : d.page) !== null && _a !== void 0 ? _a : 0) + 1, searchWord: searchWord, cacheData: data });
    };
    //控制搜索的方法，通过修改searchWord的值，触发useInfiniteScroll的reload
    var onSearch = useCallback(debounce(function (value, reason) {
        if (reason !== 'manual')
            return;
        if (!compatibleSearch)
            return;
        setSearchWord(value);
    }, searchDebounceTime), []);
    var clearSearchWord = useCallback(function () {
        setSearchWord('');
    }, []);
    var clearAutoLoadFirstValue = useCallback(function () {
        setAutoLoadFirstValue(undefined);
    }, []);
    // 滚动加载
    var popupScrollHandler = useScrollLoad({
        cb: enableRollingLoad ? loadMore : function () { },
        disabled: noMore,
        debounceTime: loadDebounceTime,
    });
    var handleDataAboutPage = function (d) { return __awaiter(void 0, void 0, void 0, function () {
        var mergeOption, initData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mergeOption = d.list;
                    if (initOptions) {
                        mergeOption = mergeOptions(initOptions, mergeOption);
                    }
                    if (!(autoLoad && fetchInitData)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchInitData()];
                case 1:
                    initData = _a.sent();
                    //使用fetchInitData之后，给这条数据打个标记，使之可以配合ifAutoLoadFirst使用
                    if (initData.list[0] && typeof initData.list[0] !== 'string' && typeof initData.list[0] !== 'number') {
                        initData.list[0].extra = __assign(__assign({}, initData.list[0].extra), { 'select-fetchInitData': true });
                    }
                    mergeOption = mergeOptions(initData.list, mergeOption);
                    _a.label = 2;
                case 2:
                    if (dataSource) {
                        mergeOption = mergeOptions(dataSource.list, mergeOption);
                    }
                    d.list = mergeOption;
                    mutate(__assign({}, d));
                    //autoLoad（是否自动加载下拉框）、ifAutoLoadFirst（是否自动选择第一个）都设置为true之后，第一个可以选择的值
                    if (autoLoad && ifAutoLoadFirst && !autoLoadFirstFlag) {
                        setAutoLoadFirstValue(getAutoLoadFirstValue(d === null || d === void 0 ? void 0 : d.list, mode));
                        setAutoLoadFirstFlag(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    //1. 没有自动加载下拉框且进行第一次数据请求的focus时，加载第一页数据
    //2. 如果结果缓存超时，focus的时候，重新加载第一页数据
    //3. 传入initOptions且focus之后处理initOptions，需要reload加载第一页数据融合之后再展示
    var handleFocusCacheData = function () {
        if (!autoLoad && !data) {
            reload();
            return;
        }
        if (!cacheDataRef.current) {
            reload();
            cacheDataRef.current = true;
            return;
        }
        if (initOptions && !isFirstInitOptionsHandle) {
            reload();
            return;
        }
    };
    /**
     * @description: asyncSelectControls每个control的含义
     * onSearch：控制搜索的回调函数
     * popupScrollHandler：处理滚动加载相关逻辑
     * handleFocusCacheData：没有开启自动加载（autoLoad=false）以及因缓存时间超时需要重新reload的focus函数
     * reload：重新加载第一页数据
     * loadMore：加载更多数据，会自动捕获异常，通过 options.onError 处理
     * loadMoreAsync：加载更多数据，与 loadMore 行为一致，但返回的是 Promise，需要自行处理异常
     * reloadAsync：加载第一页数据，与 reload 行为一致，但返回的是 Promise，需要自行处理异常
     * mutate：直接修改 data
     * cancel：忽略当前 Promise 的响应
     */
    var asyncSelectControls = {
        onSearch: onSearch,
        clearSearchWord: clearSearchWord,
        clearAutoLoadFirstValue: clearAutoLoadFirstValue,
        reload: reload,
        loadMore: loadMore,
        popupScrollHandler: popupScrollHandler,
        handleFocusCacheData: handleFocusCacheData,
        loadMoreAsync: loadMoreAsync,
        reloadAsync: reloadAsync,
        mutate: mutate,
        cancel: cancel,
        setAutoLoadFirstFlag: setAutoLoadFirstFlag,
    };
    /**
     * @description: asyncSelectStates每个state的含义
     * data：滚动加载并合并之前的数据
     * loading：是否正在进行首次请求
     * loadingMore：是否正在进行更多数据请求
     * noMore：是否没有更多数据了
     * autoLoadValue: autoLoad（是否自动加载下拉框）、ifAutoLoadFirst（是否自动选择第一个）都设置为true之后，第一个可以选择的值
     * cacheDataRef：存储是否超出缓存时间的ref
     */
    var asyncSelectStates = { data: data, loading: loading, loadingMore: loadingMore, noMore: noMore, autoLoadFirstValue: autoLoadFirstValue, cacheDataRef: cacheDataRef };
    return [asyncSelectStates, asyncSelectControls];
};
//# sourceMappingURL=useAsyncSelect.js.map