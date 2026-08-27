import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useInfiniteScroll, useSetState, useUpdateEffect } from 'ahooks';
import { isUndefined, uniqBy } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { transCFormAsyncSelectOption, transCFormAsyncSelectOptions } from '../utils';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';
import { useCConfigContext } from '../../../../../CConfigProvider';
var useCFormAsyncSelect = function (props) {
    var _a;
    var autoLoad = props.autoLoad, _b = props.enableRemoteLoadWhenDataSourceControlled, enableRemoteLoadWhenDataSourceControlled = _b === void 0 ? false : _b, _c = props.expiredTime, expiredTime = _c === void 0 ? 60 * 1000 : _c, fetchData = props.fetchData, fetchInitData = props.fetchInitData, handleChange = props.onChange, ifAutoLoadFirst = props.ifAutoLoadFirst, labelInValue = props.labelInValue, mode = props.mode, onDataSourceChange = props.onDataSourceChange, onError = props.onError, onFetchDataLoadingChange = props.onFetchDataLoadingChange;
    var _d = __read(useSetState({
        dataSourceExpiredTime: Number.MAX_SAFE_INTEGER,
    }), 2), state = _d[0], setState = _d[1];
    var paramsRef = useRef({ pageNum: 0 });
    var valueControlled = 'value' in props;
    var dataSourceControlled = 'dataSource' in props;
    var value = valueControlled ? props.value : state.value;
    /** 是否搜索中 */
    var onSearching = Boolean(state.searchWord);
    /** 是否远程拉取 */
    var enableFetchData = Boolean((!dataSourceControlled || enableRemoteLoadWhenDataSourceControlled) && fetchData);
    /** 是否自动远程拉取 */
    var enableAutoFetchData = Boolean(enableFetchData && autoLoad);
    var createLogger = useCConfigContext().createLogger;
    var logger = createLogger('CFormAsyncSelect');
    var fetchDataSafeRace = useSafeRace(fetchData !== null && fetchData !== void 0 ? fetchData : (function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }));
    var dataFetcher = function (currentData) { return __awaiter(void 0, void 0, void 0, function () {
        var pageNum, res, initOptions, initRes;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pageNum = paramsRef.current.pageNum;
                    return [4 /*yield*/, (fetchDataSafeRace === null || fetchDataSafeRace === void 0 ? void 0 : fetchDataSafeRace({
                            page: pageNum + 1,
                            searchWord: state.searchWord,
                            cacheData: currentData,
                            extra: currentData === null || currentData === void 0 ? void 0 : currentData.extra,
                        }).catch(function (error) {
                            logger.error({ error: error, message: 'feachData error' });
                            setState({ errorType: pageNum === 0 ? 'init' : 'loadmore' });
                            throw error;
                        }))];
                case 1:
                    res = _c.sent();
                    if (!res) {
                        return [2 /*return*/, { list: [], noMore: true }];
                    }
                    initOptions = [];
                    if (!(!onSearching &&
                        pageNum === 0 &&
                        !isUndefined(value) &&
                        !res.list.some(function (item) { return transCFormAsyncSelectOption(item).value === value; }) &&
                        !isUndefined(fetchInitData))) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetchInitData().catch(console.log)];
                case 2:
                    initRes = (_a = (_c.sent())) !== null && _a !== void 0 ? _a : { list: [] };
                    initOptions = initRes.list;
                    _c.label = 3;
                case 3: return [2 /*return*/, __assign(__assign({}, res), { list: uniqBy(transCFormAsyncSelectOptions(__spreadArray(__spreadArray(__spreadArray([], __read(initOptions), false), __read(((_b = currentData === null || currentData === void 0 ? void 0 : currentData.list) !== null && _b !== void 0 ? _b : [])), false), __read(res.list), false)), 'value') })];
            }
        });
    }); };
    var isNoMore = function (currentData) {
        var _a;
        return Boolean(isUndefined(currentData === null || currentData === void 0 ? void 0 : currentData.noMore)
            ? Boolean(currentData && currentData.list.length >= ((_a = currentData.total) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER))
            : currentData === null || currentData === void 0 ? void 0 : currentData.noMore);
    };
    var handleSuccess = function (data) {
        var pageNum = paramsRef.current.pageNum;
        // 非搜索时，加载第一页，无值，自动加载并选中第一个
        if (!onSearching && pageNum === 0 && autoLoad && ifAutoLoadFirst && !value && data) {
            var temp = data.list.find(function (item) { return !transCFormAsyncSelectOption(item).disabled; });
            if (temp) {
                var item = transCFormAsyncSelectOption(temp);
                !valueControlled && setState({ value: item.value });
                var tempValue = labelInValue ? { value: item.value, label: item.label } : item.value;
                if (!isUndefined(mode)) {
                    tempValue = [tempValue];
                }
                item && (handleChange === null || handleChange === void 0 ? void 0 : handleChange(tempValue, []));
            }
        }
        setState({
            dataSourceExpiredTime: Date.now() + expiredTime,
        });
        paramsRef.current.pageNum += 1;
    };
    var _e = useInfiniteScroll(dataFetcher, {
        isNoMore: isNoMore,
        onError: onError,
        onSuccess: handleSuccess,
        manual: true,
    }), data = _e.data, loading = _e.loading, loadingMore = _e.loadingMore, loadMore = _e.loadMore, reload = _e.reload, mutate = _e.mutate, cancel = _e.cancel;
    /** 展示的数据源 */
    var dataSource = dataSourceControlled ? props.dataSource : data;
    var resetFetchState = function (clearData) {
        if (clearData === void 0) { clearData = false; }
        paramsRef.current.pageNum = 0;
        setState({
            errorType: undefined,
            dataSourceExpiredTime: Number.MAX_SAFE_INTEGER,
        });
        if (clearData)
            mutate(undefined);
        else
            mutate({ list: [], noMore: true });
    };
    var handleLoadMore = function () {
        setState({ errorType: undefined });
        loadMore();
    };
    var handleReload = function () {
        resetFetchState();
        reload();
    };
    var loadingType = loading ? 'init' : loadingMore ? 'loadmore' : undefined;
    var localDataSource = dataSource
        ? __assign(__assign({}, dataSource), { list: (_a = dataSource.list) === null || _a === void 0 ? void 0 : _a.map(function (el) { return (typeof el === 'object' ? el : { label: el, value: el }); }) }) : dataSource;
    // 搜索
    useUpdateEffect(function () {
        enableFetchData && handleReload();
    }, [state.searchWord]);
    // 自动拉取
    useEffect(function () {
        isUndefined(dataSource) && enableAutoFetchData && handleReload();
    }, [dataSource]);
    // 暴露组件内部状态的数据源，合并外部传入dataSource
    useEffect(function () {
        onDataSourceChange === null || onDataSourceChange === void 0 ? void 0 : onDataSourceChange(data);
    }, [data]);
    useEffect(function () {
        onFetchDataLoadingChange === null || onFetchDataLoadingChange === void 0 ? void 0 : onFetchDataLoadingChange(!!loadingType);
    }, [loadingType]);
    return [
        {
            dataSource: localDataSource,
            dataSourceControlled: dataSourceControlled,
            enableAutoFetchData: enableAutoFetchData,
            enableFetchData: enableFetchData,
            errorType: state.errorType,
            loadingType: loadingType,
            searchWord: state.searchWord,
            value: value,
            valueControlled: valueControlled,
        },
        {
            cancel: cancel,
            loadMore: handleLoadMore,
            mutate: mutate,
            reload: handleReload,
            resetFetchState: resetFetchState,
            setSearchWord: function (searchWord) { return setState({ searchWord: searchWord }); },
            setValue: function (value) { return setState({ value: value }); },
            getDataSourceExpired: function () { return Date.now() > state.dataSourceExpiredTime; },
        },
    ];
};
export default useCFormAsyncSelect;
//# sourceMappingURL=useCFormAsyncSelect.js.map