import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import type { LogDataItem, LogDataObjectItem, CLogProps, ListInLogProps } from './interface';
import { pick, isEmpty } from 'lodash-es';
import { useDownload } from '../hooks/useDownload';
import { ConfigProvider } from '@arco-design/web-react';

export const useCLog = (props: CLogProps, listRef: any) => {
  const {
    defaultPage = 1,
    dataSource,
    fetcher,
    onReachBottom,
    serialNumberType = 'number',
    loading,
    offsetBottom = 20,
    showLatest = false,
    virtualListProps,
    fileName = 'log.txt',
    defaultTheme = 'white',
    handleDownload,
    searchText,
  } = props;
  const { prefixCls } = useContext(ConfigProvider.ConfigContext);

  const { locale } = useCConfigContext();

  // 主题
  const [theme, setTheme] = useState(defaultTheme);
  // 全屏
  const [isFullScreen, setFullScreen] = useState(false);
  // 搜索
  const [keyWord, setKeyWord] = useState('');

  const [logData, setLogData] = useState<LogDataItem[]>();
  // 初始数据的 loading
  const [logLoading, setLoading] = useState(loading);
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  // 数据是否加载完毕
  const [noMoreData, setNoMoreData] = useState(false);

  // 按钮
  const [topDisabled, setTopDisabled] = useState(true);
  const [bottomDisabled, setBottomDisabled] = useState(true);

  // 保持最新展示
  const [keepLatest, setKeepLatest] = useState(showLatest);

  // 滚动元素

  // 标记是否到达底部
  const refCanTriggerReachBottom = useRef(true);
  const refScrollDom = useRef<HTMLDivElement | null>(null);

  const innerFetch = !!fetcher;

  const isVirtual = !isEmpty(virtualListProps); // 如开启虚拟列表，首屏的数据需大于等于 threshold， 默认是 100

  const handleListScroll = () => {
    const scrollDom = isVirtual
      ? listRef.current?.dom?.querySelector(`.${prefixCls}-list-content`)
      : listRef.current?.dom?.querySelector(`.${prefixCls}-list`);
    const scrollTop = scrollDom?.scrollTop;
    const scrollHeight = scrollDom?.scrollHeight;
    const clientHeight = scrollDom?.clientHeight;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    if (scrollDom) {
      refScrollDom.current = scrollDom;
      if (scrollTop <= 0) {
        setTopDisabled(true);
      } else {
        setTopDisabled(false);
      }

      if (Math.abs(scrollBottom) < offsetBottom + 1) {
        // 如果用户已经手动滚动到底部，则继续保持实时滚动
        if (showLatest && !keepLatest) {
          setKeepLatest(prev => !prev);
        }
        setBottomDisabled(true);
        if (refCanTriggerReachBottom.current) {
          const _currentPage = currentPage + 1;
          setCurrentPage(_currentPage);
          innerFetch ? handleFetchMore() : onReachBottom?.(_currentPage);
          refCanTriggerReachBottom.current = false;
        }
      } else {
        // 在用户手动滚动时，停止实时滚动至最新
        if (keepLatest) {
          setKeepLatest(prev => !prev);
        }
        refCanTriggerReachBottom.current = true;
        setBottomDisabled(false);
      }
    }
  };

  const formatLogFileContent = (logs?: LogDataItem[]) => {
    let downloadFileContent = '';
    if (logs && logs?.length > 0) {
      if (typeof logs[0] === 'string') {
        downloadFileContent = logs.join('\n\r');
      } else {
        downloadFileContent = logs.map((o: LogDataObjectItem) => o.Log).join('\n\r');
      }
    } else {
      downloadFileContent = '';
    }
    return downloadFileContent;
  };

  // 下载hooks
  const [, downloadControls] = useDownload({
    value: formatLogFileContent(logData),
    fileName,
  });

  // 本地模式
  useEffect(() => {
    setLogData(dataSource?.data);
    setNoMoreData(dataSource ? dataSource.total <= dataSource.data.length : false);
    handleListScroll();
  }, [dataSource]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    setKeyWord(searchText || '');
  }, [searchText]);

  const fetcherFn = useMemo(() => fetcher, []);

  // 远程模式
  useEffect(() => {
    if (fetcherFn) {
      handleInitFetch();
    }
  }, []);

  // 获取第一次数据
  const handleInitFetch = async () => {
    try {
      setLoading(true);
      const res = await fetcher?.(currentPage);
      if (res) {
        const noMore = res.total <= res.data.length;
        setNoMoreData(noMore);
        setLogData(res.data);
      }
    } catch (error) {
      new Error(locale.CLog.fetcherError);
    } finally {
      setLoading(false);
      handleListScroll();
    }
  };

  // 滚动加载更多数据
  const handleFetchMore = async () => {
    if (noMoreData) {
      return;
    }

    try {
      const nextPage = currentPage + 1;
      const res = await fetcher?.(nextPage);
      if (res) {
        setCurrentPage(nextPage);
        const totalData = logData?.concat(res.data) || [];
        const noMore = res.total <= totalData.length;
        setNoMoreData(noMore);
        setLogData(totalData);
      }
    } catch (error) {
      new Error(locale.CLog.fetcherError);
    }
  };

  // end 远程模式

  // 计算 serial 宽度
  const measureSerialWidth = (item: LogDataItem, length: number) => {
    if (item) {
      if (typeof item === 'object' && serialNumberType === 'time') {
        return 140;
      }
      return (length + 1).toString()?.length * 7 + 12;
    }
    return 0;
  };

  const listProps: ListInLogProps = {
    offsetBottom: 20,
    ...pick(props, ['offsetBottom', 'throttleDelay', 'scrollLoading', 'virtualListProps', 'noDataElement']),
    dataSource: logData,
    onListScroll: handleListScroll,
  };

  const state = {
    listProps,
    topDisabled,
    bottomDisabled,
    showButton:
      logData &&
      logData?.length > 0 &&
      refScrollDom?.current &&
      refScrollDom?.current?.scrollHeight > refScrollDom?.current?.clientHeight,
    loading: logLoading,
    serialWidth: measureSerialWidth(logData?.[0] || '', logData?.length || 0),
    isFullScreen,
    theme,
    keyWord,
    logData,
    noMoreData,
    hasLoadMoreFn: innerFetch || onReachBottom,
    keepLatest,
  };

  const controls = {
    onThemeChange: () => {
      setTheme((pre: string) => (pre === 'white' ? 'black' : 'white'));
    },
    onFullScreenChange: () => {
      setFullScreen(pre => !pre);
    },
    onSearch: (val: string) => {
      setKeyWord(val);
    },
    onDownload: () => {
      if (handleDownload) {
        handleDownload();
      } else {
        downloadControls.downloadFile();
      }
    },
  };

  return [state, controls] as const;
};
