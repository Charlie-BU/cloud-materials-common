import React, { useContext } from 'react';
import { Popover, Radio } from '@arco-design/web-react';
import type { CRadioProps, CRadioOuterProps, GroupOption } from './interface';
import classNames from 'classnames';
import { BtnSelectorContent, BtnBadge } from '../_components/BtnSelector';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import GroupConfigContext from './context';
import { getBtnDataSuffix } from '../_components/BtnSelector/util';
import { isFunction } from 'lodash-es';

function InnerCRadio<T>(props: CRadioProps<T>, ref: React.Ref<HTMLDivElement>) {
  const { useCssPrefix } = useContext(CConfigContext);
  const groupConfigContext = useContext(GroupConfigContext);
  const {
    textLineType = 'single',
    horizontalLayout = 'center',
    iconLayout,
    widthSize,
    heightSize = 'default',
    radioProps = {},
    type = 'button',
  } = groupConfigContext;
  const { style: radioPropsStyle, className: radioPropsClass, ...restRadioProps } = radioProps;
  // CRadio特有样式
  const prefixCls = useCssPrefix('radio');
  // 分段选择器通用样式
  const btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
  const { tag, CTagProps, children, className, style, arcoPopoverProps, ...restProps } = props;
  // @ts-ignore
  const option: GroupOption | undefined = props?.['data-inner-option'];
  const getBtnDataCy = getBtnDataSuffix({ props });
  // 可以通过传入函数类型的 children 来自定义渲染单选节点。
  const isCustomRender = isFunction(children);

  return (
    <div
      ref={ref}
      data-cy={getBtnDataCy(testId.cRadioContainer)}
      data-testid={getBtnDataCy(testId.cRadioContainer)}
      className={classNames(btnSelectorCommonPrefixCls`badge-container`, prefixCls`badge-container`)}
    >
      {!isCustomRender ? <BtnBadge tag={tag} CTagProps={CTagProps} /> : null}
      {/* 
        arco 2.59.0 新特性：Popover 组件内容为空时不显示弹出框
        由于部分业务锁定了 低版本的arco，这里添加 disabled，避免展示空的 popover
       */}
      <Popover disabled={!arcoPopoverProps} {...arcoPopoverProps}>
        {/* 
        这里添加一层 span 的原因是：在 Radio 为禁用状态时，自定义的className会被Popover组件影响，无法挂在Radio上
        参考工单：https://oncall.bytedance.net/admin/review/all?id=42153281&picked_detail=null&current_page=1&page_size=10&filter_fields=%255B%257B%2522field%2522%3A%2522id%2522%2C%2522value%2522%3A%255B%252242153281%2522%255D%2C%2522operator%2522%3A%2522in%2522%257D%255D&extra_arguments=%255B%255D 
        */}
        <span
          className={classNames({
            [prefixCls`popover-inner`]: !isCustomRender,
            [prefixCls`popover-inner-button`]: !isCustomRender && type === 'button',
          })}
        >
          <Radio
            className={classNames(
              {
                [btnSelectorCommonPrefixCls`doubleline-item`]: !isCustomRender && textLineType === 'double',
                [btnSelectorCommonPrefixCls`singleline-item`]: !isCustomRender && textLineType !== 'double',
                [btnSelectorCommonPrefixCls`item`]: !isCustomRender,
              },
              radioPropsClass,
              className,
            )}
            style={{
              ...(typeof widthSize === 'number' ? { width: widthSize } : {}),
              ...(typeof heightSize === 'number' ? { height: heightSize } : {}),
              ...radioPropsStyle,
              ...style,
            }}
            {...restProps}
            {...restRadioProps}
            data-cy={getBtnDataCy(testId.arcoRadioContainer)}
            data-testid={getBtnDataCy(testId.arcoRadioContainer)}
          >
            {!isCustomRender ? (
              <BtnSelectorContent
                option={option}
                textLineType={textLineType}
                iconLayout={iconLayout}
                horizontalLayout={horizontalLayout}
              >
                {children}
              </BtnSelectorContent>
            ) : (
              ({ checked }) => children({ checked })
            )}
          </Radio>
        </span>
      </Popover>
    </div>
  );
}

export const CRadio = React.forwardRef(InnerCRadio) as unknown as CRadioOuterProps;
