// /*
//  * @Author: youjingyu
//  * @Date: 2021-09-26 12:14:11
//  * @LastEditTime: 2021-10-24 16:58:15
//  * @LastEditors: youjingyu
//  * @Description:
//  */
// import React, { useRef, createContext } from 'react';
// import { observer } from '@formily/react';
// import { ToolbarItem, ToolbarItemConfig, ToolbarItemProviderRenderProps } from '../../../core';
// import { useToolbar } from '../../hooks';
// import { isFn } from '../../../shared';

// export const ToolbarItemContext = createContext<ToolbarItem>(null as unknown as ToolbarItem);

// export const ToolbarItemProvider: React.FC<{ config: ToolbarItemConfig }> = observer(({ children, config }) => {
//   const toolbar = useToolbar();
//   const toolbarItemRef = useRef<ToolbarItem>();
//   if (!toolbarItemRef.current) {
//     toolbarItemRef.current = toolbar.createItem(config);
//   }
//   const options: ToolbarItemProviderRenderProps = {
//     table: toolbar.table,
//     toolbar,
//     toolbarItem: toolbarItemRef.current,
//   };
//   const childrenNode = isFn(children) ? children(options) : children;

//   return <ToolbarItemContext.Provider value={toolbarItemRef.current}>{childrenNode}</ToolbarItemContext.Provider>;
// });
