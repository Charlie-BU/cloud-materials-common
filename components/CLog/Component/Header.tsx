import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { Input, Space } from '@arco-design/web-react';
import type { CStatusProps } from '../../CStatus';
import type { COperationMenuProps, Operation, OperationList } from '../../COperationMenu/interface';
import CStatus from '../../CStatus';
import COperationMenu from '../../COperationMenu';
import {
  IconSearch,
  IconContrastAlt,
  IconFullscreen,
  IconFullscreenExit,
  IconDownload,
} from '@arco-design/iconbox-react-ve-o-design';
import cls from 'classnames';
import { testId } from '../dataCy';
import { DefaultOperationEnum } from '../interface';
import type { OperationItem, LogDataItem } from '../interface';
import { get, isEmpty } from 'lodash-es';

interface HeaderProps {
  cStatusProps?: CStatusProps;
  title?: React.ReactNode;
  showSearch?: boolean;
  keyWord?: string;
  theme: 'white' | 'black';
  isFullScreen: boolean;
  feedbackType?: 'error' | 'success';
  renderOperation?: (val?: COperationMenuProps) => React.ReactNode;
  controls: any;
  logData?: LogDataItem[];
  operationConfig?: { displayNum?: number; operations?: OperationItem[] };
  extraHeaderContent?: React.ReactNode;
}
const defaultOperationProps: COperationMenuProps = {
  defaultButtonType: 'outline',
  arcoButtonProps: { size: 'mini' },
  displayNum: 3,
};

export const Header = ({
  cStatusProps,
  title,
  showSearch,
  keyWord,
  renderOperation,
  theme,
  isFullScreen,
  controls,
  logData,
  operationConfig,
  extraHeaderContent,
}: HeaderProps) => {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('log');

  const defaultOperationNameMap: Record<DefaultOperationEnum, string> = {
    theme: locale.CLog.theme,
    download: locale.CLog.download,
    fullScreen: isFullScreen ? locale.CLog.exitFullscreen : locale.CLog.fullscreen,
  };

  const defaultOperationMap: Record<DefaultOperationEnum, Operation> = {
    theme: {
      onClick: () => controls.onThemeChange(),
      arcoButtonProps: {
        icon: <IconContrastAlt className={theme === 'black' ? 'theme-tran' : ''} />,
        iconOnly: true,
      },
      arcoPopoverProps: { content: locale.CLog.theme, position: isFullScreen ? 'bottom' : 'top' },
    },
    download: {
      onClick: () => controls.onDownload(),
      arcoButtonProps: {
        icon: <IconDownload />,
        iconOnly: true,
        disabled: !logData || logData?.length === 0,
      },
      arcoPopoverProps: {
        content: !logData || logData?.length === 0 ? locale.CLog.noData : locale.CLog.download,
        position: isFullScreen ? 'bottom' : 'top',
      },
    },
    fullScreen: {
      onClick: () => controls.onFullScreenChange(),
      arcoButtonProps: {
        icon: isFullScreen ? <IconFullscreenExit /> : <IconFullscreen />,
        iconOnly: true,
      },
      arcoPopoverProps: {
        content: isFullScreen ? locale.CLog.exitFullscreen : locale.CLog.fullscreen,
        position: isFullScreen ? 'bottom' : 'top',
      },
    },
  };

  const defaultOperation = [DefaultOperationEnum.theme, DefaultOperationEnum.download, DefaultOperationEnum.fullScreen];

  const getOperationConfig = () => {
    // 无配置时，默认展示组件自带的三个按钮
    if (!operationConfig) {
      const operations = defaultOperation.map(o => defaultOperationMap[o]);
      return {
        ...defaultOperationProps,
        operations,
      };
    } else {
      const operations = operationConfig?.operations?.map((o: OperationItem, index: number) => {
        if (o.hasOwnProperty('type')) {
          // 使用 get 忽略下 ts
          if (get(o, 'type') && defaultOperation.includes(get(o, 'type', DefaultOperationEnum.theme))) {
            let operation = defaultOperationMap[get(o, 'type', DefaultOperationEnum.theme)];
            if (index >= (operationConfig?.displayNum || 3)) {
              operation = { ...operation, name: defaultOperationNameMap[get(o, 'type', DefaultOperationEnum.theme)] };
            }
            return operation;
          }
        } else {
          return o;
        }
      });

      if (!operations || operations?.length === 0) {
        return undefined;
      }
      return {
        ...operations,
        ...defaultOperationProps,
        displayNum: operationConfig?.displayNum || defaultOperationProps?.displayNum,
        operations: operations as OperationList,
      };
    }
  };

  const operationMenuProps = getOperationConfig();

  const hasDefaultHeader = !isEmpty(cStatusProps) || title || operationMenuProps || showSearch;

  return (
    <div className={cls(cssPrefix`header`)} data-cy={testId.header}>
      {hasDefaultHeader && (
        <div className={cssPrefix`header-content-wp`}>
          <div className={cssPrefix`header-content`}>
            <Space className={cssPrefix`header-title`} size={12}>
              {cStatusProps && <CStatus {...cStatusProps} />}
              {title && <div className={cssPrefix`header-title-content`}>{title}</div>}
            </Space>
            {renderOperation ? (
              renderOperation(operationMenuProps)
            ) : (
              <Space className={cssPrefix`header-operation`} size={24}>
                {showSearch && (
                  <Input
                    prefix={<IconSearch />}
                    placeholder={locale.CLog.placeholder}
                    style={{ width: 240 }}
                    value={keyWord}
                    onChange={controls.onSearch}
                  />
                )}
                {operationMenuProps && <COperationMenu {...operationMenuProps} />}
              </Space>
            )}
          </div>
        </div>
      )}

      {extraHeaderContent && extraHeaderContent}
    </div>
  );
};

export default Header;
