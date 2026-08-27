"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalType = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var Base_1 = tslib_1.__importDefault(require("../../../../../CModal/Base"));
var CheckboxItem_1 = require("./CheckboxItem");
var utils_1 = require("./utils");
var react_2 = require("../../../../react");
var ModalType = function (props) {
    var columns = props.columns, CModalProps = props.CModalProps, defaultVisibleMap = props.defaultVisibleMap, showReset = props.showReset, tooltipConfig = props.tooltip, setLocalStorage = props.setLocalStorage, isColumnDisabled = props.isColumnDisabled, visible = props.visible, setVisible = props.setVisible;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var prefixCls = (0, react_2.usePrefix)('comp-col-config-btn-modal');
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
    var _a = tslib_1.__read((0, react_1.useState)(initialVisibleMap), 2), tmpVisibleMap = _a[0], setTmpVisibleMap = _a[1];
    // 通过 table 领域模型修改了 column 的 visible，需要修改 tmpVisibleMap，保证打开自定义列 Modal 展示的列勾选状态是最新的
    var columnsVisibleStr = columns.map(function (c) { return c.visible; }).join(', ');
    (0, react_1.useEffect)(function () {
        setTmpVisibleMap(getVisibleMapFromColumns());
    }, [columnsVisibleStr]);
    var isAllSelect = (0, lodash_es_1.values)(tmpVisibleMap).every(function (c) { return c; });
    var isHalfSelect = (0, lodash_es_1.values)(tmpVisibleMap).some(function (c) { return c; }) && (0, lodash_es_1.values)(tmpVisibleMap).some(function (c) { return !c; });
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.children,
        react_1.default.createElement(Base_1.default, tslib_1.__assign({ unmountOnExit: true, title: locale.CTable.colConfig, visible: visible, onCancel: function () { return setVisible(false); }, footer: react_1.default.createElement("div", { className: "".concat(prefixCls, "-buttons") },
                showReset && (react_1.default.createElement(web_react_1.Button, { className: "".concat(prefixCls, "-buttons-left"), onClick: handleReset }, locale.CTable.reset)),
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-buttons-right") },
                    react_1.default.createElement(web_react_1.Button, { style: { marginRight: 12 }, onClick: handleCancel }, locale.CTable.cancel),
                    react_1.default.createElement(web_react_1.Button, { type: "primary", onClick: handleOk }, locale.CTable.apply))), className: (0, classnames_1.default)("".concat(prefixCls), CModalProps === null || CModalProps === void 0 ? void 0 : CModalProps.className) }, CModalProps),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-content") },
                react_1.default.createElement(web_react_1.Checkbox, { checked: isAllSelect, indeterminate: isHalfSelect, className: "".concat(prefixCls, "-content-select-all"), onChange: handleSelectAll }, locale.CTable.selectAll),
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-content-wrapper") }, [0, columnCount, 2 * columnCount].map(function (startIndex) {
                    return (
                    // eslint-disable-next-line react/jsx-key
                    react_1.default.createElement("div", { className: "".concat(prefixCls, "-content-wrapper-column") }, columns
                        .slice(startIndex, Math.min(startIndex + columnCount, columns.length))
                        .map(function (column, index) {
                        var _a = column.config, _b = _a.dataIndex, dataIndex = _b === void 0 ? String(index) : _b, columnTooltip = _a.tooltip;
                        var tooltip = (0, utils_1.getTooltip)(tooltipConfig, dataIndex, columnTooltip);
                        return (react_1.default.createElement(CheckboxItem_1.CheckboxItem, { key: dataIndex, value: tmpVisibleMap[dataIndex], onChange: function (checked) {
                                var _a;
                                return setTmpVisibleMap(tslib_1.__assign(tslib_1.__assign({}, tmpVisibleMap), (_a = {}, _a[dataIndex] = checked, _a)));
                            }, name: column.title, disabled: isColumnDisabled(dataIndex), tooltip: tooltip }));
                    })));
                }))))));
};
exports.ModalType = ModalType;
//# sourceMappingURL=ModalType.js.map