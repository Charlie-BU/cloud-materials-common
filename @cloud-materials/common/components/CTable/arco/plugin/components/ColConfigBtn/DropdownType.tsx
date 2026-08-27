import type { FC } from 'react';
import React from 'react';
import type { DropdownProps } from '@arco-design/web-react';
import { Button, Divider, Checkbox, Dropdown, Menu } from '@arco-design/web-react';
import type { ColumnConfig } from '../../../types';
import { useCConfigContext } from '../../../../../CConfigProvider';
import type { Column } from '../../../../core/models/Column';
import { CheckboxItem } from './CheckboxItem';
import type { CommonProps } from './interface';
import { resetLocalStorageHiddenCols, getTooltip } from './utils';
import { usePrefix } from '../../../../react';

interface Props extends CommonProps {
  DropdownProps?: DropdownProps;
}

export const DropdownType: FC<Props> = props => {
  const {
    columns,
    defaultVisibleMap,
    DropdownProps,
    localStorageKey,
    showReset,
    tooltip: tooltipConfig,
    visible,
    setVisible,
    setLocalStorage,
    isColumnDisabled,
  } = props;
  const { locale, storage } = useCConfigContext();
  const prefixCls = usePrefix('comp-col-config-btn-dropdown');

  const isAllSelect = columns.every(c => c.visible);
  const isHalfSelect = columns.some(c => c.visible) && columns.some(c => !c.visible);

  const handleSelect = (col: Column) => {
    col.setVisible(!col.visible);
    setLocalStorage();
  };

  const handleSelectAll = () => {
    columns.filter(item => !isColumnDisabled(item.dataIndex)).forEach(c => c.setVisible(!isAllSelect));
    setLocalStorage();
  };

  const handleReset = () => {
    columns.forEach(c => c.setVisible(defaultVisibleMap[c.dataIndex]));
    resetLocalStorageHiddenCols(storage.localStorage, localStorageKey);
  };

  return (
    <Dropdown
      popupVisible={visible}
      position="br"
      triggerProps={{
        // 不使用 onVisibleChange 来控制，而是使用 onClickOutside 来手动控制，不然点击 Menu.Item 就会关闭菜单
        onClickOutside: () => {
          setVisible(false);
        },
      }}
      {...DropdownProps}
      droplist={
        <Menu className={`${prefixCls}`}>
          <Menu.Item key="selectAll">
            <span className={`${prefixCls}-select-all`} onClick={handleSelectAll}>
              <Checkbox checked={isAllSelect} indeterminate={isHalfSelect}>
                {locale.CTable.selectAll}
              </Checkbox>
            </span>
          </Menu.Item>
          {columns.map((item, idx) => {
            const { dataIndex = String(idx), tooltip: columnTooltip } = item.config as ColumnConfig<any>;
            const tooltip = getTooltip(tooltipConfig, dataIndex, columnTooltip);
            return (
              <Menu.Item key={dataIndex}>
                <CheckboxItem
                  value={item.visible}
                  onChange={() => handleSelect(item)}
                  disabled={isColumnDisabled(dataIndex)}
                  name={item.title}
                  tooltip={tooltip}
                />
              </Menu.Item>
            );
          })}
          <div className={`${prefixCls}-footer`}>
            {showReset && (
              <>
                <Divider className={`${prefixCls}-footer-divider`} />
                <div className={`${prefixCls}-footer-reset`}>
                  <Button className={`${prefixCls}-buttons-left`} onClick={handleReset}>
                    {locale.CTable.reset}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Menu>
      }
    >
      {props.children}
    </Dropdown>
  );
};
