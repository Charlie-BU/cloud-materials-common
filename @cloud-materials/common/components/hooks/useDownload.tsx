import React, { useMemo, useState } from 'react';
import type { PopoverProps } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
import { IconCheckCircleFill, IconCloseCircleFill } from '@arco-design/iconbox-react-ve-o-design';

/**
 * @title CCodeBlockHooksProps
 */
export interface CDownloadHooksProps {
  /** 下载内容 */
  value: string;
  /** 下载文件名称 格式为 文件名.后缀 */
  fileName: string;
  /** 复制成功后的提示内容 */
  successMessage?: React.ReactNode;
  /** 复制失败后的提示内容 */
  failMessage?: React.ReactNode;
  /** arcoPopover 属性透传 */
  arcoPopoverProps?: PopoverProps;
  /** tooltip显示文字 */
  tooltip?: string;
}

export const useDownload = (props: CDownloadHooksProps) => {
  const [result, setResult] = useState<boolean>();
  const [visible, setVisible] = useState(false);
  const { locale } = useCConfigContext();
  const {
    value,
    fileName,
    successMessage = locale.useDownload.successMsg,
    failMessage = locale.useDownload.failMsg,
    arcoPopoverProps = {},
    tooltip = locale.useDownload.download,
  } = props;

  const clearResult = () => setResult(undefined);

  // 来源：https://juejin.cn/post/6844904069958467592
  const downloadFile = () => {
    const file = new Blob([value], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(file);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setResult(true);
    URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  const getResultContent = (result: boolean) => {
    const Icon = result ? IconCheckCircleFill : IconCloseCircleFill;
    const message = result ? successMessage : failMessage;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon style={{ marginRight: '4px' }} />
        <span>{message}</span>
      </div>
    );
  };

  const downloadProps = useMemo(() => {
    const { onVisibleChange, content: _content, ...others } = arcoPopoverProps;
    const isDownload = typeof result === 'boolean';

    if (isDownload) {
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

  const controls = { downloadFile, clearResult };

  return [downloadProps, controls] as const;
};
