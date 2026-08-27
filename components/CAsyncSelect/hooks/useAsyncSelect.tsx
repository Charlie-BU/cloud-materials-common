//此hook主要控制AsyncSelect组件数据处理相关逻辑
import type { InputValueChangeReason } from '@arco-design/web-react/es/Select/interface';
import { useInfiniteScroll } from 'ahooks';
import { debounce } from 'lodash-es';
import { useCallback, useRef, useState } from 'react';
import type { CAsyncSelectHooksProps, DataSource, Option } from '../interface';
import { getAutoLoadFirstValue, mergeOptions } from '../util';
import { useScrollLoad } from './useScrollLoad';

export const useCAsyncSelect = (props: CAsyncSelectHooksProps) => {
  const {
    fetchData,
    fetchInitData,
    searchDebounceTime = 300,
    loadDebounceTime = 500,
    staleTime = 60 * 1000,
    onError,
    autoLoad = false,
    ifAutoLoadFirst = false,
    enableRollingLoad = true,
    showSearch,
    enableSearch = true,
    dataSource,
    initOptions,
    mode,
  } = props;

  //存储searchWord的state
  const [searchWord, setSearchWord] = useState('');
  const [autoLoadFirstValue, setAutoLoadFirstValue] = useState<Option | Option[] | undefined>();
  const [isFirstInitOptionsHandle, setIsFirstInitOptionsHandle] = useState<boolean>(true);
  const [autoLoadFirstFlag, setAutoLoadFirstFlag] = useState<boolean>(false);
  const cacheDataRef = useRef(true);
  const compatibleSearch = showSearch === undefined ? enableSearch : showSearch;

  //useInfiniteScroll函数的调用主体
  const { data, loading, loadingMore, loadMore, noMore, reload, loadMoreAsync, reloadAsync, mutate, cancel } =
    useInfiniteScroll(async d => handleService(d), {
      isNoMore: d => d?.noMore || false,
      reloadDeps: [searchWord],
      onError: onError,
      onSuccess: (d: DataSource) => {
        //获取到数据之后，开始缓存倒计时
        setTimeout(() => {
          cacheDataRef.current = false;
        }, staleTime);
        if (!searchWord && d.page === 1) {
          // 不是搜索的情况下，第一页数据加载完之后的一些处理
          handleDataAboutPage(d);
        }
      },
      manual: !autoLoad,
    });

  //处理service的相关逻辑
  const handleService = (d: any): Promise<DataSource> | DataSource => {
    // 数据源受控
    if (dataSource) {
      if (d) {
        return fetchData({ page: dataSource.page + 1, searchWord, cacheData: data });
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
      return fetchData({ page: 1, searchWord, cacheData: data });
      //如果d有值（第一页数据加载完毕，准备加载第二页数据），清除fetchInitData、initOptions的数据长度后计算page
    }
    return fetchData({ page: (d?.page ?? 0) + 1, searchWord, cacheData: data });
  };

  //控制搜索的方法，通过修改searchWord的值，触发useInfiniteScroll的reload
  const onSearch = useCallback(
    debounce((value: string, reason: InputValueChangeReason) => {
      if (reason !== 'manual') return;
      if (!compatibleSearch) return;
      setSearchWord(value);
    }, searchDebounceTime),
    [],
  );

  const clearSearchWord = useCallback(() => {
    setSearchWord('');
  }, []);

  const clearAutoLoadFirstValue = useCallback(() => {
    setAutoLoadFirstValue(undefined);
  }, []);

  // 滚动加载
  const popupScrollHandler = useScrollLoad({
    cb: enableRollingLoad ? loadMore : () => {},
    disabled: noMore,
    debounceTime: loadDebounceTime,
  });

  const handleDataAboutPage = async (d: DataSource) => {
    let mergeOption = d.list;
    if (initOptions) {
      mergeOption = mergeOptions(initOptions, mergeOption);
    }
    //提供fetchInitData之后，调用该方法返回的数据跟之前的数据处理融合处理后返回
    if (autoLoad && fetchInitData) {
      const initData = await fetchInitData();
      //使用fetchInitData之后，给这条数据打个标记，使之可以配合ifAutoLoadFirst使用
      if (initData.list[0] && typeof initData.list[0] !== 'string' && typeof initData.list[0] !== 'number') {
        initData.list[0].extra = {
          ...initData.list[0].extra,
          'select-fetchInitData': true,
        };
      }
      mergeOption = mergeOptions(initData.list, mergeOption);
    }
    if (dataSource) {
      mergeOption = mergeOptions(dataSource.list, mergeOption);
    }
    d.list = mergeOption;
    mutate({ ...d });

    //autoLoad（是否自动加载下拉框）、ifAutoLoadFirst（是否自动选择第一个）都设置为true之后，第一个可以选择的值
    if (autoLoad && ifAutoLoadFirst && !autoLoadFirstFlag) {
      setAutoLoadFirstValue(getAutoLoadFirstValue(d?.list, mode));
      setAutoLoadFirstFlag(true);
    }
  };

  //1. 没有自动加载下拉框且进行第一次数据请求的focus时，加载第一页数据
  //2. 如果结果缓存超时，focus的时候，重新加载第一页数据
  //3. 传入initOptions且focus之后处理initOptions，需要reload加载第一页数据融合之后再展示
  const handleFocusCacheData = () => {
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

  const asyncSelectControls = {
    onSearch,
    clearSearchWord,
    clearAutoLoadFirstValue,
    reload,
    loadMore,
    popupScrollHandler,
    handleFocusCacheData,
    loadMoreAsync,
    reloadAsync,
    mutate,
    cancel,
    setAutoLoadFirstFlag,
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
  const asyncSelectStates = { data, loading, loadingMore, noMore, autoLoadFirstValue, cacheDataRef };

  return [asyncSelectStates, asyncSelectControls] as const;
};
