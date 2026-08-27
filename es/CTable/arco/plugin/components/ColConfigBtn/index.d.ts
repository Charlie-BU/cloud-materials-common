import type { FC } from 'react';
import React from 'react';
import type { DropdownProps } from '@arco-design/web-react';
import type { ToolbarItemRenderProps } from '../../../../core';
import type { CModalProps } from '../../../../../CModal/interface';
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
export declare const ColConfigBtn: FC<ColConfigBtnProps & ToolbarItemRenderProps>;
