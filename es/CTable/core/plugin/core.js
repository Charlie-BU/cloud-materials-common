import { __assign, __read } from "tslib";
import { isStr, isFn } from '../../shared';
import { merge } from 'lodash-es';
var globalPlugin = [];
var globalComponents = {};
var globalComponentsByName = {};
var Plugin = /** @class */ (function () {
    function Plugin(table) {
        this.sorter = {};
        this.filter = {};
        this.formatter = {};
        this.summary = {};
        this.components = {};
        this.expandRow = {};
        this.rowSelection = {};
        this.autoWidth = {};
        this.resize = {};
        this.pluginMap = {};
        this.table = table;
    }
    Plugin.globalUse = function (name, plugin) {
        globalPlugin.push([name, plugin]);
    };
    Plugin.globalMixin = function (options) {
        if (options.components) {
            options.components.forEach(function (componentConf) {
                var scope = componentConf.scope, name = componentConf.name;
                globalComponents[scope] = globalComponents[scope] || {};
                globalComponents[scope][name] = componentConf;
                // 通过 component name 作为 key 保存组件，方便在没有传递 scope 时，直接通过 name 获取组件
                if (globalComponentsByName[name]) {
                    console.error("duplicate mixin component ".concat(name, " in plugin"));
                }
                else {
                    globalComponentsByName[name] = componentConf;
                }
            });
        }
    };
    Plugin.getComponent = function (name, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var componentConf;
        if (options.scope) {
            componentConf = (_a = globalComponents[options.scope]) === null || _a === void 0 ? void 0 : _a[name];
        }
        else {
            componentConf = globalComponentsByName[name];
        }
        if (!componentConf) {
            if (options.logError !== false) {
                console.error("cannot find component ".concat(name, " in table plugin"));
            }
            return;
        }
        return componentConf;
    };
    Plugin.prototype.assignTarget = function (target, sources) {
        if (sources === void 0) { sources = []; }
        sources.forEach(function (item) {
            target[item.type] = item;
        });
    };
    Plugin.prototype.getMergedPluginContent = function (source, incomingPlugin) {
        if (incomingPlugin === void 0) { incomingPlugin = {}; }
        // 在获取 plugin 内容时，支持传递 type，或者传递 sorter、formatter 等配置，与 plugin 内对应 type 的内容进行合并
        if (isStr(incomingPlugin)) {
            return source[incomingPlugin] || {};
        }
        return merge({}, source[incomingPlugin.type], incomingPlugin);
    };
    Plugin.prototype.init = function () {
        var _this = this;
        globalPlugin.forEach(function (_a) {
            var _b = __read(_a, 2), pluginName = _b[0], plugin = _b[1];
            _this.table.plugin.use(pluginName, plugin);
        });
    };
    Plugin.prototype.use = function (name, plugin) {
        if (this.pluginMap[name]) {
            return;
        }
        this.pluginMap[name] = plugin;
        plugin.apply(this.table);
    };
    Plugin.prototype.mixin = function (options) {
        var _this = this;
        this.assignTarget(this.sorter, options.sorter);
        this.assignTarget(this.filter, options.filter);
        this.assignTarget(this.formatter, options.formatter);
        this.assignTarget(this.summary, options.summary);
        this.assignTarget(this.expandRow, options.expandRow);
        this.assignTarget(this.rowSelection, options.rowSelection);
        this.assignTarget(this.autoWidth, options.autoWidth);
        this.assignTarget(this.resize, options.resize);
        if (options.components) {
            options.components.forEach(function (componentConf) {
                var scope = componentConf.scope, name = componentConf.name;
                _this.components[scope] = _this.components[scope] || {};
                _this.components[scope][name] = componentConf;
            });
        }
        if (options.raceConditionResolver) {
            this.raceConditionResolver = options.raceConditionResolver;
        }
    };
    Plugin.prototype.getComponent = function (name, options) {
        var _a;
        if (!isStr(name)) {
            return { Component: name, defaultComponentProps: {} };
        }
        var componentConf = ((_a = this.components[options.scope]) === null || _a === void 0 ? void 0 : _a[name]) || Plugin.getComponent(name, options);
        if (!componentConf) {
            if (options.logError !== false) {
                console.error("cannot find component ".concat(name, " in table plugin"));
            }
            return {};
        }
        return {
            Component: componentConf.component,
            defaultComponentProps: componentConf.defaultComponentProps,
        };
    };
    Plugin.prototype.getFormatter = function (formatter) {
        if (isFn(formatter)) {
            return {
                formatterFn: formatter,
            };
        }
        return this.getMergedPluginContent(this.formatter, formatter);
    };
    Plugin.prototype.getSorter = function (sorter) {
        sorter = isFn(sorter) ? { sorterFn: sorter } : sorter;
        var mergedPluginContent = this.getMergedPluginContent(this.sorter, sorter);
        // 为了解决用户只配置了 sorterFn 而没有配置 type: 'default' 导致 direction 不存在的问题（direction 配置在了 default 的插件中）
        // 如果入参有 sorter，但是 mergedPluginContent 中没有 directions 时用默认 directions 兜底
        if (sorter) {
            return __assign({ directions: ['ascend', 'descend'] }, mergedPluginContent);
        }
        return mergedPluginContent;
    };
    Plugin.prototype.getFilter = function (filter) {
        return this.getMergedPluginContent(this.filter, filter);
    };
    Plugin.prototype.getSummary = function (summary) {
        return this.getMergedPluginContent(this.summary, summary);
    };
    Plugin.prototype.getExpandRow = function (expandRow) {
        return this.getMergedPluginContent(this.expandRow, expandRow);
    };
    Plugin.prototype.getRowSelection = function (rowSelection) {
        return this.getMergedPluginContent(this.rowSelection, rowSelection);
    };
    Plugin.prototype.getAutoWidth = function (autoWidth) {
        return this.getMergedPluginContent(this.autoWidth, autoWidth);
    };
    Plugin.prototype.getResize = function (resize) {
        return this.getMergedPluginContent(this.resize, resize);
    };
    Plugin.prototype.getRaceConditionResolver = function () {
        return this.raceConditionResolver;
    };
    return Plugin;
}());
export { Plugin };
//# sourceMappingURL=core.js.map