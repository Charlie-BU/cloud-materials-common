import { useState, useRef, useMemo } from 'react';
import type { CurrentDisplayPop, ExtraOperation, COperationMenuProps } from './interface';
import { MenuStatus } from './interface';
import { getDisplayOperation, groupOperation } from './util';
import { merge } from 'lodash-es';
import { useCConfigContext } from '../CConfigProvider';

export const useCOperationMenu = (props: COperationMenuProps) => {
  const {
    displayNum = 2,
    operations,
    asyncOperations,
    reloadOperationEachClick,
    onMenuBtnClick,
    arcoDropdownProps,
  } = props;
  const [menuStatus, setMenuStatus] = useState<MenuStatus>(MenuStatus['success']);
  const [currentPop, setCurrentPop] = useState<CurrentDisplayPop>();
  const [dropdownVisible, setDropDownVisible] = useState<boolean>(false);
  const { createLogger } = useCConfigContext();
  const logger = createLogger('COperationMenu');

  // 该ref用于标记是否已经加载过异步菜单
  const loadedRef = useRef<boolean>(false);

  // dropdownMenu array
  const menuOperationArr = useRef<ExtraOperation[][]>([]);

  const outsideOperationArr = useMemo(() => {
    const { menuOperation, outsideOperation } = getDisplayOperation(operations, displayNum);
    if (!asyncOperations) {
      menuOperationArr.current = menuOperation;
    }
    return outsideOperation;
  }, [operations, displayNum]);

  const operationMenuState = {
    outsideOperation: outsideOperationArr,
    menuOperation: menuOperationArr.current,
    menuStatus,
    loadedRef,
    currentPop,
    dropdownVisible,
    dropdownProps: merge(
      {
        popupVisible: dropdownVisible,
        triggerProps: {
          onClickOutside: () => setDropDownVisible(false),
          updateOnScroll: true,
        },
      },
      arcoDropdownProps,
    ),
  };

  // 获取异步下拉菜单
  const getAsyncOperations = async () => {
    if (menuStatus === MenuStatus['loading']) return;
    // 如果已经完成第一次异步加载， 且不需要每次点击都重新加载，直接return
    if (loadedRef.current && !reloadOperationEachClick) return;
    setMenuStatus(MenuStatus['loading']);
    try {
      const menuOperations = await asyncOperations?.();
      loadedRef.current = true;
      menuOperationArr.current = groupOperation(menuOperations);
    } catch (error) {
      logger.error({ error, message: '异步获取菜单失败' });
      setMenuStatus(MenuStatus['error']);
      return;
    }
    setMenuStatus(MenuStatus['success']);
  };

  const controls = {
    setDropDownVisible,
    getAsyncOperations,
    dropdownBtnClick: () => {
      setDropDownVisible(preState => !preState);
      if (asyncOperations) {
        getAsyncOperations();
      }
      onMenuBtnClick?.();
    },
    popVisibleChange: (val: CurrentDisplayPop, visible: boolean) => {
      if (!visible) {
        setCurrentPop(undefined);
      } else {
        setCurrentPop(val);
      }
    },
  };

  return [operationMenuState, controls] as const;
};

export const useMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const dropdownState = {
    activeMenu,
  };

  const controls = {
    setActiveMenu,
    clearActiveMenu: () => setActiveMenu(''),
    subMenuVisible: (visible: boolean, key: string) => {
      if (visible) {
        setActiveMenu(key);
      } else {
        setActiveMenu('');
      }
    },
  };

  return [dropdownState, controls] as const;
};
