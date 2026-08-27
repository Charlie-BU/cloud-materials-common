import type { FC } from 'react';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { observer } from '@formily/react';
import type { DropdownProps } from '@arco-design/web-react';
import { Popover, Button, Badge } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import { IconCheckTriangleFill } from '@arco-design/iconbox-react-ve-o-design';
import type { ToolbarItemRenderProps } from '../../../../core';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { DropdownType } from './DropdownType';
import { ModalType } from './ModalType';
import type { CModalProps } from '../../../../../CModal/interface';
import { getLocalStorageHiddenCols, setLocalStorageHiddenCols } from './utils';
import { usePrefix } from '../../../../react';
import { isArray } from 'lodash-es';

export interface ColConfigBtnProps {
  /**
   * 不在自定义列配置中展示的列的 dataIndex 数组
   */
  hiddenColsDataIndex?: string[];
  /**
   * 在自定义列配置中，禁止用户勾选/反选的列的 dataIndex 的数组
   */
  disabledColsDataIndex?: string[];
  /**
   * 如果配置该 prop, 则会将用户配置的隐藏的列存在 localStorage 中
   *
   * 注意: 建议 key 中包括产品名、场景、用户 ID，可以实现按每个用户、每个场景存放不同的配置，也可以加入 regionID
   */
  localStorageKey?: string;
  /**
   * 控件类型-下拉菜单 or 弹窗
   * @default 'dropdown'
   */
  type?: 'dropdown' | 'modal';
  /**
   * 是否显示「恢复默认」按钮
   * @default false
   */
  showReset?: boolean;
  /** CModal 组件的 props 配置 */
  CModalProps?: CModalProps;
  /** Dropdown 组件的 props 配置 */
  DropdownProps?: DropdownProps;
  /**
   * 名词释义，可以配置为 boolean 或 ReactNode
   *
   * 1. 如果想让所有列都显示 column 上配置的 tooltip, 则配置为 true 即可
   *
   * 2. 配置 false 或不配置则所有列的 tooltip 都不显示
   *
   * 3. 或者配置为对象，为每一列配置 ReactNode, 显示自定义的 tooltip; 或配置为 boolean 显示这一列配置的 tooltip
   */
  tooltip?: boolean | Record<string, React.ReactNode | boolean>;
  /**
   * 是否展示用户有自定义列配置时的右上角角标
   * @default true
   */
  showHasCustomConfigIcon?: boolean;
}

export const ColConfigBtn: FC<ColConfigBtnProps & ToolbarItemRenderProps> = observer(props => {
  const {
    table,
    disabledColsDataIndex = [],
    hiddenColsDataIndex = [],
    localStorageKey,
    type = 'dropdown',
    showReset = false,
    tooltip = false,
    CModalProps,
    DropdownProps,
    showHasCustomConfigIcon = true,
  } = props;
  const { locale, storage } = useCConfigContext();
  const [ready, setReady] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const colConfigBtnPrefix = usePrefix('comp-col-config-btn');

  const colConfigBadgePrefix = usePrefix('comp-col-config-badge');

  // todo: 数据清除机制

  // 把前端保存的逻辑全部收敛到 ColConfigBtn 组件中，避免耦合到领域模型层中
  // 存一份 column 的默认 visible 状态的 map
  // 存在 localStorage 中的是 hidden 的列，相比存 visible 的列兼容性更好
  const defaultVisibleMap = useMemo(() => {
    return table.columns.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr.dataIndex] = curr.visible;
      return acc;
    }, {});
  }, []);

  // 该列是否被禁止勾选
  const isColumnDisabled = (dataIndex: string) => disabledColsDataIndex.includes(dataIndex);

  // 先尝试从 localStorage 获取本地存储，获取完成后才渲染 Modal 或者 Dropdown
  // 使用 useLayoutEffect 阻塞渲染，目的是为了保证组件渲染时能获取正确的初始状态
  useLayoutEffect(() => {
    const hiddenCols = getLocalStorageHiddenCols(storage.localStorage, localStorageKey);
    if (isArray(hiddenCols)) {
      table.columns
        // 没有被禁用的列才能被设置
        .filter(c => !isColumnDisabled(c.dataIndex))
        .forEach(c => {
          c.setVisible(!hiddenCols.includes(c.dataIndex));
        });
    }
    setReady(true);
  }, []);

  // Dropdown 和 Modal 设置 localStorage 的逻辑是一样的，所以在父组件统一传递
  const setLocalStorage = () => {
    setLocalStorageHiddenCols(
      storage.localStorage,
      table.columns.filter(c => !c.hidden && !c.visible).map(c => c.dataIndex),
      localStorageKey,
    );
  };

  if (!ready) {
    return <Button className={`${colConfigBtnPrefix}-btn`} icon={<IconSettings />} />;
  }

  // 判断用户是否有自定义配置
  const hasCustomConfig = table.columns
    .filter(c => !c.hidden)
    .some(c => {
      return c.visible !== defaultVisibleMap[c.dataIndex];
    });

  const commonProps = {
    defaultVisibleMap,
    localStorageKey,
    showReset,
    columns: table.columns.filter(c => !c.hidden && !hiddenColsDataIndex.includes(c.dataIndex)),
    tooltip,
    setLocalStorage,
    isColumnDisabled,
  };

  // 由于 arco 组件的 React Portal 的一些问题，不能使用 Popover 包裹 Dropdown 或 Modal，否则鼠标移入 Dropdown 或 Modal 时也会冒泡触发 Popover
  // 因此将 Popover 作为 Dropdown 的子元素、作为 Modal 的兄弟元素，即可解决事件冒泡问题
  const getPopoverNode = () => {
    const buttonElement = (
      <Button
        className={`${colConfigBtnPrefix}-btn`}
        icon={<IconSettings />}
        onClick={() => {
          if (type === 'dropdown') {
            setDropdownVisible(true);
          } else {
            setModalVisible(true);
          }
        }}
      />
    );
    return (
      <Popover
        content={hasCustomConfig ? locale.CTable.hasCustomColConfig : locale.CTable.colConfig}
        title={hasCustomConfig ? locale.CTable.colConfig : ''}
      >
        {hasCustomConfig && showHasCustomConfigIcon ? (
          <Badge dotClassName={`${colConfigBadgePrefix}`} dot={true} count={<IconCheckTriangleFill />}>
            {buttonElement}
          </Badge>
        ) : (
          buttonElement
        )}
      </Popover>
    );
  };

  return (
    <>
      {type === 'dropdown' ? (
        <DropdownType
          {...commonProps}
          DropdownProps={DropdownProps}
          visible={dropdownVisible}
          setVisible={setDropdownVisible}
        >
          {getPopoverNode()}
        </DropdownType>
      ) : (
        <ModalType {...commonProps} CModalProps={CModalProps} visible={modalVisible} setVisible={setModalVisible}>
          {getPopoverNode()}
        </ModalType>
      )}
    </>
  );
});
