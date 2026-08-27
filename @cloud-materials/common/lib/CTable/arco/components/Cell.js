"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCellMemo = exports.TableCell = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:35
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var utils_1 = require("../../utils");
var react_3 = require("../../react");
var shared_1 = require("../../shared");
var utils_2 = require("../utils");
var BuiltInComponent_1 = require("../types/BuiltInComponent");
var shared_2 = require("../../react/shared");
var CellComponent = (0, react_2.observer)(function (_a) {
    var options = _a.options, arcoCellSpanClassname = _a.arcoCellSpanClassname;
    // 三种配置单元格自定义渲染的情况，以下是使用的优先级
    // 1. render，和 arco render 参数、行为均一致，优先级最高
    // 2. cell.component，对应 columnConfig 中的 component，可以使用组件 props 中提供的完整的领域模型信息
    // 3. cell.componentType，对应 columnConfig 中的 cellComponent。这种情况主要是为了兼容老代码
    var prefix = (0, react_3.usePrefix)();
    var table = options.table, cell = options.cell;
    var column = options.column;
    var componentConf = table.plugin.getComponent(cell.component, {
        // 不兼容老代码的 cell.componentType
        // let componentConf = table.plugin.getComponent(cell.component || cell.componentType, {
        scope: 'cell',
    });
    if (!componentConf.Component) {
        // 默认用 Text 组件渲染 cell
        componentConf = table.plugin.getComponent('Text', { scope: 'cell' });
    }
    var Component = componentConf.Component, defaultComponentProps = componentConf.defaultComponentProps;
    var content = (0, shared_1.formatCellData)({
        cellData: cell.data,
        table: table,
        column: column,
        cell: cell,
    });
    var componentProps = cell.componentProps;
    // 不兼容老代码的 cellComponentProps
    // let componentProps = cell.componentProps || cell.cellComponentProps;
    var modelProps = tslib_1.__assign(tslib_1.__assign({}, options), { content: content, cellData: cell.data });
    if ((0, shared_1.isFn)(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    var _b = (0, utils_2.getCellDataCy)(cell, prefix), dataCy = _b.dataCy, dataCyIdx = _b.dataCyIdx;
    /*
    将 component 当成组件使用存在的问题：
    1. 如果组件返回 undefined，会导致 react 崩溃
    2. 如果用 ErrorBoundary 包裹该组件，在组件崩溃后，无法 rerender，导致用户数据更新后，cell 没有更新
    3. 通过给 ErrorBoundary 加 key 的方式，可以实现 rerender，但要在发生错误时，更新 key，过于复杂

    将 component 当成函数调用存在的问题：
    1. react 不会创建新的节点，component 组件作用域（如 hooks、更新粒度等）属于调用 component 的组件
    2. 在我们的场景下，我们用 CellComponent 包裹用户的组件，相当于用户的组件作用域属于 CellComponent，
       就算将 component 当成函数调用，component 也可以使用 react 的所有特性
    3. 因为用户都是被 antd 和 arco 教育过的，并且考虑到老代码迁移过来的惯性，保持和 arco 的调用方式一致，出问题的概率更小

    因此我们选择：以函数调用的方式使用 component ，从而和 arco 的行为保持一致，避免用户迁移到新 table 后出现线上问题
  */
    var cellContent;
    if (column.config.render) {
        cellContent = column.config.render(cell.data, cell.row.data, cell.row.index);
    }
    else if ((0, shared_1.isFn)(Component)) {
        cellContent = Component(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultComponentProps), (cell.component in BuiltInComponent_1.CellComponentsEnum ? (0, shared_2.omitCamelProps)(modelProps) : modelProps)), componentProps));
    }
    else if (Component.type) {
        // 如果 component 是 formily observer 包裹后的结果
        // 这里获取到的 Component 是一个组件（暂时通过 type 属性来识别），不能通过函数的方式来调用
        var Comp = Component;
        // 同理，注意 props 覆盖顺序：使用业务方传入的组件 componentProps 覆盖 modelProps
        cellContent = react_1.default.createElement(Comp, tslib_1.__assign({}, defaultComponentProps, modelProps, componentProps));
    }
    else if ((Component === null || Component === void 0 ? void 0 : Component.$$typeof.toString()) === 'Symbol(react.forward_ref)') {
        // 组件使用了forwardRef
        /**
         * 2024-2-18：修复使用forwardRef组件无法渲染问题，如CAsyncSwitch
         * 同时modelProps与isFn(Component)中逻辑保持一致
         * 备注：这里的代码没有((Component as any).type)合并的原因：自定义组件modelProps如果忽略了，可能存在breaking change
         */
        var Comp = Component;
        cellContent = (react_1.default.createElement(Comp, tslib_1.__assign({}, defaultComponentProps, (cell.component in BuiltInComponent_1.CellComponentsEnum ? (0, shared_2.omitCamelProps)(modelProps) : modelProps), componentProps)));
    }
    else {
        console.error('render or valid component configuration not found');
    }
    return (
    // arco 的 cell 渲染结果是用一个 <span className="arco-table-cell-wrap-value">text</span> 包裹 text 内容
    // 这里和 arco 保持一致
    react_1.default.createElement("span", { className: arcoCellSpanClassname, "data-testid": dataCy, "data-cy": dataCy, "data-cy-idx": dataCyIdx, style: { marginRight: column.config.alignType === 'right' ? (0, utils_2.getAlignRightWidth)(column) : undefined } }, (0, utils_1.fallbackText)(cellContent)));
});
exports.TableCell = (0, react_2.observer)(function (_a) {
    var column = _a.column, className = _a.className;
    return (react_1.default.createElement(react_3.CellProvider, { dataIndex: column.dataIndex }, function (options) {
        return (0, react_3.renderDecorator)(options.table, react_1.default.createElement(CellComponent, { options: options, arcoCellSpanClassname: className }), {
            scope: 'cell',
            decoratorType: options.cell.decoratorType,
            decoratorProps: options.cell.decoratorProps,
            renderOptions: options,
        });
    }));
});
exports.TableCellMemo = (0, react_1.memo)(exports.TableCell, function (prev, next) {
    /**
     * arco 渲染 cell 组件时，主要传入了如下的几个属性：
     * column、className、rowData
     * 以及 onHandleSave、onClick、onMouseOver 等，这几个不认为是状态，不参与 memo 的属性比较
     *
     * memo cell 的目的是，避免 table 的全局状态改变时，导致所有的 cell 都重新渲染
     *
     * 1. column：table 整体 rerender 时，一定会传入新的 column（包括 column 配置中的函数也是新的），因此如果 column 参与对比，基本就没有了 memo 的意义
     * 经过核对 table 的 column 配置 api，cell 基本不会受控于 column 的配置，因此不对比 column 的变化
     * TODO 未来可以挑选一些 cell 依赖的 column 配置进行对比
     *
     * 2. rowData：实际上 cell 只会消费 row.data
     * row.data 变化时，可以依赖 observer 来触发 cell 的 render（业务访问的其他 row 属性也可以通过 observer 触发 rerender），
     * 因此可以不对比 row.data 的变化
     *
     * 总结：只对 className 做对比，大概率 cell 也能正常渲染（还需要实际场景多验证）
     * 其实 className 应该大概率也不怎么变
     */
    return prev.className === next.className;
});
//# sourceMappingURL=Cell.js.map