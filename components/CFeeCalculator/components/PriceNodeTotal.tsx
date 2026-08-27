import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { testId } from '../utils/testId';
import classNames from 'classnames';
import type { GetPriceRes, PriceInfo } from '../interface';
import { omit } from 'lodash-es';
import CTable from '../../CTable';
import type { PopoverProps } from '@arco-design/web-react';
import { Empty, Popover } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { feePrefix } from '../utils/prefix';

interface PriceNodeTotalProps {
  // 全局popover属性
  popoverProps?: PopoverProps;
  // 价格配置
  priceConfig: PriceInfo;
  // 具体计算出来的价格：总价、折扣价、是否合法、是否退费
  priceDetail: GetPriceRes;
  // 货币符号
  monetaryUnit: string;
  // 货币代码
  monetaryCode?: string;
}

export const PriceNodeTotal: React.FC<PriceNodeTotalProps> = ({
  priceConfig,
  popoverProps,
  priceDetail,
  monetaryUnit,
  monetaryCode,
}) => {
  const { isRefund, isValid, totalPrice } = priceDetail;
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix(feePrefix);
  const config = CTable.getConfig({
    arcoTableProps: {
      border: true,
      size: 'small',
    },
    pagination: false,
    columns: priceConfig.columns ?? [],
    data: priceConfig.detailList ?? [],
    ...(priceConfig.cTableProps?.config ?? {}),
  });
  const { showPopover = true } = priceConfig;
  const customPopoverProps = priceConfig.popoverProps ?? popoverProps;
  return (
    <div
      className={classNames(cssPrefix`price-item-content`, {
        [cssPrefix`price-item-content-green`]: isRefund,
      })}
      data-cy={testId.priceNodeContent}
      data-testid={testId.priceNodeContent}
    >
      <span className={cssPrefix`price-item-content-symbol`}>{monetaryUnit}</span>
      <span
        className={classNames({
          [cssPrefix`price-item-content-total`]: true,
          [cssPrefix`price-item-content-no-total`]: !isValid,
        })}
      >
        {totalPrice}
      </span>
      {monetaryCode ? <span className={cssPrefix`price-item-content-code`}>{monetaryCode}</span> : null}
      {isValid ? (
        <span className={cssPrefix`price-item-content-unit`}>{priceConfig.unit ? `/${priceConfig.unit}` : ''}</span>
      ) : null}
      {showPopover ? (
        <Popover
          title={
            <div className={cssPrefix`price-item-content-popover-title`}>
              <div className={cssPrefix`price-item-content-popover-title-title`}>
                {priceConfig.detailTitle ?? locale.CFeeCalculator.detailTitle}
              </div>
              <div className={cssPrefix`price-item-content-popover-title-desc`}>
                {priceConfig.detailDesc ?? locale.CFeeCalculator.detailDescription}
              </div>
            </div>
          }
          style={{ maxWidth: 900, ...customPopoverProps?.style }}
          className={cssPrefix`price-item-content-popover`}
          content={
            priceConfig.detailList?.length ? (
              <div className={cssPrefix`price-item-content-popover-table-container`}>
                <CTable
                  config={config}
                  data-testid={testId.popoverTable}
                  data-cy={testId.popoverTable}
                  {...omit(priceConfig.cTableProps, 'config')}
                />
              </div>
            ) : (
              <Empty style={{ textAlign: 'center' }} />
            )
          }
          {...customPopoverProps}
        >
          <IconQuestionCircle className={cssPrefix`price-item-content-popover-icon`} />
        </Popover>
      ) : null}
    </div>
  );
};
