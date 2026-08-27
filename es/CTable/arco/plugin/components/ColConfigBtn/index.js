import { __assign, __read } from "tslib";
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { observer } from '@formily/react';
import { Popover, Button, Badge } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import { IconCheckTriangleFill } from '@arco-design/iconbox-react-ve-o-design';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { DropdownType } from './DropdownType';
import { ModalType } from './ModalType';
import { getLocalStorageHiddenCols, setLocalStorageHiddenCols } from './utils';
import { usePrefix } from '../../../../react';
import { isArray } from 'lodash-es';
export var ColConfigBtn = observer(function (props) {
    var table = props.table, _a = props.disabledColsDataIndex, disabledColsDataIndex = _a === void 0 ? [] : _a, _b = props.hiddenColsDataIndex, hiddenColsDataIndex = _b === void 0 ? [] : _b, localStorageKey = props.localStorageKey, _c = props.type, type = _c === void 0 ? 'dropdown' : _c, _d = props.showReset, showReset = _d === void 0 ? false : _d, _e = props.tooltip, tooltip = _e === void 0 ? false : _e, CModalProps = props.CModalProps, DropdownProps = props.DropdownProps, _f = props.showHasCustomConfigIcon, showHasCustomConfigIcon = _f === void 0 ? true : _f;
    var _g = useCConfigContext(), locale = _g.locale, storage = _g.storage;
    var _h = __read(useState(false), 2), ready = _h[0], setReady = _h[1];
    var _j = __read(useState(false), 2), dropdownVisible = _j[0], setDropdownVisible = _j[1];
    var _k = __read(useState(false), 2), modalVisible = _k[0], setModalVisible = _k[1];
    var colConfigBtnPrefix = usePrefix('comp-col-config-btn');
    var colConfigBadgePrefix = usePrefix('comp-col-config-badge');
    // todo: 数据清除机制
    // 把前端保存的逻辑全部收敛到 ColConfigBtn 组件中，避免耦合到领域模型层中
    // 存一份 column 的默认 visible 状态的 map
    // 存在 localStorage 中的是 hidden 的列，相比存 visible 的列兼容性更好
    var defaultVisibleMap = useMemo(function () {
        return table.columns.reduce(function (acc, curr) {
            acc[curr.dataIndex] = curr.visible;
            return acc;
        }, {});
    }, []);
    // 该列是否被禁止勾选
    var isColumnDisabled = function (dataIndex) { return disabledColsDataIndex.includes(dataIndex); };
    // 先尝试从 localStorage 获取本地存储，获取完成后才渲染 Modal 或者 Dropdown
    // 使用 useLayoutEffect 阻塞渲染，目的是为了保证组件渲染时能获取正确的初始状态
    useLayoutEffect(function () {
        var hiddenCols = getLocalStorageHiddenCols(storage.localStorage, localStorageKey);
        if (isArray(hiddenCols)) {
            table.columns
                // 没有被禁用的列才能被设置
                .filter(function (c) { return !isColumnDisabled(c.dataIndex); })
                .forEach(function (c) {
                c.setVisible(!hiddenCols.includes(c.dataIndex));
            });
        }
        setReady(true);
    }, []);
    // Dropdown 和 Modal 设置 localStorage 的逻辑是一样的，所以在父组件统一传递
    var setLocalStorage = function () {
        setLocalStorageHiddenCols(storage.localStorage, table.columns.filter(function (c) { return !c.hidden && !c.visible; }).map(function (c) { return c.dataIndex; }), localStorageKey);
    };
    if (!ready) {
        return React.createElement(Button, { className: "".concat(colConfigBtnPrefix, "-btn"), icon: React.createElement(IconSettings, null) });
    }
    // 判断用户是否有自定义配置
    var hasCustomConfig = table.columns
        .filter(function (c) { return !c.hidden; })
        .some(function (c) {
        return c.visible !== defaultVisibleMap[c.dataIndex];
    });
    var commonProps = {
        defaultVisibleMap: defaultVisibleMap,
        localStorageKey: localStorageKey,
        showReset: showReset,
        columns: table.columns.filter(function (c) { return !c.hidden && !hiddenColsDataIndex.includes(c.dataIndex); }),
        tooltip: tooltip,
        setLocalStorage: setLocalStorage,
        isColumnDisabled: isColumnDisabled,
    };
    // 由于 arco 组件的 React Portal 的一些问题，不能使用 Popover 包裹 Dropdown 或 Modal，否则鼠标移入 Dropdown 或 Modal 时也会冒泡触发 Popover
    // 因此将 Popover 作为 Dropdown 的子元素、作为 Modal 的兄弟元素，即可解决事件冒泡问题
    var getPopoverNode = function () {
        var buttonElement = (React.createElement(Button, { className: "".concat(colConfigBtnPrefix, "-btn"), icon: React.createElement(IconSettings, null), onClick: function () {
                if (type === 'dropdown') {
                    setDropdownVisible(true);
                }
                else {
                    setModalVisible(true);
                }
            } }));
        return (React.createElement(Popover, { content: hasCustomConfig ? locale.CTable.hasCustomColConfig : locale.CTable.colConfig, title: hasCustomConfig ? locale.CTable.colConfig : '' }, hasCustomConfig && showHasCustomConfigIcon ? (React.createElement(Badge, { dotClassName: "".concat(colConfigBadgePrefix), dot: true, count: React.createElement(IconCheckTriangleFill, null) }, buttonElement)) : (buttonElement)));
    };
    return (React.createElement(React.Fragment, null, type === 'dropdown' ? (React.createElement(DropdownType, __assign({}, commonProps, { DropdownProps: DropdownProps, visible: dropdownVisible, setVisible: setDropdownVisible }), getPopoverNode())) : (React.createElement(ModalType, __assign({}, commonProps, { CModalProps: CModalProps, visible: modalVisible, setVisible: setModalVisible }), getPopoverNode()))));
});
//# sourceMappingURL=index.js.map