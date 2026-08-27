import React, { useEffect } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { List, Popover, Button, Space } from '@arco-design/web-react';
import { LogItem } from './LogItem';
import CLoadingV2 from '../../CLoadingV2';
import { IconTopAlign, IconBottomAlign } from '@arco-design/iconbox-react-ve-o-design';
import type { CLogProps } from '../interface';
import { testId } from '../dataCy';

export const Content = (props: Partial<CLogProps> & { listRef: any; state: { [key: string]: any } }) => {
  const { showSerialNumber, serialNumberType, formatSerial, renderItem, onClickItem, listRef, state } = props;
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('log');

  const {
    listProps,
    topDisabled,
    bottomDisabled,
    loading,
    serialWidth,
    showButton,
    keyWord,
    hasLoadMoreFn,
    noMoreData,
    keepLatest,
  } = state;

  // 配置 showLatest 时，自动展示最新的日志
  useEffect(() => {
    if (keepLatest && listProps.dataSource?.length > 0) {
      listRef.current?.scrollIntoView(listProps.dataSource.length - 1);
    }
  }, [listProps.dataSource, keepLatest, listRef]);

  const getScrollLoading = () => {
    if (listProps.dataSource?.length > 0 && hasLoadMoreFn) {
      if (noMoreData) {
        return locale.CLog.noMoreData;
      } else {
        return (
          <Space size={4}>
            <CLoadingV2.Spin size={16} />
            {locale.CLog.dataLoading}...
          </Space>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className={cssPrefix`content`}>
      {loading ? (
        <CLoadingV2.Spin loading={loading} arcoSpinProps={{ className: cssPrefix`content-loading` }} />
      ) : (
        <List
          style={{ border: 'none' }}
          listRef={listRef as any}
          render={(item, index) =>
            renderItem ? (
              renderItem?.(item, index)
            ) : (
              <LogItem
                index={index}
                data={item}
                showSerialNumber={showSerialNumber}
                serialNumberType={serialNumberType}
                serialWidth={serialWidth}
                keyWord={keyWord}
                formatSerial={formatSerial}
                onClickItem={onClickItem}
              />
            )
          }
          scrollLoading={getScrollLoading()}
          {...state.listProps}
        />
      )}
      {
        // NOTE: 有数据且出现滚动条的时候才展示
        showButton && (
          <div className={cssPrefix`content-btn`}>
            <Popover content={locale.CLog.toTop} position="left">
              <Button
                icon={<IconTopAlign />}
                size="mini"
                style={{ marginBottom: 8 }}
                disabled={topDisabled}
                onClick={() => {
                  listRef.current?.scrollIntoView(0);
                }}
                data-cy={testId.toTop}
                data-testid={testId.toTop}
              />
            </Popover>
            <Popover content={locale.CLog.toBottom} position="left">
              <Button
                icon={<IconBottomAlign />}
                size="mini"
                disabled={bottomDisabled}
                onClick={() => {
                  const index = listProps.dataSource ? listProps.dataSource.length - 1 : 0;
                  listRef.current?.scrollIntoView(index);
                }}
                data-cy={testId.toBottom}
                data-testid={testId.toBottom}
              />
            </Popover>
          </div>
        )
      }
    </div>
  );
};

export default Content;
