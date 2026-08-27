import React, { useMemo, useState } from 'react';
import type { CCopyHooksProps } from './interface';
import copy from 'copy-to-clipboard';
import { IconCheckCircleFill, IconCloseCircleFill } from '@arco-design/iconbox-react-ve-o-design';
import { useCConfigContext } from '../CConfigProvider';

export const useCCopy = (props: CCopyHooksProps) => {
  const [result, setResult] = useState<boolean>();
  const [visible, setVisible] = useState(false);
  const { locale } = useCConfigContext();
  const {
    text,
    options,
    onCopy,
    successMessage = locale.CCopy.successMessage,
    failMessage = locale.CCopy.failMessage,
    tooltip,
    disabled,
    arcoPopoverProps = {},
  } = props;

  const clearResult = () => setResult(undefined);

  const handleCopy = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    const result = copy(text, options);
    onCopy?.(text, result);
    setResult(result);
  };

  const getResultContent = (result: boolean) => {
    const Icon = result ? IconCheckCircleFill : IconCloseCircleFill;
    const message = result ? successMessage : failMessage;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon style={{ marginRight: '4px', fontSize: 14 }} />
        <span>{message}</span>
      </div>
    );
  };

  const copyProps = useMemo(() => {
    const { onVisibleChange, content: _content, ...others } = arcoPopoverProps;
    const isCopied = typeof result === 'boolean';

    if (isCopied) {
      return {
        message: result ? successMessage : failMessage,
        success: result,
        fail: !result,
        arcoPopoverProps: {
          content: getResultContent(result),
          popupVisible: true,
          onVisibleChange: (visible: boolean) => {
            if (!visible) {
              clearResult();
            }
            onVisibleChange?.(visible);
            setVisible(visible);
          },
          ...others,
        },
      };
    }

    return {
      arcoPopoverProps: {
        content: tooltip,
        popupVisible: visible && Boolean(tooltip || arcoPopoverProps.content),
        onVisibleChange: (visible: boolean) => {
          onVisibleChange?.(visible);
          setVisible(visible);
        },
        ...others,
      },
    };
  }, [result, visible]);

  const controls = { handleCopy, clearResult };

  return [copyProps, controls] as const;
};
