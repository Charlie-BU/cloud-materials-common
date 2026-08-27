"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-12-15 16:52:29
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var lodash_es_1 = require("lodash-es");
var react_2 = require("../../../react");
var ToolbarRow_1 = require("./ToolbarRow");
var formatConfig = function (config) {
    // 将直接配置的 left、right、bottomLeft 格式化为标准的格式
    if (config.left || config.right) {
        config.rows = [
            {
                left: config.left,
                right: config.right,
            },
        ];
    }
    // 暂不支持 bottomRows，想不到使用场景
    // if (config.bottomLeft) {
    //   config.bottomRows = [
    //     {
    //       left: config.bottomLeft,
    //     },
    //   ];
    // }
    return config;
};
var renderToolbar = function (_a) {
    var _b, _c;
    var toolbar = _a.toolbar, prefixCls = _a.prefixCls;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, react_2.useAttach)(toolbar);
    var config = formatConfig(toolbar.config);
    var doSearch = (0, lodash_es_1.debounce)(function () {
        toolbar.filter();
    }, config.debounceDelay || 500);
    var onChange = function (toolbarItemName, value, shouldSearch) {
        var _a;
        toolbar.setFilterValues((_a = {}, _a[toolbarItemName] = value, _a), { merge: true });
        // 支持单个 ToolbarItem 和整 toolbar 的 change 不触发搜索
        if (shouldSearch && config.filterOnChange !== false) {
            doSearch();
        }
    };
    var showRow = config.rows && ((_b = config.rows) === null || _b === void 0 ? void 0 : _b.length) > 0;
    if (!showRow) {
        return null;
    }
    return (react_1.default.createElement("div", { className: prefixCls }, (_c = config.rows) === null || _c === void 0 ? void 0 : _c.map(function (rowConfig, index) {
        return react_1.default.createElement(ToolbarRow_1.ToolbarRow, { key: index, config: rowConfig, onChange: onChange });
    })));
};
// 验证整个 toolbar 各个组件都没有主动包裹 observer，是否能够重新渲染（会渲染，整个 table 重新渲染时，toolbar 会带着渲染）
// TODO 支持 form 包装并考虑老代码的迁移成本
var Toolbar = function () {
    var prefixCls = (0, react_2.usePrefix)('toolbar');
    return (react_1.default.createElement(react_2.ToolbarProvider, null, function (options) {
        return (0, react_2.renderDecorator)(options.table, renderToolbar(tslib_1.__assign(tslib_1.__assign({}, options), { prefixCls: prefixCls })), {
            scope: 'toolbar',
            decoratorType: options.toolbar.decorator,
            // decoratorProps: options.toolbar.decoratorProps,
            renderOptions: options,
        });
    }));
};
exports.Toolbar = Toolbar;
//# sourceMappingURL=Toolbar.js.map