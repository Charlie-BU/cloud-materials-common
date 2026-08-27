import { Popover, Spin, Tag } from '@arco-design/web-react';
import stringify from 'fast-json-stable-stringify';
import type { ReactNode } from 'react';
import React from 'react';
import CEllipsis from '../CEllipsis';
import type { DataSource, SelectOption, Option } from './interface';
import { testId } from './dataCy';
import { isNumber, isObject } from 'lodash-es';
import CCopy from '../CCopy';
import type { OptionInfo } from '@arco-design/web-react/es/Select/interface';
import type { CLocale } from '../locales/default';

export const loadingSpin = (loading: boolean) => (
  <Spin
    size={20}
    style={{
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      textAlign: 'center',
      transition: 'all .5s',
      opacity: loading ? 1 : 0,
      pointerEvents: 'none',
      background: 'linear-gradient(transparent, #FFFFFF)',
    }}
  />
);

interface RenderToolTipContentProps {
  item: any;
  cssPrefix: any;
  locale: CLocale;
  isTextOverflow?: boolean;
  value?: string | number;
}

const renderToolTipContent = ({ item, cssPrefix, locale, isTextOverflow, value }: RenderToolTipContentProps) => {
  if ((!item || !item['select-tagLabel']) && value) {
    return (
      <div className={cssPrefix`tooltip-label`} data-testid={testId.tooltipLabelId}>
        {value}
      </div>
    );
  }
  if (!!item?.disabled) {
    return (
      <div>
        {isTextOverflow && (
          <>
            <div className={cssPrefix`tooltip-label`} data-testid={testId.tooltipLabelId}>
              {item?.label || item?.['select-tagLabel']}
            </div>
            <div className={cssPrefix`tooltip-des`} data-testid={testId.tooltipDesId}>
              {item?.description || item?.['select-description']}
            </div>
          </>
        )}
        {item?.disabledTooltipContent && (
          <span className={cssPrefix`tooltip-des`}>
            {locale.CAsyncSelect.disabledReason}：{item?.disabledTooltipContent}
          </span>
        )}
      </div>
    );
  }
  return (
    <div>
      <div className={cssPrefix`tooltip-label`} data-testid={testId.tooltipLabelId}>
        {item?.label || item?.['select-tagLabel']}
      </div>
      <div className={cssPrefix`tooltip-des`} data-testid={testId.tooltipDesId}>
        {item?.description || item?.['select-description']}
      </div>
    </div>
  );
};

const renderToolTipContentMaxTag = (needShowExtraOptions: OptionInfo[], cssPrefix: any, locale: CLocale) => {
  const needShowExtraLabels = needShowExtraOptions.map(item => item?.extra?.['select-tagLabel']);
  return (
    <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <div className={cssPrefix`tag-label`}>
        {needShowExtraLabels.map(item => {
          return (
            <CEllipsis
              className={cssPrefix`tag-label-div`}
              showPopover={false}
              suffix={<CCopy className={cssPrefix`tag-label-copy`} text={item} />}
              key={item?.value || item?.extra?.['select-tagLabel']}
            >
              <span>{item}</span>
            </CEllipsis>
          );
        })}
      </div>
      <div className={cssPrefix`tag-label-copy-div`}>
        <CCopy text={needShowExtraLabels.join(', ')}>
          <div className={cssPrefix`tag-label-copy-content`}>{locale.CAsyncSelect.copyAll}</div>
        </CCopy>
        <span
          className={cssPrefix`tag-label-count`}
        >{`${needShowExtraLabels?.length}${locale.CAsyncSelect.items}`}</span>
      </div>
    </div>
  );
};

export const defaultRenderTag = (
  selectedOptions: OptionInfo | OptionInfo[],
  tagProps: {
    label: { 'select-tagLabel': string; 'select-description'?: string };
    value: string;
    onClose: (event: any) => void;
  },
  cssPrefix: any,
  index: number,
  showMaxTagToolTip: boolean,
  locale: CLocale,
  maxTagCount?:
    | number
    | 'responsive'
    | {
        count: number | 'responsive';
        render?: (invisibleTagCount: number) => ReactNode;
      },
  prefixCls?: string,
) => {
  const { label, value, onClose } = tagProps;
  let isMaxTagLabel = false;
  let needShowExtraOptions: OptionInfo[] = [];
  if (!!maxTagCount) {
    const maxTagCountNumber = isObject(maxTagCount) ? maxTagCount.count : maxTagCount;
    if (isNumber(maxTagCountNumber)) {
      // arco 2.62.0 版本新增 'responsive' 能力，本组件暂时不支持该特性下的tooltip展示
      isMaxTagLabel = index >= maxTagCountNumber;
      if (isMaxTagLabel && Array.isArray(selectedOptions)) {
        needShowExtraOptions = selectedOptions.slice(maxTagCountNumber);
      }
    }
  }

  if (isMaxTagLabel) {
    if (showMaxTagToolTip) {
      return (
        <Popover
          content={renderToolTipContentMaxTag(needShowExtraOptions, cssPrefix, locale)}
          position={'top'}
          triggerProps={{ style: { width: 380 } }}
        >
          <Tag
            closable={false}
            onClose={onClose}
            className={`${prefixCls}-input-tag-tag`}
            data-testid={testId.maxTagId}
          >
            {label || value}
          </Tag>
        </Popover>
      );
    }
    return (
      <Tag closable={false} onClose={onClose} className={`${prefixCls}-input-tag-tag`}>
        {label || value}
      </Tag>
    );
  } else {
    return (
      <Popover content={renderToolTipContent({ item: label, cssPrefix, locale, value })} position={'right'}>
        <Tag closable={true} onClose={onClose} className={`${prefixCls}-input-tag-tag`}>
          {label?.['select-tagLabel'] || value}
        </Tag>
      </Popover>
    );
  }
};

function isPrimitiveOption(option: Option): option is number | string {
  return typeof option === 'string' || typeof option === 'number';
}

/**
 * 渲染Option的方法
 */

export const renderOptions = (
  data: DataSource | undefined,
  cssPrefix: any,
  locale: CLocale,
  optionMode?: 'singleRow' | 'doubleRow' | 'customize',
  enableCopy?: boolean,
) => {
  //如果数据结构异常，返回空数组
  if (!data || !data.list) return [];
  //下面的逻辑都是data?.list是Option[]类型的

  const renderLabelsForSingleRow = (item: SelectOption) => {
    return (
      <div className={enableCopy ? cssPrefix`option-ellipsis` : ''}>
        <CEllipsis
          arcoPopoverProps={{
            position: 'right',
          }}
          popoverContent={isTextOverflow => renderToolTipContent({ item, cssPrefix, locale, isTextOverflow })}
          showPopover={(item?.disabled && !!item?.disabledTooltipContent) || 'auto'}
        >
          <span>
            <span className={cssPrefix`single-label`} data-testid={testId.singleLabelId}>
              {item?.label}
            </span>
            <span className={cssPrefix`single-des`} data-testid={testId.singleDesId}>
              {item?.description}
            </span>
          </span>
        </CEllipsis>
        {enableCopy && <CCopy className={cssPrefix`tag-label-copy`} text={(item?.label || item?.value) as any} />}
      </div>
    );
  };

  const renderLabelsForDoubleRow = (item: SelectOption) => {
    return (
      <div className={enableCopy ? cssPrefix`option-ellipsis-double` : ''}>
        <CEllipsis
          arcoPopoverProps={{
            position: 'right',
          }}
          popoverContent={isTextOverflow => renderToolTipContent({ item, cssPrefix, locale, isTextOverflow })}
          className={cssPrefix`ellipsis`}
          showPopover={(item?.disabled && !!item?.disabledTooltipContent) || 'auto'}
        >
          <span>
            <span className={cssPrefix`double-label`} data-testid={testId.doubleLabelId}>
              {item?.label}
            </span>
            <span className={cssPrefix`double-des`} data-testid={testId.doubleDesId}>
              {item?.description}
            </span>
          </span>
        </CEllipsis>
        {enableCopy && <CCopy className={cssPrefix`tag-label-copy`} text={(item?.label || item?.value) as any} />}
      </div>
    );
  };
  const recombinationExtra = (item: SelectOption) => {
    if (item?.extra) {
      return { ...item.extra, 'select-tagLabel': item?.label, 'select-description': item?.description };
    }
    return { 'select-tagLabel': item?.label, 'select-description': item?.description };
  };

  const newDataList = data?.list.map((item: Option) => {
    //如果data?.list是number或者string类型直接返回
    if (isPrimitiveOption(item)) {
      return item;
      //如果data?.list是Option类型需要跟mode进行样式处理
    }
    if (optionMode === 'doubleRow') {
      return {
        ...item,
        label: renderLabelsForDoubleRow(item),
        value: item?.value,
        disabled: item?.disabled,
        extra: recombinationExtra(item),
      };
    }
    if (optionMode === 'singleRow') {
      return {
        ...item,
        label: renderLabelsForSingleRow(item),
        value: item?.value,
        disabled: item?.disabled,
        extra: recombinationExtra(item),
      };
    }
    return {
      ...item,
      label: item?.label,
      value: item?.value,
      disabled: item?.disabled,
      extra: recombinationExtra(item),
    };
  });
  return newDataList;
};

/**
 * 获得第一个可选的option，直接返回用户配置的选项
 */
export const getAutoLoadFirstValue = (options: Option[], mode?: string) => {
  const target = options.find(option => isPrimitiveOption(option) || !option.disabled);
  if (!target) return undefined;
  if (mode === 'multiple') return [target];
  else return target;
};

/**
 * 合并两个 option 列表, 重复的 option 保留一个
 */

export const mergeOptions = (initial: Option[], cur: Option[]): Option[] => {
  // 序列化之后才能正确合并
  const initialStrList = initial.map(item => stringify(item));
  const curStrList = cur.map(item => stringify(item));
  // 只保留不在 cur 中的 initial option
  const finalInitial = initial.filter((_, idx) => !curStrList.includes(initialStrList[idx]));
  return [...finalInitial, ...cur];
};
