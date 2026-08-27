import { useUpdateEffect } from 'ahooks';
import React, { useRef, useState } from 'react';
import { useMaskableContext } from '../components';
import type { BaseProps } from '../interface';
import { Popconfirm } from '@arco-design/web-react';
import { isFunction } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';

export interface UseFooterProps extends BaseProps {
  componentName: string;
}

export const useFooter = ({
  visible,
  onOk,
  onCancel,
  confirmOnOk,
  footer,
  hideCancel,
  componentName,
}: UseFooterProps) => {
  const { createLogger } = useCConfigContext();
  const logger = createLogger(componentName);
  const [innerVisible, setVisible] = useState(Boolean(visible));
  const [confirmLoading, setConfirmLoading] = useState(false);
  const isNotControlled = typeof visible === 'number';
  const { onOkGuardPool } = useMaskableContext();
  const onOkArgsRef = useRef<unknown[]>([]);
  const shouldOkConfirm = Boolean(confirmOnOk && !confirmOnOk.disabled);

  useUpdateEffect(() => {
    setVisible(Boolean(visible));
  }, [visible]);

  const handleOk = async (...args: any[]) => {
    const allowContinue =
      onOkGuardPool.length === 0 ||
      (await Promise.all(onOkGuardPool.map(guard => guard())).then(result => result.every(Boolean)));

    // 有任何一个Guard返回了false，则终止onOK并不去隐藏组件
    if (!allowContinue) {
      return;
    }

    try {
      setConfirmLoading(true);
      await onOk?.(...args);

      if (isNotControlled) {
        setVisible(false);
      }
    } catch (error) {
      logger.error({ error, message: 'onOk error' });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = (...args: any[]) => {
    if (isNotControlled) {
      setVisible(false);
    }
    onCancel?.(...args);
  };

  const renderFooter = (cancelButtonNode: React.ReactNode, okButtonNode: React.ReactNode) => {
    const newOkButtonNode = confirmOnOk ? (
      <Popconfirm
        {...confirmOnOk}
        onOk={(...args) => Promise.resolve(confirmOnOk.onOk?.(...args)).then(() => handleOk(...onOkArgsRef.current))}
      >
        {okButtonNode}
      </Popconfirm>
    ) : (
      okButtonNode
    );
    return isFunction(footer)
      ? footer(cancelButtonNode, newOkButtonNode)
      : footer ?? (
          <>
            {!hideCancel && cancelButtonNode}
            {newOkButtonNode}
          </>
        );
  };

  return [
    {
      onOk: (...args: unknown[]) => {
        if (shouldOkConfirm) {
          onOkArgsRef.current = args;
          return;
        }

        return handleOk(...args);
      },
      onCancel: handleCancel,
      visible: innerVisible,
      confirmLoading,
      footer: footer === null ? null : renderFooter,
    },
    { setVisible },
  ] as const;
};
