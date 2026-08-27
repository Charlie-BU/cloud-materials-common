"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColConfigBtn = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var DropdownType_1 = require("./DropdownType");
var ModalType_1 = require("./ModalType");
var utils_1 = require("./utils");
var react_3 = require("../../../../react");
var lodash_es_1 = require("lodash-es");
exports.ColConfigBtn = (0, react_2.observer)(function (props) {
    var table = props.table, _a = props.disabledColsDataIndex, disabledColsDataIndex = _a === void 0 ? [] : _a, _b = props.hiddenColsDataIndex, hiddenColsDataIndex = _b === void 0 ? [] : _b, localStorageKey = props.localStorageKey, _c = props.type, type = _c === void 0 ? 'dropdown' : _c, _d = props.showReset, showReset = _d === void 0 ? false : _d, _e = props.tooltip, tooltip = _e === void 0 ? false : _e, CModalProps = props.CModalProps, DropdownProps = props.DropdownProps, _f = props.showHasCustomConfigIcon, showHasCustomConfigIcon = _f === void 0 ? true : _f;
    var _g = (0, CConfigProvider_1.useCConfigContext)(), locale = _g.locale, storage = _g.storage;
    var _h = tslib_1.__read((0, react_1.useState)(false), 2), ready = _h[0], setReady = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)(false), 2), dropdownVisible = _j[0], setDropdownVisible = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(false), 2), modalVisible = _k[0], setModalVisible = _k[1];
    var colConfigBtnPrefix = (0, react_3.usePrefix)('comp-col-config-btn');
    var colConfigBadgePrefix = (0, react_3.usePrefix)('comp-col-config-badge');
    // todo: 数据清除机制
    // 把前端保存的逻辑全部收敛到 ColConfigBtn 组件中，避免耦合到领域模型层中
    // 存一份 column 的默认 visible 状态的 map
    // 存在 localStorage 中的是 hidden 的列，相比存 visible 的列兼容性更好
    var defaultVisibleMap = (0, react_1.useMemo)(function () {
        return table.columns.reduce(function (acc, curr) {
            acc[curr.dataIndex] = curr.visible;
            return acc;
        }, {});
    }, []);
    // 该列是否被禁止勾选
    var isColumnDisabled = function (dataIndex) { return disabledColsDataIndex.includes(dataIndex); };
    // 先尝试从 localStorage 获取本地存储，获取完成后才渲染 Modal 或者 Dropdown
    // 使用 useLayoutEffect 阻塞渲染，目的是为了保证组件渲染时能获取正确的初始状态
    (0, react_1.useLayoutEffect)(function () {
        var hiddenCols = (0, utils_1.getLocalStorageHiddenCols)(storage.localStorage, localStorageKey);
        if ((0, lodash_es_1.isArray)(hiddenCols)) {
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
        (0, utils_1.setLocalStorageHiddenCols)(storage.localStorage, table.columns.filter(function (c) { return !c.hidden && !c.visible; }).map(function (c) { return c.dataIndex; }), localStorageKey);
    };
    if (!ready) {
        return react_1.default.createElement(web_react_1.Button, { className: "".concat(colConfigBtnPrefix, "-btn"), icon: react_1.default.createElement(icon_1.IconSettings, null) });
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
        var buttonElement = (react_1.default.createElement(web_react_1.Button, { className: "".concat(colConfigBtnPrefix, "-btn"), icon: react_1.default.createElement(icon_1.IconSettings, null), onClick: function () {
                if (type === 'dropdown') {
                    setDropdownVisible(true);
                }
                else {
                    setModalVisible(true);
                }
            } }));
        return (react_1.default.createElement(web_react_1.Popover, { content: hasCustomConfig ? locale.CTable.hasCustomColConfig : locale.CTable.colConfig, title: hasCustomConfig ? locale.CTable.colConfig : '' }, hasCustomConfig && showHasCustomConfigIcon ? (react_1.default.createElement(web_react_1.Badge, { dotClassName: "".concat(colConfigBadgePrefix), dot: true, count: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckTriangleFill, null) }, buttonElement)) : (buttonElement)));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, type === 'dropdown' ? (react_1.default.createElement(DropdownType_1.DropdownType, tslib_1.__assign({}, commonProps, { DropdownProps: DropdownProps, visible: dropdownVisible, setVisible: setDropdownVisible }), getPopoverNode())) : (react_1.default.createElement(ModalType_1.ModalType, tslib_1.__assign({}, commonProps, { CModalProps: CModalProps, visible: modalVisible, setVisible: setModalVisible }), getPopoverNode()))));
});
//# sourceMappingURL=index.js.map