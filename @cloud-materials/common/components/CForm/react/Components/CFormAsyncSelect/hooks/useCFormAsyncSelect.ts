import { useInfiniteScroll, useSetState, useUpdateEffect } from 'ahooks';
import type {
  CFormAsyncSelectDataSource,
  CFormAsyncSelectFetchDataSource,
  CFormAsyncSelectOption,
  CFormAsyncSelectProps,
  UseCFormAsyncSelectControl,
  UseCFormAsyncSelectProps,
  UseCFormAsyncSelectState,
} from '../interface';
import type { InfiniteScrollOptions, Service } from 'ahooks/lib/useInfiniteScroll/types';
import { isUndefined, uniqBy } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { transCFormAsyncSelectOption, transCFormAsyncSelectOptions } from '../utils';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';
import { useCConfigContext } from '../../../../../CConfigProvider';

/**
 * @title UseCFormAsyncSelectState
 */
interface UseCFormAsyncSelectInnerState extends Pick<CFormAsyncSelectProps, 'value'> {
  /** 数据源过期时间 */
  dataSourceExpiredTime: number;
  searchWord?: string;
  errorType?: UseCFormAsyncSelectState['errorType'];
}

const useCFormAsyncSelect = (
  props: UseCFormAsyncSelectProps,
): [UseCFormAsyncSelectState, UseCFormAsyncSelectControl] => {
  const {
    autoLoad,
    enableRemoteLoadWhenDataSourceControlled = false,
    expiredTime = 60 * 1000,
    fetchData,
    fetchInitData,
    onChange: handleChange,
    ifAutoLoadFirst,
    labelInValue,
    mode,
    onDataSourceChange,
    onError,
    onFetchDataLoadingChange,
  } = props;
  const [state, setState] = useSetState<UseCFormAsyncSelectInnerState>({
    dataSourceExpiredTime: Number.MAX_SAFE_INTEGER,
  });
  const paramsRef = useRef({ pageNum: 0 });
  const valueControlled = 'value' in props;
  const dataSourceControlled = 'dataSource' in props;
  const value = valueControlled ? props.value : state.value;
  /** 是否搜索中 */
  const onSearching = Boolean(state.searchWord);
  /** 是否远程拉取 */
  const enableFetchData = Boolean((!dataSourceControlled || enableRemoteLoadWhenDataSourceControlled) && fetchData);
  /** 是否自动远程拉取 */
  const enableAutoFetchData = Boolean(enableFetchData && autoLoad);

  const { createLogger } = useCConfigContext();
  const logger = createLogger('CFormAsyncSelect');

  const fetchDataSafeRace = useSafeRace(fetchData ?? (async () => {}));

  const dataFetcher: Service<CFormAsyncSelectFetchDataSource> = async (
    currentData?: CFormAsyncSelectFetchDataSource,
  ) => {
    const pageNum = paramsRef.current.pageNum;

    const res = await fetchDataSafeRace?.({
      page: pageNum + 1,
      searchWord: state.searchWord,
      cacheData: currentData,
      extra: currentData?.extra,
    }).catch(error => {
      logger.error({ error, message: 'feachData error' });
      setState({ errorType: pageNum === 0 ? 'init' : 'loadmore' });
      throw error;
    });
    if (!res) {
      return { list: [], noMore: true };
    }
    let initOptions: CFormAsyncSelectOption[] = [];
    // 非搜索时，加载第一页，有值，且值不在第一页中
    if (
      !onSearching &&
      pageNum === 0 &&
      !isUndefined(value) &&
      !res.list.some(item => transCFormAsyncSelectOption(item).value === value) &&
      !isUndefined(fetchInitData)
    ) {
      const initRes = (await fetchInitData().catch(console.log)) ?? { list: [] };
      initOptions = initRes.list;
    }
    return {
      ...res,
      list: uniqBy(transCFormAsyncSelectOptions([...initOptions, ...(currentData?.list ?? []), ...res.list]), 'value'),
    };
  };

  const isNoMore: InfiniteScrollOptions<CFormAsyncSelectDataSource>['isNoMore'] = currentData =>
    Boolean(
      isUndefined(currentData?.noMore)
        ? Boolean(currentData && currentData.list.length >= (currentData.total ?? Number.MAX_SAFE_INTEGER))
        : currentData?.noMore,
    );

  const handleSuccess: InfiniteScrollOptions<CFormAsyncSelectDataSource>['onSuccess'] = data => {
    const pageNum = paramsRef.current.pageNum;
    // 非搜索时，加载第一页，无值，自动加载并选中第一个
    if (!onSearching && pageNum === 0 && autoLoad && ifAutoLoadFirst && !value && data) {
      const temp = data.list.find(item => !transCFormAsyncSelectOption(item).disabled);
      if (temp) {
        const item = transCFormAsyncSelectOption(temp);
        !valueControlled && setState({ value: item.value });
        let tempValue: any = labelInValue ? { value: item.value, label: item.label } : item.value;
        if (!isUndefined(mode)) {
          tempValue = [tempValue];
        }
        item && handleChange?.(tempValue, []);
      }
    }
    setState({
      dataSourceExpiredTime: Date.now() + expiredTime,
    });
    paramsRef.current.pageNum += 1;
  };

  const { data, loading, loadingMore, loadMore, reload, mutate, cancel } =
    useInfiniteScroll<CFormAsyncSelectFetchDataSource>(dataFetcher, {
      isNoMore,
      onError,
      onSuccess: handleSuccess,
      manual: true,
    });

  /** 展示的数据源 */
  const dataSource = dataSourceControlled ? props.dataSource : data;

  const resetFetchState = (clearData = false) => {
    paramsRef.current.pageNum = 0;
    setState({
      errorType: undefined,
      dataSourceExpiredTime: Number.MAX_SAFE_INTEGER,
    });
    if (clearData) mutate(undefined);
    else mutate({ list: [], noMore: true });
  };

  const handleLoadMore = () => {
    setState({ errorType: undefined });
    loadMore();
  };
  const handleReload = () => {
    resetFetchState();
    reload();
  };

  const loadingType = loading ? 'init' : loadingMore ? 'loadmore' : undefined;

  const localDataSource = dataSource
    ? {
        ...dataSource,
        list: dataSource.list?.map(el => (typeof el === 'object' ? el : { label: el, value: el })),
      }
    : dataSource;

  // 搜索
  useUpdateEffect(() => {
    enableFetchData && handleReload();
  }, [state.searchWord]);

  // 自动拉取
  useEffect(() => {
    isUndefined(dataSource) && enableAutoFetchData && handleReload();
  }, [dataSource]);

  // 暴露组件内部状态的数据源，合并外部传入dataSource
  useEffect(() => {
    onDataSourceChange?.(data);
  }, [data]);

  useEffect(() => {
    onFetchDataLoadingChange?.(!!loadingType);
  }, [loadingType]);

  return [
    {
      dataSource: localDataSource,
      dataSourceControlled,
      enableAutoFetchData,
      enableFetchData,
      errorType: state.errorType,
      loadingType,
      searchWord: state.searchWord,
      value,
      valueControlled,
    },
    {
      cancel,
      loadMore: handleLoadMore,
      mutate,
      reload: handleReload,
      resetFetchState,
      setSearchWord: searchWord => setState({ searchWord }),
      setValue: value => setState({ value }),
      getDataSourceExpired: () => Date.now() > state.dataSourceExpiredTime,
    },
  ];
};

export default useCFormAsyncSelect;
