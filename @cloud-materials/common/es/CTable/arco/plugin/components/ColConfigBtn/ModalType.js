import { __assign, __read } from "tslib";
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from '@arco-design/web-react';
import classnames from 'classnames';
import { values } from 'lodash-es';
import { useCConfigContext } from '../../../../../CConfigProvider';
import CModal from '../../../../../CModal/Base';
import { CheckboxItem } from './CheckboxItem';
import { getTooltip } from './utils';
import { usePrefix } from '../../../../react';
export var ModalType = function (props) {
    var columns = props.columns, CModalProps = props.CModalProps, defaultVisibleMap = props.defaultVisibleMap, showReset = props.showReset, tooltipConfig = props.tooltip, setLocalStorage = props.setLocalStorage, isColumnDisabled = props.isColumnDisabled, visible = props.visible, setVisible = props.setVisible;
    var locale = useCConfigContext().locale;
    var prefixCls = usePrefix('comp-col-config-btn-modal');
    var getVisibleMapFromColumns = function () {
        return columns.reduce(function (acc, curr) {
            acc[curr.dataIndex] = curr.visible;
            return acc;
        }, {});
    };
    // 一共有三个 visible 状态 map
    // 1. defaultVisibleMap: 每一列的默认配置，始终保持不变
    // 2. initialVisibleMap: 上一次生效的配置，可以理解为本次打开弹窗的初始值，对应column.visible属性
    // 3. tmpVisibleMap: 临时状态，在勾选、恢复默认、取消时均会被改变
    var initialVisibleMap = getVisibleMapFromColumns();
    var _a = __read(useState(initialVisibleMap), 2), tmpVisibleMap = _a[0], setTmpVisibleMap = _a[1];
    // 通过 table 领域模型修改了 column 的 visible，需要修改 tmpVisibleMap，保证打开自定义列 Modal 展示的列勾选状态是最新的
    var columnsVisibleStr = columns.map(function (c) { return c.visible; }).join(', ');
    useEffect(function () {
        setTmpVisibleMap(getVisibleMapFromColumns());
    }, [columnsVisibleStr]);
    var isAllSelect = values(tmpVisibleMap).every(function (c) { return c; });
    var isHalfSelect = values(tmpVisibleMap).some(function (c) { return c; }) && values(tmpVisibleMap).some(function (c) { return !c; });
    // 分为三列展示，每一列展示的数量
    var columnCount = Math.ceil(columns.length / 3);
    // 恢复默认: 将 tmpVisibleMap 设为 defaultVisibleMap
    var handleReset = function () {
        setTmpVisibleMap(defaultVisibleMap);
    };
    // 取消: 将 tmpVisibleMap 设为 initialVisibleMap 并关闭弹窗
    var handleCancel = function () {
        setTmpVisibleMap(initialVisibleMap);
        setVisible(false);
    };
    // 确认: 1. 将 initialVisibleMap 设为 tmpVisibleMap, 2: 关闭弹窗, 3: 设置 localStorage
    var handleOk = function () {
        columns.forEach(function (c) { return c.setVisible(tmpVisibleMap[c.dataIndex]); });
        setVisible(false);
        setLocalStorage();
    };
    // 全选
    var handleSelectAll = function () {
        setTmpVisibleMap(columns.reduce(function (acc, curr) {
            if (isColumnDisabled(curr.dataIndex)) {
                acc[curr.dataIndex] = curr.visible;
            }
            else {
                acc[curr.dataIndex] = !isAllSelect;
            }
            return acc;
        }, {}));
    };
    return (React.createElement(React.Fragment, null,
        props.children,
        React.createElement(CModal, __assign({ unmountOnExit: true, title: locale.CTable.colConfig, visible: visible, onCancel: function () { return setVisible(false); }, footer: React.createElement("div", { className: "".concat(prefixCls, "-buttons") },
                showReset && (React.createElement(Button, { className: "".concat(prefixCls, "-buttons-left"), onClick: handleReset }, locale.CTable.reset)),
                React.createElement("div", { className: "".concat(prefixCls, "-buttons-right") },
                    React.createElement(Button, { style: { marginRight: 12 }, onClick: handleCancel }, locale.CTable.cancel),
                    React.createElement(Button, { type: "primary", onClick: handleOk }, locale.CTable.apply))), className: classnames("".concat(prefixCls), CModalProps === null || CModalProps === void 0 ? void 0 : CModalProps.className) }, CModalProps),
            React.createElement("div", { className: "".concat(prefixCls, "-content") },
                React.createElement(Checkbox, { checked: isAllSelect, indeterminate: isHalfSelect, className: "".concat(prefixCls, "-content-select-all"), onChange: handleSelectAll }, locale.CTable.selectAll),
                React.createElement("div", { className: "".concat(prefixCls, "-content-wrapper") }, [0, columnCount, 2 * columnCount].map(function (startIndex) {
                    return (
                    // eslint-disable-next-line react/jsx-key
                    React.createElement("div", { className: "".concat(prefixCls, "-content-wrapper-column") }, columns
                        .slice(startIndex, Math.min(startIndex + columnCount, columns.length))
                        .map(function (column, index) {
                        var _a = column.config, _b = _a.dataIndex, dataIndex = _b === void 0 ? String(index) : _b, columnTooltip = _a.tooltip;
                        var tooltip = getTooltip(tooltipConfig, dataIndex, columnTooltip);
                        return (React.createElement(CheckboxItem, { key: dataIndex, value: tmpVisibleMap[dataIndex], onChange: function (checked) {
                                var _a;
                                return setTmpVisibleMap(__assign(__assign({}, tmpVisibleMap), (_a = {}, _a[dataIndex] = checked, _a)));
                            }, name: column.title, disabled: isColumnDisabled(dataIndex), tooltip: tooltip }));
                    })));
                }))))));
};
//# sourceMappingURL=ModalType.js.map