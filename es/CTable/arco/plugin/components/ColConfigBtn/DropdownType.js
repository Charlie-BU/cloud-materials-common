import { __assign } from "tslib";
import React from 'react';
import { Button, Divider, Checkbox, Dropdown, Menu } from '@arco-design/web-react';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { CheckboxItem } from './CheckboxItem';
import { resetLocalStorageHiddenCols, getTooltip } from './utils';
import { usePrefix } from '../../../../react';
export var DropdownType = function (props) {
    var columns = props.columns, defaultVisibleMap = props.defaultVisibleMap, DropdownProps = props.DropdownProps, localStorageKey = props.localStorageKey, showReset = props.showReset, tooltipConfig = props.tooltip, visible = props.visible, setVisible = props.setVisible, setLocalStorage = props.setLocalStorage, isColumnDisabled = props.isColumnDisabled;
    var _a = useCConfigContext(), locale = _a.locale, storage = _a.storage;
    var prefixCls = usePrefix('comp-col-config-btn-dropdown');
    var isAllSelect = columns.every(function (c) { return c.visible; });
    var isHalfSelect = columns.some(function (c) { return c.visible; }) && columns.some(function (c) { return !c.visible; });
    var handleSelect = function (col) {
        col.setVisible(!col.visible);
        setLocalStorage();
    };
    var handleSelectAll = function () {
        columns.filter(function (item) { return !isColumnDisabled(item.dataIndex); }).forEach(function (c) { return c.setVisible(!isAllSelect); });
        setLocalStorage();
    };
    var handleReset = function () {
        columns.forEach(function (c) { return c.setVisible(defaultVisibleMap[c.dataIndex]); });
        resetLocalStorageHiddenCols(storage.localStorage, localStorageKey);
    };
    return (React.createElement(Dropdown, __assign({ popupVisible: visible, position: "br", triggerProps: {
            // 不使用 onVisibleChange 来控制，而是使用 onClickOutside 来手动控制，不然点击 Menu.Item 就会关闭菜单
            onClickOutside: function () {
                setVisible(false);
            },
        } }, DropdownProps, { droplist: React.createElement(Menu, { className: "".concat(prefixCls) },
            React.createElement(Menu.Item, { key: "selectAll" },
                React.createElement("span", { className: "".concat(prefixCls, "-select-all"), onClick: handleSelectAll },
                    React.createElement(Checkbox, { checked: isAllSelect, indeterminate: isHalfSelect }, locale.CTable.selectAll))),
            columns.map(function (item, idx) {
                var _a = item.config, _b = _a.dataIndex, dataIndex = _b === void 0 ? String(idx) : _b, columnTooltip = _a.tooltip;
                var tooltip = getTooltip(tooltipConfig, dataIndex, columnTooltip);
                return (React.createElement(Menu.Item, { key: dataIndex },
                    React.createElement(CheckboxItem, { value: item.visible, onChange: function () { return handleSelect(item); }, disabled: isColumnDisabled(dataIndex), name: item.title, tooltip: tooltip })));
            }),
            React.createElement("div", { className: "".concat(prefixCls, "-footer") }, showReset && (React.createElement(React.Fragment, null,
                React.createElement(Divider, { className: "".concat(prefixCls, "-footer-divider") }),
                React.createElement("div", { className: "".concat(prefixCls, "-footer-reset") },
                    React.createElement(Button, { className: "".concat(prefixCls, "-buttons-left"), onClick: handleReset }, locale.CTable.reset)))))) }), props.children));
};
//# sourceMappingURL=DropdownType.js.map