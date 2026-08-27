"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = void 0;
var tslib_1 = require("tslib");
/* eslint-disable lines-between-class-members */
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 16:55:28
 * @LastEditTime: 2021-10-24 16:50:00
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var types_1 = require("../../types");
var Toolbar = /** @class */ (function () {
    function Toolbar(table) {
        this.loading = false;
        this.initialized = false;
        this.mounted = false;
        this.unmounted = false;
        this.filterValues = {};
        this.table = table;
        // this.config = config;
        this.initDataFromConfig();
        this.makeObservable();
        this.onInit();
    }
    Object.defineProperty(Toolbar.prototype, "config", {
        get: function () {
            return this.table.config.toolbar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "component", {
        get: function () {
            var _a;
            return (_a = this.config) === null || _a === void 0 ? void 0 : _a.component;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "decorator", {
        get: function () {
            var _a;
            return (_a = this.config) === null || _a === void 0 ? void 0 : _a.decorator;
        },
        enumerable: false,
        configurable: true
    });
    // get component() {
    //   return [this.config?.component, this.componentProps];
    // }
    // set component(value: ComponentConfig) {
    //   setComputedComponent(this, 'component', value);
    // }
    // get decorator() {
    //   return [this.decoratorType, this.decoratorProps];
    // }
    // set decorator(value: ComponentConfig) {
    //   setComputedComponent(this, 'decorator', value);
    // }
    Toolbar.prototype.initDataFromConfig = function () {
        var config = this.config;
        // 支持配置 toolbar 的初始值
        if (config === null || config === void 0 ? void 0 : config.initialValues) {
            this.filterValues = config === null || config === void 0 ? void 0 : config.initialValues;
        }
        // this.component = formatComponentConfig(config.component, config.componentProps);
        // this.decorator = formatComponentConfig(config.decorator, config.decoratorProps);
    };
    Toolbar.prototype.makeObservable = function () {
        var privateAction = {
        // setComponentConfig: action,
        };
        (0, reactive_1.define)(this, tslib_1.__assign({ 
            // config: observable.computed,
            loading: reactive_1.observable, 
            // componentType: observable,
            // componentProps: observable,
            // decoratorType: observable,
            // decoratorProps: observable,
            // items: observable,
            filterValues: reactive_1.observable, 
            // component: observable.computed,
            // decorator: observable.computed,
            // createItem: action,
            setLoading: reactive_1.action, setFilterValues: reactive_1.action }, privateAction));
    };
    Toolbar.prototype.onInit = function () {
        this.initialized = true;
        this.table.notify(types_1.LifeCycleTypes.ON_TOOLBAR_INIT, { toolbar: this });
    };
    Toolbar.prototype.onMount = function () {
        this.mounted = true;
        this.unmounted = false;
        this.table.notify(types_1.LifeCycleTypes.ON_TOOLBAR_MOUNT, { toolbar: this });
    };
    Toolbar.prototype.onUnmount = function () {
        this.mounted = false;
        this.unmounted = true;
        this.table.notify(types_1.LifeCycleTypes.ON_TOOLBAR_UNMOUNT, { toolbar: this });
    };
    // ToolbarItem 领域模型没定，这个逻辑暂时留空
    // createItem(itemConfig: ToolbarItemConfig) {
    // if (itemConfig.name === undefined) {
    //   itemConfig.name = this.items.length.toString();
    // }
    // const toolbarItem = new ToolbarItem(itemConfig);
    // this.items.push(toolbarItem);
    // return toolbarItem;
    // return {};
    // }
    // setComponent(component: JSXComponent, props?: ComponentProps) {
    //   this.component = component;
    //   setComponentProps(this, 'component', props);
    // }
    // setComponentProps(props: ComponentProps) {
    //   setComponentProps(this, 'component', props);
    // }
    // setDecorator(component: JSXComponent, props?: ComponentProps) {
    //   this.decorator = component;
    //   setComponentProps(this, 'decorator', props);
    // }
    // setDecoratorProps(props: ComponentProps) {
    //   setComponentProps(this, 'decorator', props);
    // }
    Toolbar.prototype.setFormInstance = function (form) {
        this.form = form;
    };
    Toolbar.prototype.setLoading = function (loading) {
        this.loading = loading;
    };
    // getItemByName(name: string) {
    //   return this.items.find(item => item.name === name);
    // }
    Toolbar.prototype.setFilterValues = function (filerValues, options) {
        if (options === void 0) { options = {}; }
        if (options.merge) {
            this.filterValues = tslib_1.__assign(tslib_1.__assign({}, this.filterValues), filerValues);
        }
        else {
            this.filterValues = filerValues;
        }
        this.table.notify(types_1.LifeCycleTypes.ON_TOOLBAR_VALUE_CHANGE, { toolbar: this });
    };
    Toolbar.prototype.filter = function (filerValues) {
        if (filerValues) {
            this.setFilterValues(filerValues);
        }
        this.table.toolbarFilter();
    };
    return Toolbar;
}());
exports.Toolbar = Toolbar;
//# sourceMappingURL=Toolbar.js.map