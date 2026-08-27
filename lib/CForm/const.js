"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFormDefaultComponentProps = exports.CFormDefaultDecoratorProps = exports.DefaultBuiltInComponentMap = exports.DefaultLayout = exports.CFormPrefixName = exports.FormFieldCascadeConfigKey = exports.SubFieldValidKey = exports.ReloadPrefixKey = void 0;
var tslib_1 = require("tslib");
var formily_arco_1 = require("@storage-fe/formily-arco");
var Section_1 = require("./react/Components/Decorators/Section");
var DynamicFieldDecorator_1 = tslib_1.__importDefault(require("./react/Components/Decorators/DynamicFieldDecorator"));
var CRadio_1 = tslib_1.__importDefault(require("./react/Components/CRadio"));
var CCheckbox_1 = tslib_1.__importDefault(require("./react/Components/CCheckbox"));
var ConfigPreview_1 = tslib_1.__importDefault(require("./react/Components/ConfigPreview"));
var FeeCalculator_1 = tslib_1.__importDefault(require("./react/Components/FeeCalculator"));
var CAsyncSelect_1 = tslib_1.__importDefault(require("./react/Components/CAsyncSelect"));
var CAgreement_1 = tslib_1.__importDefault(require("./react/Components/CAgreement"));
var ArrayTable_1 = require("@storage-fe/formily-arco/es/ArrayTable");
var ArrayItems_1 = require("@storage-fe/formily-arco/es/ArrayItems");
var Text_1 = tslib_1.__importDefault(require("./react/Components/Text"));
var ArrayTableAddition_1 = tslib_1.__importDefault(require("./react/Components/ArrayButtons/ArrayTableAddition"));
var ArrayRemove_1 = tslib_1.__importDefault(require("./react/Components/ArrayRemove"));
var ArrayBase_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/ArrayBase"));
var ArrayItemsAddition_1 = tslib_1.__importDefault(require("./react/Components/ArrayButtons/ArrayItemsAddition"));
var Group_1 = tslib_1.__importDefault(require("./react/Components/Decorators/Group"));
var TableSelect_1 = tslib_1.__importDefault(require("./react/Components/TableSelect"));
var PreSelectedTable_1 = tslib_1.__importDefault(require("./react/Components/PreSelectedTable"));
var CConfigProvider_1 = require("../CConfigProvider");
var CDrawerSelect_1 = require("./react/Components/CDrawerSelect");
var CTableTransfer_1 = tslib_1.__importDefault(require("./react/Components/CTableTransfer"));
var classNamePrefixFactory_1 = require("../_utils/classNamePrefixFactory");
var AsyncSelectReactive_1 = tslib_1.__importDefault(require("./react/Components/CFormAsyncSelect/AsyncSelectReactive"));
exports.ReloadPrefixKey = '_c_reload_with_';
exports.SubFieldValidKey = '__SubFieldValid';
/**
 * 表单级联数据存储于 GlobalScope 中的 Key
 */
exports.FormFieldCascadeConfigKey = '__FormFieldCascadeConfigKey';
exports.CFormPrefixName = '___c-m-cform___';
exports.DefaultLayout = {
    layout: 'horizontal',
    // 默认六个字标题
    labelWidth: 110,
    labelAlign: 'left',
    requiredSymbol: true,
    size: 'default',
    colon: true,
    helpLayout: 'normal',
    style: {
        height: '100%',
        overflow: 'hidden',
    },
};
exports.DefaultBuiltInComponentMap = {
    Input: formily_arco_1.Input,
    TextArea: formily_arco_1.Input.TextArea,
    InputSearch: formily_arco_1.Input.Search,
    Password: formily_arco_1.Input.Password,
    FormItem: formily_arco_1.FormItem,
    InputNumber: formily_arco_1.InputNumber,
    Section: Section_1.CFormSection,
    DynamicFieldDecorator: DynamicFieldDecorator_1.default,
    CRadio: CRadio_1.default,
    CCheckbox: CCheckbox_1.default,
    Switch: formily_arco_1.Switch,
    Space: formily_arco_1.Space,
    ConfigPreview: ConfigPreview_1.default,
    Select: formily_arco_1.Select,
    Text: Text_1.default,
    Cascader: formily_arco_1.Cascader,
    Checkbox: formily_arco_1.Checkbox,
    CheckboxGroup: formily_arco_1.Checkbox.Group,
    DatePicker: formily_arco_1.DatePicker,
    WeekPicker: formily_arco_1.DatePicker.WeekPicker,
    MonthPicker: formily_arco_1.DatePicker.MonthPicker,
    YearPicker: formily_arco_1.DatePicker.YearPicker,
    QuarterPicker: formily_arco_1.DatePicker.QuarterPicker,
    RangePicker: formily_arco_1.DatePicker.RangePicker,
    TreeSelect: formily_arco_1.TreeSelect,
    FeeCalculator: FeeCalculator_1.default,
    Agreement: CAgreement_1.default,
    CAgreement: CAgreement_1.default,
    CAsyncSelect: CAsyncSelect_1.default,
    TimePicker: formily_arco_1.TimePicker,
    TimeRangePicker: formily_arco_1.TimePicker.RangePicker,
    Upload: formily_arco_1.Upload,
    ArrayTable: ArrayTable_1.JSXTable,
    ArrayTableColumn: formily_arco_1.ArrayTable.Column,
    ArraySortHandle: ArrayBase_1.default.SortHandle,
    ArrayTableAddition: ArrayTableAddition_1.default,
    ArrayIndex: ArrayBase_1.default.Index,
    ArrayMoveDown: ArrayBase_1.default.MoveDown,
    ArrayMoveUp: ArrayBase_1.default.MoveUp,
    ArrayTableRemove: ArrayRemove_1.default,
    ArrayItems: ArrayItems_1.JSXItems,
    ArrayItemsRemove: ArrayRemove_1.default,
    ArrayItemsAddition: ArrayItemsAddition_1.default,
    Group: Group_1.default,
    CTableSelect: TableSelect_1.default,
    PreSelectedTable: PreSelectedTable_1.default,
    CDrawerSelect: CDrawerSelect_1.CFormDrawerSelect,
    CTableTransfer: CTableTransfer_1.default,
    CFormAsyncSelect: AsyncSelectReactive_1.default,
};
exports.CFormDefaultDecoratorProps = {
    FormItem: {
        requiredAlign: true,
        colon: false,
        controlPopover: {
            triggerProps: {
                updateOnScroll: true,
            },
        },
    },
    Space: {
        align: 'start',
    },
};
exports.CFormDefaultComponentProps = {
    ArrayTable: {
        className: "".concat(classNamePrefixFactory_1.GLOBAL_PREFIX, "-form-array-table"),
        additionPosition: 'paginationTop',
        pagination: { pageSize: Number.MAX_SAFE_INTEGER },
    },
    ArrayTableRemove: { type: 'text' },
    ArrayItems: { itemGap: 12 },
    Select: {
        placeholder: (0, CConfigProvider_1.getGlobalContextConfig)().locale.CForm.placeholder.select,
        triggerProps: {
            updateOnScroll: true,
        },
    },
    CAsyncSelect: {
        triggerProps: {
            updateOnScroll: true,
        },
    },
    Input: {
        placeholder: (0, CConfigProvider_1.getGlobalContextConfig)().locale.CForm.placeholder.input,
    },
    TextArea: {},
    InputSearch: {},
    Password: {},
    InputNumber: {},
    Cascader: {},
    TreeSelect: {},
};
//# sourceMappingURL=const.js.map