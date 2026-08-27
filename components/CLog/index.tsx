import React, { useRef } from 'react';
import type { CLogProps } from './interface';
import classNames from 'classnames';
import { useCLog } from './hooks';
import { useCConfigContext } from '../CConfigProvider';
import Header from './Component/Header';
import Content from './Component/Content';
import { testId } from './dataCy';
import type { ListHandle } from '@arco-design/web-react/es/List/interface';

const CLog: React.FC<CLogProps> = props => {
  const {
    style,
    className,
    showSearch = true,
    title,
    cStatusProps,
    renderOperation,
    showSerialNumber = true,
    serialNumberType = 'number',
    formatSerial,
    renderItem,
    onClickItem,
    operationConfig,
    showLatest,
    extraHeaderContent,
    renderFooter,
  } = props;
  const listRef = useRef<ListHandle>(null);

  const [state, controls] = useCLog(props, listRef);

  const { theme, keyWord, isFullScreen, logData, ...restState } = state;

  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('log');

  return (
    <div
      style={style}
      className={classNames(cssPrefix``, className, {
        [cssPrefix`fullscreen`]: isFullScreen,
        [cssPrefix`black`]: theme === 'black',
      })}
      data-cy={testId.container}
      data-testid={testId.container}
    >
      <Header
        theme={theme}
        keyWord={keyWord}
        isFullScreen={isFullScreen}
        showSearch={showSearch}
        title={title}
        cStatusProps={cStatusProps}
        renderOperation={renderOperation}
        controls={controls}
        logData={logData}
        operationConfig={operationConfig}
        extraHeaderContent={extraHeaderContent}
      />
      <Content
        showSerialNumber={showSerialNumber}
        serialNumberType={serialNumberType}
        formatSerial={formatSerial}
        renderItem={renderItem}
        onClickItem={onClickItem}
        state={{ keyWord, ...restState }}
        listRef={listRef}
        showLatest={showLatest}
      />
      {renderFooter && <div className={cssPrefix`footer`}>{renderFooter()}</div>}
    </div>
  );
};

CLog.displayName = 'CLog';

export default CLog;
