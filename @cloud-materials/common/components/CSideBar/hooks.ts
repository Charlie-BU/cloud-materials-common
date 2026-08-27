/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useControllableValue, useHover, useResponsive, useUpdateEffect } from 'ahooks';
import { createUseStorageState } from 'ahooks/es/createUseStorageState';
import { useEffect, useMemo, useState } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { useAutoRef, useMergeProps } from '../hooks';
import type { CSideBarHooksProps, CSideBarProps, SidebarStateStorage, UseSideBarWidthControlParams } from './interface';
import {
  batchSetStyle,
  collectMenusFromCustomRender,
  filterRootMenus,
  flatMenusFromPropMenus,
  generateMenuItemKeyToRootKeyMapping,
  getAllSubMenuKeys,
  getNodeText,
  matchMenuFromPropsMenuByCurrentPath,
  testIdPrefix,
} from './util';

export const DefaultMinSideBarWidth = 100;

export const useSideBarWidthControl = ({
  controlledRefs,
  widthControllerRef,
  widthControl,
  storage,
  onSetStorage,
  onSetCollapse,
}: UseSideBarWidthControlParams) => {
  const widthControlDataRef = useAutoRef(widthControl);
  const controlledAutoRefs = useAutoRef(controlledRefs ?? []);
  const [widthControlling, setWidthControlling] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState<number | undefined>(storage?.width);

  useEffect(() => {
    if (widthControlDataRef.current && widthControllerRef?.current && controlledAutoRefs?.current) {
      let startWidths: number[] = [];
      let startX = 0;
      let currentWidth = 0;
      const defaultWidthControl: Exclude<Required<CSideBarProps>['widthControl'], boolean> = {
        minWidth: DefaultMinSideBarWidth,
        autoCollapse: true,
      };
      const widthControl =
        typeof widthControlDataRef.current === 'boolean'
          ? defaultWidthControl
          : { ...defaultWidthControl, ...widthControlDataRef.current };

      const endWidthControl = () => {
        // eslint-disable-next-line no-use-before-define
        document.removeEventListener('mousemove', handleMouseMove);
        // eslint-disable-next-line no-use-before-define
        document.removeEventListener('mouseup', handleMouseUp);

        batchSetStyle(controlledAutoRefs.current, { transition: '' });

        setWidthControlling(false);
      };

      const handleMouseUp = () => {
        endWidthControl();
        if (currentWidth > 0) {
          setSidebarWidth(currentWidth);
          onSetStorage({ width: currentWidth });
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        const offset = e.clientX - startX;

        startWidths.some((startWidth, index) => {
          const width = startWidth + offset;

          const minWidth = Math.max(DefaultMinSideBarWidth, widthControl.minWidth ?? 0);

          const inRangeWidth = Math.max(Math.min(widthControl.maxWidth ?? window.innerWidth / 2, width), minWidth);

          // 小于最小宽度后继续缩小则直接收起
          if (width < minWidth - 80 && widthControl.autoCollapse) {
            endWidthControl();
            onSetCollapse(true);
            onSetStorage({ collapse: true });
            return true;
          }
          currentWidth = inRangeWidth;
          // fps 对齐
          requestAnimationFrame(() => {
            batchSetStyle([controlledAutoRefs.current[index]], { width: `${inRangeWidth}px` });
          });
        });
      };

      const handleMousedown = (e: MouseEvent) => {
        startWidths = controlledAutoRefs.current.map(ref => ref.current?.clientWidth ?? 0);
        startX = e.clientX;

        batchSetStyle(controlledAutoRefs.current, { transition: 'none' });

        setWidthControlling(true);

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
      };

      widthControllerRef.current.addEventListener('mousedown', handleMousedown);

      return () => {
        endWidthControl();
        widthControllerRef.current?.removeEventListener('mousedown', handleMousedown);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthControl]);

  return {
    /** 宽度是否处于控制中 */
    widthControlling,
    /** 控制后的宽度 */
    sidebarWidth,
  };
};

export const useCSideBar = (props: CSideBarHooksProps) => {
  const { cComponentConfig, storage } = useCConfigContext();
  // 创建自定义 storage hooks
  const [useLocalStorageState] = useState(() => createUseStorageState(() => storage.localStorage));

  const {
    defaultCollapse = false,
    defaultOpenKeys = [],
    defaultSelectedKeys = [],
    currentPath,
    accordion = false,
    controlledRefs,
    expandTriggerRef,
    rootRef,
    widthControllerRef,
    widthControl,
    autoCollapse = true,
    onClickMenuItem,
    appId,
    defaultOpenSubMenu,
    collapsePersistFirstWhenControlled,
    onCollapseChange,
    onSelectedKeysChange,
    onOpenKeysChange,
    collapsible = true,
    ...resetProps
  } = useMergeProps<CSideBarHooksProps>(props, {}, cComponentConfig?.CSideBar ?? {});

  const { collapse, selectedKeys, openKeys, ...nextProps } = resetProps;
  const { menus: initialMenus = [] } = resetProps;
  const menus = useMemo(() => collectMenusFromCustomRender(initialMenus), [initialMenus]);

  const innerAppId = appId ?? getNodeText(resetProps.title?.text);
  const enableAutoCollapse = Boolean(autoCollapse);

  const createControllableProps = (
    props: { value?: unknown; defaultValue?: unknown; onChange?: unknown },
    propName: keyof CSideBarHooksProps,
  ) => {
    if (!Object.prototype.hasOwnProperty.call(resetProps, propName)) {
      delete props.value;
    }

    return props;
  };

  // 992 的屏幕宽度，满足则为true
  const { lg } = useResponsive();

  const canAutoCollapseByScreenWidth = !lg;

  const [storageState, setStorageState] = useLocalStorageState<SidebarStateStorage>(testIdPrefix`state-${innerAppId}`, {
    defaultValue: {},
  });
  const defaultCollapseInner = useMemo(() => {
    // 手动优先，其次是自动，再则是传进来的默认值
    if (enableAutoCollapse && canAutoCollapseByScreenWidth) {
      return storageState.collapse ?? (canAutoCollapseByScreenWidth || defaultCollapse);
    }

    return storageState.collapse ?? defaultCollapse;
  }, []);

  const [innerCollapse, setCollapse] = useControllableValue<boolean>(
    createControllableProps(
      {
        // 当用户操作过优先取用户的结果。
        value: collapsePersistFirstWhenControlled ? storageState.collapse ?? collapse : collapse,
        // 非受控模式直接取值 defaultValue
        defaultValue: defaultCollapseInner,
        onChange: onCollapseChange,
      },
      'collapse',
    ),
  );

  const defaultOpenKeysInner = useMemo(() => {
    if (defaultOpenSubMenu) {
      return Array.from(new Set(getAllSubMenuKeys(menus)));
    }

    // 当初始化时存在 currentPath 时，我们应当立即匹配出 openKeys，如果在 useEffect 中去处理，将出现加载完成后菜单再展开的情况
    if (currentPath) {
      const matchedMenu = matchMenuFromPropsMenuByCurrentPath(currentPath, menus);
      if (matchedMenu && matchedMenu._menuPath.length > 1) {
        // 移除最后一个，最后一个为菜单项自身，为非可折叠菜单
        return matchedMenu._menuPath.slice(0, -1);
      }
    }

    return defaultOpenKeys;
  }, []);

  const defaultSelectedKeysInner = useMemo(() => {
    if (currentPath) {
      const matchedMenu = matchMenuFromPropsMenuByCurrentPath(currentPath, menus);
      if (matchedMenu && matchedMenu.selectable !== false) {
        return [matchedMenu.key];
      }
    }

    return defaultSelectedKeys;
  }, []);

  const [innerIsExpandTriggerHovering, setInnerIsExpandTriggerHovering] = useState(false);
  const [innerOpenKeys, setOpenKeys] = useControllableValue<string[]>(
    createControllableProps(
      {
        defaultValue: defaultOpenKeysInner,
        value: openKeys,
        onChange: onOpenKeysChange,
      },
      'openKeys',
    ),
  );
  const [innerSelectedKeys, setSelectedKeys] = useControllableValue<string[]>(
    createControllableProps(
      {
        value: selectedKeys,
        defaultValue: defaultSelectedKeysInner,
        onChange: onSelectedKeysChange,
      },
      'selectedKeys',
    ),
  );
  const isExpandTriggerHovering = useHover(expandTriggerRef);
  const sidebarRootHovering = useHover(rootRef);

  const iconLessMode = resetProps.mode === 'icon-less';

  /** 顶层的菜单key */
  const outerKeys = menus.map(({ key }) => key);

  const rootMenus = useAutoRef(filterRootMenus(menus));

  useUpdateEffect(() => {
    // 自动展开/收起仅限于用户未操作过或者主动设置为展开状态时生效，程序不主动缩小用户视野
    if (enableAutoCollapse && !storageState.collapse) {
      setCollapse(canAutoCollapseByScreenWidth);
    }
  }, [canAutoCollapseByScreenWidth, enableAutoCollapse]);

  const sidebarControlState = useSideBarWidthControl({
    controlledRefs,
    widthControllerRef,
    widthControl,
    storage: storageState,
    onSetCollapse: setCollapse,
    onSetStorage(storage) {
      setStorageState(oldState => ({ ...oldState, ...storage }));
    },
  });

  useUpdateEffect(() => {
    if (iconLessMode || sidebarControlState.widthControlling) {
      return;
    }

    // 如果已经展开了，hover到 sidebar 内部不收起，除非移出 sidebar
    if (!isExpandTriggerHovering && sidebarRootHovering) {
      return;
    }
    setInnerIsExpandTriggerHovering(isExpandTriggerHovering);
  }, [isExpandTriggerHovering, sidebarRootHovering]);

  const activeRootMenuIndex = useMemo(() => {
    if (innerSelectedKeys.length) {
      const [selectedKey] = innerSelectedKeys;
      const keyMapping = generateMenuItemKeyToRootKeyMapping(menus, {});
      const rootKey = keyMapping[selectedKey];

      return rootMenus.current.findIndex(menu => menu.key === rootKey);
    }

    return -1;
  }, [innerSelectedKeys]);

  const sideBarProps = {
    ...nextProps,
    ...sidebarControlState,
    collapsible,
    /** 鼠标移进 */
    isExpandTriggerHovering: innerIsExpandTriggerHovering,
    /** 收起状态，当 collapsible 为 false 时，collapse 始终返回 false */
    collapse: collapsible && innerCollapse,
    openKeys: innerOpenKeys,
    rootMenus: rootMenus.current,
    activeRootMenuIndex,
    selectedKeys: innerSelectedKeys,
    widthControl: Boolean(widthControl),
  };

  useUpdateEffect(() => {
    if (currentPath) {
      const matchedMenu = matchMenuFromPropsMenuByCurrentPath(currentPath, menus);

      setSelectedKeys(matchedMenu && matchedMenu.selectable !== false ? [matchedMenu.key] : []);

      // 大于 1 即为子菜单
      if (matchedMenu && matchedMenu._menuPath.length > 1) {
        const menuPathCopy = matchedMenu._menuPath.slice(0, -1);
        if (accordion) {
          setOpenKeys(menuPathCopy);
        } else {
          setOpenKeys(oldKeys => Array.from(new Set(oldKeys.concat(menuPathCopy))));
        }
      }
    }
  }, [currentPath, accordion, initialMenus]);

  const controls = {
    setOpenKeys: (key: string) => {
      setOpenKeys(oldKeys => {
        if (accordion && outerKeys.includes(key)) {
          return oldKeys.length > 0 && oldKeys.includes(key) ? [] : [key];
        }
        return oldKeys.includes(key) ? oldKeys.filter(v => v !== key) : oldKeys.concat(key);
      });
    },

    /**
     * 状态会被储存
     * @param collapse
     */
    toggleCollapse: (collapse = !innerCollapse) => {
      setCollapse(collapse);
      // 仅在用户操作时对状态进行持久化保存
      setStorageState({ ...storageState, collapse });
      if (collapse) {
        setInnerIsExpandTriggerHovering(false);
      }
    },

    onClickMenuItem: (key: string, ...restArgs: unknown[]) => {
      const flatMenus = flatMenusFromPropMenus(menus);
      const clickedMenuItem = flatMenus.find(({ key: menuKey }) => key === menuKey);

      if (clickedMenuItem?.selectable !== false) {
        setSelectedKeys([key]);
      }

      if (clickedMenuItem) {
        onClickMenuItem?.(clickedMenuItem, ...restArgs);
      }
    },
  };

  return [sideBarProps, controls] as const;
};
