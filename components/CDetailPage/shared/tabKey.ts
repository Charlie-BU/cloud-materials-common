import qs from 'qs';

/**
 *
 * @returns 从url中获取tabKey查询字段
 */
export const getUrlTabKey = (keyName = 'tabKey') => {
  const searchParamsObj = qs.parse(window.location.search.substring(1));
  return searchParamsObj?.[keyName] as string;
};

export const changeUrlTabKey = (options: { tabKey: string; tabKeyName?: string; replaceHistory?: boolean }) => {
  const { tabKey, tabKeyName = 'tabKey', replaceHistory = false } = options;
  // qs.parse 默认会解析 query 中的数组和对象，但是下面也是用的 qs.stringify，两个的行为是对等的，因此这里不需要主动去关闭这些功能
  const searchParamsObj = qs.parse(window.location.search.substring(1));
  const finalSearchObj = {
    ...searchParamsObj,
    [tabKeyName]: tabKey,
  };
  const newUrl = `${window.location.pathname}?${qs.stringify(finalSearchObj)}`;
  if (replaceHistory) {
    window.history.replaceState(window.history.state, '', newUrl);
  } else {
    window.history.pushState(window.history.state, '', newUrl);
  }
};
