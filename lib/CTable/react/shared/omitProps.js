"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitCamelProps = exports.omitToolbarItemRenderProps = exports.omitCellRenderProps = void 0;
var lodash_es_1 = require("lodash-es");
// 因为渲染 cell 的组件时，是把 cell 组件的 props 和 领域模型相关信息（CellComponentRenderProps）
// 合并到一起传给组件的，在 plugin 封装 cell 组件时，避免把领域模型相关的信息透传给了底层的组件
// 透传给底层组件的坏处是：1. 底层组件可能把额外的 props 给传到 html 上  2. 不太干净
var omitCellRenderProps = function (props) {
    // CellComponentRenderProps 的属性
    return ((0, lodash_es_1.omit)(props, ['table', 'row', 'rowData', 'cell', 'column', 'cellData', 'content']));
};
exports.omitCellRenderProps = omitCellRenderProps;
// 同理 toolbar item 也要做类似的处理
var omitToolbarItemRenderProps = function (props) {
    // ToolbarItemRenderProps 的属性
    return ((0, lodash_es_1.omit)(props, ['table', 'toolbar', 'toolbarItem', 'onChange', 'value']));
};
exports.omitToolbarItemRenderProps = omitToolbarItemRenderProps;
// 对于 cell 和 toolbar 的内置组件，需要移除 modelProps 中的驼峰命名的 prop，原因是：传递给 html 元素时会有报错
// 驼峰命名的 Prop 包括：cellData, rowData, tableEditor
var omitCamelProps = function (props) {
    // CellComponentRenderProps 的属性
    return ((0, lodash_es_1.omit)(props, ['rowData', 'cellData', 'tableEditor']));
};
exports.omitCamelProps = omitCamelProps;
//# sourceMappingURL=omitProps.js.map