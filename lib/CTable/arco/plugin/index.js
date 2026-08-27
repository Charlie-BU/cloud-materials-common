"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPlugin = exports.globalComponents = void 0;
var tslib_1 = require("tslib");
var CTag_1 = tslib_1.__importDefault(require("../../../CTag"));
var CStatus_1 = tslib_1.__importDefault(require("../../../CStatus"));
var CNameInfo_1 = tslib_1.__importDefault(require("../../../CNameInfo"));
var COperationMenu_1 = tslib_1.__importDefault(require("../../../COperationMenu"));
var CPopupEdit_1 = tslib_1.__importDefault(require("../../../CPopupEdit"));
var CInlineEdit_1 = tslib_1.__importDefault(require("../../../CInlineEdit"));
var CCollapse_1 = tslib_1.__importDefault(require("../../../CCollapse"));
var CEllipsis_1 = tslib_1.__importDefault(require("../../../CEllipsis"));
var CAsyncSelect_1 = tslib_1.__importDefault(require("../../../CAsyncSelect"));
var CAsyncSwitch_1 = tslib_1.__importDefault(require("../../../CAsyncSwitch"));
var CFeeType_1 = tslib_1.__importDefault(require("../../../CFeeType"));
// import OperationMenu from '../../../OperationMenu';
// import NameInfo from '../../../NameInfo';
// import EditPopup from '../../../EditPopup';
// import EditBox from '../../../EditBox';
// import AsyncSwitch from '../../../AsyncSwitch';
// import FeeType from '../../../FeeType';
// import Key from '../../../Key';
// import ProjectLink from '../../../ProjectLink';
// import Status from '../../../Status';
var components_1 = require("./components");
// import { Text, Number, Tag, RefreshBtn, ColConfigBtn, FunctionBtnList, ExportDataBtn } from './components';
var filters_1 = require("./filters");
var formatter_1 = require("./formatter");
var sorter_1 = require("./sorter");
var summary_1 = require("./summary");
var autoWidth_1 = require("./autoWidth");
var resize_1 = require("./resize");
// import SimpleSearch from './formItem/SimpleSearch';
var defaultProps_1 = require("./defaultProps");
var BuiltInComponent_1 = require("../types/BuiltInComponent");
var raceConditionResolver_1 = require("./raceConditionResolver");
// const AsyncOperationMenu = OperationMenu.Async;
exports.globalComponents = [
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.Text, component: components_1.Text },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.Number, component: components_1.Number },
    // { scope: 'cell', name: 'Tag', component: Tag },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CTag, component: CTag_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CStatus, component: CStatus_1.default },
    {
        scope: 'cell',
        name: BuiltInComponent_1.CellComponentsEnum.CNameInfo,
        component: CNameInfo_1.default,
        defaultComponentProps: defaultProps_1.defaultCNameInfoProps,
    },
    {
        scope: 'cell',
        name: BuiltInComponent_1.CellComponentsEnum.COperationMenu,
        component: COperationMenu_1.default,
        defaultComponentProps: defaultProps_1.defaultCellOperationMenuProps,
    },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CPopupEdit, component: CPopupEdit_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CInlineEdit, component: CInlineEdit_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CCollapse, component: CCollapse_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CEllipsis, component: CEllipsis_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CAsyncSwitch, component: CAsyncSwitch_1.default },
    { scope: 'cell', name: BuiltInComponent_1.CellComponentsEnum.CFeeType, component: CFeeType_1.default },
    // { scope: 'cell', name: 'Key', component: Key },
    // {
    //   scope: 'cell',
    //   name: 'OperationMenu',
    //   component: OperationMenu,
    //   defaultComponentProps: defaultCellOperationMenuProps,
    // },
    // {
    //   scope: 'cell',
    //   name: 'AsyncOperationMenu',
    //   component: AsyncOperationMenu,
    //   defaultComponentProps: defaultCellAsyncOperationMenuProps,
    // },
    // {
    //   scope: 'cell',
    //   name: 'NameInfo',
    //   component: NameInfo,
    //   defaultComponentProps: defaultNameInfoProps,
    // },
    // { scope: 'cell', name: 'Status', component: Status },
    // { scope: 'cell', name: 'EditPopup', component: EditPopup },
    // { scope: 'cell', name: 'EditBox', component: EditBox },
    // { scope: 'cell', name: 'AsyncSwitch', component: AsyncSwitch },
    // { scope: 'cell', name: 'FeeType', component: FeeType },
    // { scope: 'cell', name: 'ProjectLink', component: ProjectLink },
    {
        scope: 'toolbarItem',
        name: BuiltInComponent_1.ToolbarComponentsEnum.CToolbarOperationMenu,
        component: COperationMenu_1.default,
        defaultComponentProps: defaultProps_1.defaultOperationMenuProps,
    },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.RefreshBtn, component: components_1.RefreshBtn },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.ExportDataBtn, component: components_1.ExportDataBtn },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.ColConfigBtn, component: components_1.ColConfigBtn },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.CSearch, component: components_1.CSearch },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.CSimpleSearch, component: components_1.CSimpleSearch },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.CCascaderSearch, component: components_1.CCascaderSearch },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.CCombineSearch, component: components_1.CCombineSearch },
    { scope: 'toolbarItem', name: BuiltInComponent_1.ToolbarComponentsEnum.FunctionBtnList, component: components_1.FunctionBtnList },
    {
        scope: 'toolbarItem',
        name: BuiltInComponent_1.ToolbarComponentsEnum.CAsyncSelect,
        component: CAsyncSelect_1.default,
        defaultComponentProps: defaultProps_1.defaultCAsyncSelectProps,
    },
    // { scope: 'formItem', name: 'SimpleSearch', component: SimpleSearch },
];
var DefaultPlugin = /** @class */ (function () {
    function DefaultPlugin() {
    }
    DefaultPlugin.prototype.apply = function (table) {
        table.plugin.mixin({
            filter: [filters_1.select, filters_1.range, filters_1.searchInput],
            formatter: [formatter_1.intFormatter, formatter_1.floatFormatter, formatter_1.money, formatter_1.timestamp, formatter_1.time, formatter_1.utcTime, formatter_1.fallbackText],
            sorter: [sorter_1.defaultSorter],
            summary: [summary_1.sum],
            // arco 已经实现了选择的效果，直接桥接到 arco
            rowSelection: [{ type: 'radio' }, { type: 'checkbox', multiple: true }],
            autoWidth: [autoWidth_1.defaultAutoWidth],
            resize: [resize_1.defaultResize],
            components: exports.globalComponents,
            raceConditionResolver: new raceConditionResolver_1.RaceConditionResolver(),
        });
    };
    return DefaultPlugin;
}());
exports.DefaultPlugin = DefaultPlugin;
//# sourceMappingURL=index.js.map