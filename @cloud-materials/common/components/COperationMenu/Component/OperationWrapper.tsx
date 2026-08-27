import type { PropsWithChildren } from 'react';
import React from 'react';
import { Popover, Popconfirm } from '@arco-design/web-react';
import type { OperationWrapperProps } from '../interface';
import { merge } from 'lodash-es';
import { useMenu } from '../hooks';
import * as dataCy from '../dataCy';

const OperationWrapper = (props: PropsWithChildren<OperationWrapperProps>) => {
  const { operation, inDropMenu, children, popVisibleChange, currentPop, setDropDownVisible, index } = props;
  const { arcoPopoverProps, arcoPopconfirmProps, tooltip } = operation;

  const [, control] = useMenu();
  const { clearActiveMenu } = control;

  // 在 popcomfirm 成功后需关闭下拉展示
  const handleConfirmOk = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await arcoPopconfirmProps?.onOk?.(e);
    } catch (error) {
      console.error('操作按钮 popconfirm 失败', error);
    } finally {
      setDropDownVisible?.(false);
      clearActiveMenu();
    }
  };

  // NOTE: 用于处理 arcoPopconfirmProps/arcoPopoverProps 时，生效范围不包括 Padding 部分
  let content = inDropMenu ? <div style={{ padding: '0 12px' }}>{children}</div> : children;

  if (arcoPopoverProps || tooltip) {
    const popPosition = inDropMenu ? 'right' : undefined;
    content = (
      <Popover
        position={popPosition}
        content={tooltip}
        {...arcoPopoverProps}
        triggerProps={{ updateOnScroll: true, ...arcoPopoverProps?.triggerProps }}
        popupVisible={currentPop?.name === operation?.key && currentPop?.type === 'popover'}
        onVisibleChange={v => popVisibleChange({ type: 'popover', name: operation.key }, v)}
      >
        {content}
      </Popover>
    );
  }

  if (arcoPopconfirmProps) {
    // 在下拉菜单内时应该默认使用左侧位置
    const position = inDropMenu ? 'top' : undefined;
    const btnDataProps = {
      'data-cy': inDropMenu
        ? dataCy.getMenuItemConfirmCy(operation.index, operation.name)
        : dataCy.getButtonItemConfirmCy(operation.index, operation.name),
      'data-cy-idx': inDropMenu ? dataCy.getMenuItemConfirmIndexCy(index) : dataCy.getButtonItemConfirmIndexCy(index),
    };

    const _arcoPopconfirmProps = merge({}, arcoPopconfirmProps, { okButtonProps: btnDataProps });

    content = (
      <Popconfirm
        position={position}
        disabled={operation.disabled} // 当操作被 disabled 时，应该禁止 popconfirm 弹出
        {..._arcoPopconfirmProps}
        onOk={handleConfirmOk}
        popupVisible={currentPop?.name === operation?.key && currentPop?.type === 'popconfirm'}
        onVisibleChange={v => popVisibleChange({ type: 'popconfirm', name: operation.key }, v)}
      >
        {content}
      </Popconfirm>
    );
  }

  /** 当有 popconfirm 时点击菜单不应关闭，所以停止冒泡 */
  return <div onClick={e => !!arcoPopconfirmProps && e.stopPropagation()}>{content}</div>;
};

export default OperationWrapper;
