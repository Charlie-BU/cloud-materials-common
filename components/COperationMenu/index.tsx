import React from 'react';
import type { COperationMenuProps } from './interface';
import classNames from 'classnames';
import { Button, Dropdown, Space, Menu } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import { useCOperationMenu } from './hooks';
import MenuList from './Component/MenuList';
import OperationWrapper from './Component/OperationWrapper';
import { useCConfigContext } from '../CConfigProvider';
import CButton from './Component/CButton';
import * as dataCy from './dataCy';

const COperationMenu: React.FC<COperationMenuProps> = props => {
  const {
    style,
    className,
    asyncOperations,
    spaceSize = 12,
    defaultButtonType,
    arcoButtonProps,
    menuButtonProps,
    maxMenuOperationNum = 8,
    renderDropdownButton,
  } = props;
  const [state, controls] = useCOperationMenu(props);
  const { outsideOperation, menuOperation, menuStatus, currentPop, dropdownProps } = state;
  const { setDropDownVisible, dropdownBtnClick, popVisibleChange, getAsyncOperations } = controls;
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('operation-menu');

  const showMenuBtn = (menuOperation && menuOperation.length > 0) || asyncOperations;

  const menuBtnType = menuButtonProps?.type || arcoButtonProps?.type || defaultButtonType;

  return (
    <div style={style} className={classNames(cssPrefix``, className)} data-cy={dataCy.container}>
      <Space size={spaceSize}>
        {outsideOperation?.map((o, i) => {
          const type = o.arcoButtonProps?.type || arcoButtonProps?.type || defaultButtonType;
          return (
            <OperationWrapper
              key={o.key}
              index={`${i}`}
              operation={o}
              currentPop={currentPop}
              popVisibleChange={popVisibleChange}
            >
              {o?.render ? (
                o?.render()
              ) : (
                <CButton
                  {...arcoButtonProps}
                  onClick={o?.onClick}
                  disabled={o?.disabled}
                  {...o.arcoButtonProps}
                  type={type}
                  className={classNames(cssPrefix`opt-btn`, o.arcoButtonProps?.className, arcoButtonProps?.className)}
                  data-testid={dataCy.btnItemId}
                  data-cy={dataCy.getButtonItemCy(o.index, o.name)}
                  data-cy-idx={dataCy.getButtonItemIndexCy(`${i}`)}
                >
                  {o.arcoButtonProps?.children || o?.name}
                </CButton>
              )}
            </OperationWrapper>
          );
        })}
        {showMenuBtn && (
          <Dropdown
            droplist={
              <Menu
                className={cssPrefix`dropdown-menu`}
                data-cy={dataCy.dropContainer}
                data-testid={dataCy.menuContainerId}
                triggerProps={{
                  className: cssPrefix`dropdown-popup-menu`,
                  popupAlign: {
                    right: 6,
                    left: 6,
                    bottom: 6,
                    top: 6,
                  },
                }}
              >
                <MenuList
                  menuOperation={menuOperation || []}
                  menuStatus={menuStatus}
                  getAsyncOperations={getAsyncOperations}
                  currentPop={currentPop}
                  popVisibleChange={popVisibleChange}
                  setDropDownVisible={setDropDownVisible}
                  maxMenuOperationNum={maxMenuOperationNum}
                />
              </Menu>
            }
            trigger="click"
            position="br"
            {...dropdownProps}
          >
            {renderDropdownButton ? (
              renderDropdownButton(dropdownBtnClick)
            ) : (
              <Button
                icon={<IconMore />}
                type={menuBtnType}
                onClick={dropdownBtnClick}
                {...arcoButtonProps}
                {...menuButtonProps}
                className={classNames(
                  cssPrefix`dropdown-button`,
                  arcoButtonProps?.className,
                  menuButtonProps?.className,
                )}
                data-cy={dataCy.dropButton}
                data-testid={dataCy.dropBtnId}
              />
            )}
          </Dropdown>
        )}
      </Space>
    </div>
  );
};

COperationMenu.displayName = 'COperationMenu';

export default COperationMenu;
