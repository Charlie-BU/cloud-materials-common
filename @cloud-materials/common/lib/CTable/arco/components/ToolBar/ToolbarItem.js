"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var react_3 = require("../../../react");
var shared_1 = require("../../../shared");
var hooks_1 = require("../../../../CTableEditor/view/hooks");
var shared_2 = require("../../../react/shared");
var BuiltInComponent_1 = require("../../types/BuiltInComponent");
exports.ToolbarItem = (0, react_2.observer)(function (_a) {
    var _b;
    var config = _a.config, onChange = _a.onChange;
    var table = (0, react_3.useTable)();
    var tableEditor = (0, hooks_1.useTableEditor)();
    var prefixCls = (0, react_3.usePrefix)('toolbar');
    var contentNode;
    var configComponent = config.component;
    // 现在还这样写，是为了兼容老的代码，处理 component 可能是字符串的情况
    var _c = table.plugin.getComponent(configComponent, {
        scope: 'toolbarItem',
    }), Component = _c.Component, defaultComponentProps = _c.defaultComponentProps;
    if (Component) {
        // 现在还这样写，是为了兼容老的代码，新组件不支持传 componentProps 了
        var componentProps = config.componentProps;
        var modelProps = {
            table: table,
            tableEditor: tableEditor,
            toolbar: table.toolbar,
            onChange: function (val) {
                // 配置了 ToolbarItem 的 name 时，才 onChange 出去
                // 也就是 ToolbarItem 不配置 name，外部就无法获取到某个其 value
                if (config.name) {
                    onChange(config.name, val, config.filterOnChange !== false);
                }
            },
            value: (_b = table.toolbar) === null || _b === void 0 ? void 0 : _b.filterValues[config.name || ''],
        };
        if ((0, shared_1.isFn)(componentProps)) {
            componentProps = componentProps(modelProps);
        }
        /**
         * 2023-10-17 更新，内置组件的 props 中的 modelProps，移除 rowData, cellData, tableEditor
         * 原因是有些内置组件，比如 CStatus，会把 props 透传给下面的 dom 元素，而 dom 元素不能接受 cellData, tableEditor 这样的驼峰命名的 props，导致控制台报警告
         * 不能全部移除的原因是: RefreshBtn 等组件会消费 props 中的 table 等领域模型，不能影响存量代码
         */
        var omittedModelProps = configComponent in BuiltInComponent_1.ToolbarComponentsEnum ? (0, shared_2.omitCamelProps)(modelProps) : modelProps;
        contentNode = react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, componentProps, omittedModelProps));
    }
    return react_1.default.createElement("div", { className: "".concat(prefixCls, "-item") }, contentNode);
});
//# sourceMappingURL=ToolbarItem.js.map