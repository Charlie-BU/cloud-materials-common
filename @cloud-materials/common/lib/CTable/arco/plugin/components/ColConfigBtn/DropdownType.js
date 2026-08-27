"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownType = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var CheckboxItem_1 = require("./CheckboxItem");
var utils_1 = require("./utils");
var react_2 = require("../../../../react");
var DropdownType = function (props) {
    var columns = props.columns, defaultVisibleMap = props.defaultVisibleMap, DropdownProps = props.DropdownProps, localStorageKey = props.localStorageKey, showReset = props.showReset, tooltipConfig = props.tooltip, visible = props.visible, setVisible = props.setVisible, setLocalStorage = props.setLocalStorage, isColumnDisabled = props.isColumnDisabled;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, storage = _a.storage;
    var prefixCls = (0, react_2.usePrefix)('comp-col-config-btn-dropdown');
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
        (0, utils_1.resetLocalStorageHiddenCols)(storage.localStorage, localStorageKey);
    };
    return (react_1.default.createElement(web_react_1.Dropdown, tslib_1.__assign({ popupVisible: visible, position: "br", triggerProps: {
            // 不使用 onVisibleChange 来控制，而是使用 onClickOutside 来手动控制，不然点击 Menu.Item 就会关闭菜单
            onClickOutside: function () {
                setVisible(false);
            },
        } }, DropdownProps, { droplist: react_1.default.createElement(web_react_1.Menu, { className: "".concat(prefixCls) },
            react_1.default.createElement(web_react_1.Menu.Item, { key: "selectAll" },
                react_1.default.createElement("span", { className: "".concat(prefixCls, "-select-all"), onClick: handleSelectAll },
                    react_1.default.createElement(web_react_1.Checkbox, { checked: isAllSelect, indeterminate: isHalfSelect }, locale.CTable.selectAll))),
            columns.map(function (item, idx) {
                var _a = item.config, _b = _a.dataIndex, dataIndex = _b === void 0 ? String(idx) : _b, columnTooltip = _a.tooltip;
                var tooltip = (0, utils_1.getTooltip)(tooltipConfig, dataIndex, columnTooltip);
                return (react_1.default.createElement(web_react_1.Menu.Item, { key: dataIndex },
                    react_1.default.createElement(CheckboxItem_1.CheckboxItem, { value: item.visible, onChange: function () { return handleSelect(item); }, disabled: isColumnDisabled(dataIndex), name: item.title, tooltip: tooltip })));
            }),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-footer") }, showReset && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(web_react_1.Divider, { className: "".concat(prefixCls, "-footer-divider") }),
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-footer-reset") },
                    react_1.default.createElement(web_react_1.Button, { className: "".concat(prefixCls, "-buttons-left"), onClick: handleReset }, locale.CTable.reset)))))) }), props.children));
};
exports.DropdownType = DropdownType;
//# sourceMappingURL=DropdownType.js.map