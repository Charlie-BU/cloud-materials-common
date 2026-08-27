import { makeKey } from './util';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

const cssPrefix = classNamePrefixFactory('operation-menu');

// 容器
export const container = cssPrefix`container`;
// 下拉菜单按钮
export const dropButton = cssPrefix`dropdown-button`;
// 下拉菜单容器
export const dropContainer = cssPrefix`dropdown-container`;

// --------操作按钮列表---------
// 操作按钮
export const getButtonItemCy = (index: string, name?: string) => cssPrefix`button-item-${makeKey(index, name)}`;
// 操作按钮二次确认按钮
export const getButtonItemConfirmCy = (index: string, name?: string) =>
  cssPrefix`button-item-confirm-${makeKey(index, name)}`;
// 操作按钮索引
export const getButtonItemIndexCy = (index: string) => cssPrefix`button-item-idx-${index}`;
// 操作按钮二次确认按钮索引
export const getButtonItemConfirmIndexCy = (index: string) => cssPrefix`$button-item-confirm-idx-${index}`;

// --------操作菜单列表---------
// 下拉菜单选项
export const getMenuItemCy = (index: string, name?: string) => cssPrefix`menu-item-${makeKey(index, name)}`;
// 下拉菜单选项二次确认
export const getMenuItemConfirmCy = (index: string, name?: string) =>
  cssPrefix`menu-item-confirm-${makeKey(index, name)}`;
// 下拉菜单选项索引
export const getMenuItemIndexCy = (index: string) => cssPrefix`menu-item-idx-${index}`;
// 下拉菜单选项二次确认索引
export const getMenuItemConfirmIndexCy = (index: string) => cssPrefix`menu-item-confirm-idx-${index}`;

//---------test lib------------

export const btnItemId = cssPrefix`btn-id`;
export const dropBtnId = cssPrefix`dropdown-btn-id`;
export const menuContainerId = cssPrefix`menu-container`;
export const menuItemId = cssPrefix`menu-id`;
export const groupDividerId = cssPrefix`groupdown-divider-id`;
