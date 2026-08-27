/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-10-29 15:53:56
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import cls from 'classnames';
import { ToolbarItemGroup } from './ToolbarItemGroup';
import { usePrefix } from '../../../react';
export var ToolbarRow = function (_a) {
    var config = _a.config, onChange = _a.onChange;
    var prefixCls = usePrefix('toolbar');
    var onlyClass;
    if (config.left && !config.right) {
        onlyClass = "".concat(prefixCls, "-row-only-left");
    }
    else if (config.right && !config.left) {
        onlyClass = "".concat(prefixCls, "-row-only-right");
    }
    return (React.createElement("div", { className: cls("".concat(prefixCls, "-row"), onlyClass) },
        config.left && (React.createElement("div", { className: "".concat(prefixCls, "-row-left") },
            React.createElement(ToolbarItemGroup, { toolbarItems: config.left, onChange: onChange }))),
        config.right && (React.createElement("div", { className: "".concat(prefixCls, "-row-right") },
            React.createElement(ToolbarItemGroup, { toolbarItems: config.right, onChange: onChange })))));
};
//# sourceMappingURL=ToolbarRow.js.map