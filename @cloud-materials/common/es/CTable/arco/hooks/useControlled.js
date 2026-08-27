import { useEffect } from 'react';
// 支持部分 table 配置的受控
export var useControlledConfig = function (table, tableConfig) {
    var _a;
    // TableEditor 场景下不能支持 config 根据 props.config 变化
    // 所以只有非 TableEditor 场景才会将最新的 config 赋予 table 领域模型
    if (!((_a = table.config.extraConfig) === null || _a === void 0 ? void 0 : _a.isInTableEditor) && tableConfig) {
        // 每次都将最新的 config 保存到 table 上，以规避 react 闭包问题
        table.config = tableConfig;
    }
    useEffect(function () {
        var _a, _b, _c;
        if (
        // 如果声明了 column.title 受控，或通过全局的 ConfigProvider 声明了所有的 column.title 都受控
        (_b = (_a = tableConfig === null || tableConfig === void 0 ? void 0 : tableConfig.extraConfig) === null || _a === void 0 ? void 0 : _a.controlledConfig) === null || _b === void 0 ? void 0 : _b['column.title']) {
            (_c = table.config.columns) === null || _c === void 0 ? void 0 : _c.forEach(function (columnConfig) {
                var _a;
                // 其实 table.config.columns 已经被 fix 过了，columnConfig 一定存在的
                // 这里还是判断一下 columnConfig 的存在性，避免类型报错，保证此处代码的严谨性
                // 逻辑在 packages/common/components/CTable/core/models/Table.ts fixColumns
                if (!columnConfig) {
                    return;
                }
                // table.config.columns 被 fix 后，dataIndex 也是必然存在的，这里同样也是处理下类型上的严谨性
                var column = table.getColumnByDataIndex((_a = columnConfig.dataIndex) !== null && _a !== void 0 ? _a : '');
                if (!column) {
                    return;
                }
                if (column.title !== columnConfig.title) {
                    column.setTitle(columnConfig.title);
                }
            });
        }
    }, [table.config]);
};
//# sourceMappingURL=useControlled.js.map