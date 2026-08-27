import React, { useRef, useState } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconDown, IconPlus } from '@arco-design/iconbox-react-ve-o-design';
import type { CAddButtonProps } from './interface';
import { Dropdown, Popover } from '@arco-design/web-react';
import { useHover } from 'ahooks';
import { useCConfigContext } from '../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('add-button');
export const testId = {
  container: cssPrefix`container`,
  popover: cssPrefix`popover`,
  dropdown: cssPrefix`dropdown`,
  button: cssPrefix`button`,
  addIcon: cssPrefix`add-icon`,
  text: cssPrefix`text`,
  dropdownIcon: cssPrefix`dropdown-icon`,
};

const CAddButton: React.FC<CAddButtonProps> = props => {
  const {
    type,
    onClick,
    text,
    enableAddCount = Number.MAX_SAFE_INTEGER,
    showEnableAddTips = false,
    customTips,
    disabled = false,
    popoverContent,
    dropdownList,
    arcoPopoverProps = {},
    arcoDropdownProps = {},
    style,
    className,
    htmlType = 'button',
    ...basicProps
  } = props;
  const btnRef = useRef(null);
  const isHovering = useHover(btnRef);
  const [isActive, setIsActive] = useState<boolean>(false);

  // 按钮的disabled状态
  const btnDisabled = disabled || !enableAddCount;
  const dashedDisabled = btnDisabled && type === 'dashed';

  // 下拉属性的渲染
  const showDropdownIcon = dropdownList || arcoDropdownProps?.droplist;
  dropdownList && Object.assign(arcoDropdownProps, { droplist: dropdownList });

  // 防止popover属性为空时展示空气泡框
  const popoverDisabled = !popoverContent && !arcoPopoverProps?.content;
  popoverContent && Object.assign(arcoPopoverProps, { content: popoverContent });

  /** showEnableAddTips或者传入customTips时都可展示tips，自定义tips优先级高 */
  const showTips = showEnableAddTips || Boolean(customTips);

  const { locale, formatLocale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('add-button');
  const defaultTips = formatLocale(locale.CAddButton.defaultTips, { enableAddCount });

  return (
    <div
      style={style}
      className={classNames(
        cssPrefix``,
        cssPrefix`${type}-container`,
        dashedDisabled && cssPrefix`dashed-container-disabled`,
        className,
      )}
      data-cy={testId.container}
      {...basicProps}
    >
      <Popover disabled={popoverDisabled} {...arcoPopoverProps} data-cy={testId.popover}>
        <Dropdown {...arcoDropdownProps} disabled={btnDisabled} data-cy={testId.dropdown}>
          <button
            type={htmlType}
            ref={btnRef}
            onClick={() => {
              onClick?.();
              setIsActive(false);
            }}
            className={classNames(
              cssPrefix`btn`,
              cssPrefix`${type}`,
              isHovering && cssPrefix`${type}-hover`,
              isActive && cssPrefix`${type}-active`,
            )}
            data-cy={testId.button}
            data-testid={testId.button}
            onMouseDown={() => setIsActive(true)}
          >
            <span className={classNames(cssPrefix`btn-icon`, cssPrefix`${type}-icon`)} data-cy={testId.addIcon}>
              <IconPlus />
            </span>
            {text && (
              <span className={classNames(cssPrefix`btn-text`, cssPrefix`${type}-text`)} data-cy={testId.text}>
                {text}
              </span>
            )}
            {showDropdownIcon && (
              <span
                className={classNames(cssPrefix`btn-drop-icon`, cssPrefix`${type}-drop-icon`)}
                data-cy={testId.dropdownIcon}
              >
                <IconDown />
              </span>
            )}
          </button>
        </Dropdown>
      </Popover>

      {showTips && type !== 'dashed' && <span className={cssPrefix`tips`}>{customTips || defaultTips}</span>}
    </div>
  );
};

CAddButton.displayName = 'CAddButton';

export default CAddButton;
