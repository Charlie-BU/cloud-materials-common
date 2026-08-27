import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-13 11:31:05
 * @LastEditTime: 2021-12-15 16:52:29
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { debounce } from 'lodash-es';
import { ToolbarProvider, renderDecorator, useAttach, usePrefix } from '../../../react';
import { ToolbarRow } from './ToolbarRow';
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
    useAttach(toolbar);
    var config = formatConfig(toolbar.config);
    var doSearch = debounce(function () {
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
    return (React.createElement("div", { className: prefixCls }, (_c = config.rows) === null || _c === void 0 ? void 0 : _c.map(function (rowConfig, index) {
        return React.createElement(ToolbarRow, { key: index, config: rowConfig, onChange: onChange });
    })));
};
// 验证整个 toolbar 各个组件都没有主动包裹 observer，是否能够重新渲染（会渲染，整个 table 重新渲染时，toolbar 会带着渲染）
// TODO 支持 form 包装并考虑老代码的迁移成本
export var Toolbar = function () {
    var prefixCls = usePrefix('toolbar');
    return (React.createElement(ToolbarProvider, null, function (options) {
        return renderDecorator(options.table, renderToolbar(__assign(__assign({}, options), { prefixCls: prefixCls })), {
            scope: 'toolbar',
            decoratorType: options.toolbar.decorator,
            // decoratorProps: options.toolbar.decoratorProps,
            renderOptions: options,
        });
    }));
};
//# sourceMappingURL=Toolbar.js.map