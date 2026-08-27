import React, { useEffect, useState } from 'react';
import type { CCodeBlockProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { Popover, Select, Tabs, Empty } from '@arco-design/web-react';
import Line from './components/Line';
import CCopy from '../CCopy';
import Download from './components/Download';
import { useCConfigContext } from '../CConfigProvider';
import CLoadingV2 from '../CLoadingV2';

const cssPrefix = classNamePrefixFactory('code-block');

export const testId = {
  select: cssPrefix`select`,
  tab: cssPrefix`tab`,
  downloadBtn: cssPrefix`download-btn`,
  customBtn: cssPrefix`custom-btn`,
  line: cssPrefix`line`,
  codeblock: cssPrefix``,
};

const CCodeBlock: React.FC<CCodeBlockProps> = props => {
  const { locale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('code-block');
  const iconCls = useCssPrefix('')`icon`;
  const {
    style,
    className,
    data,
    type = 'normal',
    title,
    tabTitles,
    selectOptions,
    operationGroup,
    loading = false,
    showRowNumber = true,
    arcoSelectProps,
    arcoTabsProps,
    onChangeTab,
    noDataElement,
  } = props;

  const TabPane = Tabs.TabPane;
  const Option = Select.Option;

  const [tabKey, setTabKey] = useState<string>(tabTitles ? tabTitles[0] : '');

  const currentCode = Array.isArray(data) ? data[tabTitles ? tabTitles.indexOf(tabKey) : 0] : data;

  const formatData = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return value;
    } else if (value) {
      const splitData = value.split('\n');
      return splitData;
    } else {
      return [];
    }
  };

  const [code, setCode] = useState(formatData(currentCode));

  useEffect(() => {
    setCode(formatData(currentCode));
  }, [currentCode]);

  // 根据最大的 number 的字符长度计算
  const numberWidth = `${code?.length + 1}`.length * 8;

  // normal模式下方的代码框
  const belowContent = (
    <CLoadingV2 type="block" loading={loading}>
      <pre className={classNames(cssPrefix`below-content`)}>
        {code?.length > 0 ? (
          <div className={classNames(cssPrefix`code-group`)}>
            {code.map((o, index) => (
              <Line index={index + 1} key={index} value={o} showRowNumber={showRowNumber} numberWidth={numberWidth} />
            ))}{' '}
          </div>
        ) : (
          noDataElement || <Empty />
        )}
        {operationGroup && (
          <div className={classNames(cssPrefix`operation-btn`)}>
            {operationGroup.map((item, index) => {
              if (item.type === 'download') {
                return <Download value={currentCode} fileName={item.fileName ?? 'code.txt'} key={index} />;
              } else if (item.type === 'copy') {
                return (
                  <CCopy
                    tooltip={locale.CCodeBlock.copyTooltip}
                    successMessage={locale.CCopy.successMessage}
                    text={currentCode}
                    failMessage={locale.CCopy.failMessage}
                    key={index}
                  />
                );
              } else if (item.render) {
                return (
                  <Popover key={index} content={item.popoverContent}>
                    <div
                      className={classNames(iconCls, cssPrefix`custom-icon`)}
                      onClick={item.onClick}
                      data-testid={testId.customBtn}
                    >
                      {' '}
                      {item.render}
                    </div>
                  </Popover>
                );
              }
            })}
          </div>
        )}
      </pre>
    </CLoadingV2>
  );
  if (type === 'simple') {
    return (
      <div
        style={style}
        className={classNames(cssPrefix`simple`, className, cssPrefix``)}
        data-testid={testId.codeblock}
      >
        {data}
      </div>
    );
  } else {
    return (
      <div
        style={style}
        className={classNames(cssPrefix`normal`, className, cssPrefix``)}
        data-testid={testId.codeblock}
      >
        {(selectOptions || title || tabTitles) && (
          <div className={classNames(cssPrefix`header`)}>
            {selectOptions && (
              <div className={classNames(cssPrefix`header-select`)}>
                <Select
                  placeholder={locale.CCodeBlock.selectPlaceholder}
                  bordered={false}
                  {...arcoSelectProps}
                  style={{ minWidth: 100 }}
                  data-testid={testId.select}
                >
                  {selectOptions.map((option, index) => (
                    <Option key={index} value={option} style={{ fontFamily: 'Menlo', fontSize: 10 }}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
            {title && <div className={classNames(cssPrefix`header-title`)}>{title}</div>}

            {tabTitles && (
              <div className={classNames(cssPrefix`header-tabs`)}>
                <Tabs
                  type={'text'}
                  onClickTab={key => {
                    onChangeTab ? onChangeTab(key) : setTabKey(key);
                  }}
                  {...arcoTabsProps}
                  data-testid={testId.tab}
                >
                  {tabTitles.map(item => {
                    return <TabPane key={item} title={item} />;
                  })}
                </Tabs>
              </div>
            )}
          </div>
        )}
        {belowContent}
      </div>
    );
  }
};

CCodeBlock.displayName = 'CCodeBlock';

export default CCodeBlock;
