import { debounce } from 'lodash-es';
import { useCallback } from 'react';

//不用ahooks里面useInfiniteScroll自带滚动加载的逻辑原因有三个：
//1. useInfiniteScroll是通过挂载ref在父级元素上，根据父级元素的高度、滚动高度等判断触发滚动加载等逻辑，但是select，option的父级是pop-inner，arco不支持外部挂载，且外面套层div，挂载在div上也不行。
//2. 无法设置debounceTime的逻辑，useInfiniteScroll内部不支持。
//3. 更灵活
export const useScrollLoad = (options: {
  /** 加载函数 */
  cb: () => void;
  /** 是否启用 */
  disabled?: boolean;
  /** 防抖时间 */
  debounceTime?: number;
}) => {
  const { cb, disabled, debounceTime } = options;
  const scrollBottomToLoad = 10;
  const scrollHandler = useCallback(
    debounce((element: Element) => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      if (scrollBottom < scrollBottomToLoad && !disabled) {
        cb();
      }
    }, debounceTime),
    [cb, disabled],
  );
  return scrollHandler;
};
