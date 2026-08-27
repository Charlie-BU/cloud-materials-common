/*
 * @Author: youjingyu
 * @Date: 2021-09-26 12:14:11
 * @LastEditTime: 2021-10-06 17:31:09
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { createContext } from 'react';
export var TableContext = createContext(null);
export var TableProvider = function (props) {
    return React.createElement(TableContext.Provider, { value: props.table }, props.children);
};
//# sourceMappingURL=Table.js.map