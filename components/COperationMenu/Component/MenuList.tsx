import React, { Fragment, useRef } from 'react';

import { Menu, Divider } from '@arco-design/web-react';
import type { Operation, CurrentDisplayPop, ExtraOperation } from '../interface';
import { MenuStatus } from '../interface';
import CLoadingV2 from '../../CLoadingV2';
import OperationWrapper from './OperationWrapper';
import { getGroupNumInMaxNum } from '../util';
import { useCConfigContext } from '../../CConfigProvider';
import { useMenu } from '../hooks';
import * as dataCy from '../dataCy';
import useLimitMaxRows from '../../hooks/useLimitMaxRows';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface MenuListProps {
  menuOperation: ExtraOperation[][];
  menuStatus: MenuStatus;
  currentPop?: CurrentDisplayPop;
  popVisibleChange: (val: CurrentDisplayPop, visible: boolean) => void;
  setDropDownVisible: (val: boolean) => void;
  maxMenuOperationNum: number;
  getAsyncOperations: () => void;
}

const MenuList = ({
  menuOperation,
  menuStatus,
  currentPop,
  popVisibleChange,
  setDropDownVisible,
  maxMenuOperationNum,
  getAsyncOperations,
}: MenuListProps) => {
  const [state, control] = useMenu();
  const { activeMenu } = state;
  const { clearActiveMenu, subMenuVisible } = control;
  const menuRef = useRef(null);
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('operation-menu');

  const dividerNum = getGroupNumInMaxNum(menuOperation, maxMenuOperationNum);

  useLimitMaxRows({ target: menuRef, maxRows: dividerNum + maxMenuOperationNum });

  const handleMenuClick = (opt: Operation) => {
    opt.onClick?.();
    clearActiveMenu();
    setDropDownVisible(false);
  };

  const renderMenuItem = (opt: ExtraOperation) => {
    if (opt?.subOperation) {
      const activeSubMenu = opt?.key === activeMenu || activeMenu?.split('.')?.includes(opt?.key);
      return (
        <SubMenu
          key={opt.key}
          title={opt.name}
          triggerProps={{
            onVisibleChange: visible => subMenuVisible(visible, opt.key),
          }}
          className={activeSubMenu ? cssPrefix`sub-menu-active` : ''}
        >
          {opt.subOperation.map((item: ExtraOperation) => {
            return renderMenuItem(item);
          })}
        </SubMenu>
      );
    }

    return (
      <MenuItem key={opt.key} onClick={() => handleMenuClick(opt)} disabled={opt.disabled} id={opt.name}>
        <OperationWrapper
          operation={opt}
          index={opt.index}
          currentPop={currentPop}
          popVisibleChange={popVisibleChange}
          setDropDownVisible={setDropDownVisible}
          inDropMenu={true}
        >
          {opt?.render ? (
            opt.render()
          ) : (
            <div
              data-cy={dataCy.getMenuItemCy(opt.index, opt.name)}
              data-cy-idx={dataCy.getMenuItemIndexCy(opt.index)}
              data-testid={dataCy.menuItemId}
            >
              {opt.name}
            </div>
          )}
        </OperationWrapper>
      </MenuItem>
    );
  };

  return (
    <CLoadingV2
      loading={menuStatus === MenuStatus['loading']}
      hasError={menuStatus === MenuStatus['error']}
      onReload={() => getAsyncOperations()}
      style={{ minWidth: 50, textAlign: 'center' }}
    >
      <div ref={menuRef} className={cssPrefix`dropdown-menu-container`}>
        {menuOperation.map((item, i) => (
          <Fragment key={i}>
            {item.map(opt => renderMenuItem(opt))}
            {i < menuOperation?.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </CLoadingV2>
  );
};

export default MenuList;
