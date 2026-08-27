"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrlQueryConfig = void 0;
var tslib_1 = require("tslib");
var core_1 = require("../../core");
var types_1 = require("../types");
var helper_1 = require("../../helper");
var lodash_es_1 = require("lodash-es");
/**
 * 如果用户配了 syncWithUrlQuery，需要处理 config
 *
 * - table status 改变同步到 url query，是在各个 status 改变的 effect 中执行的，所以需要处理 effect
 * - 初始化时，将 url query 同步到 table status，需要处理 getInitStatus
 * @param config
 * @returns
 */
var formatUrlQueryConfig = function (config) {
    if (config === null || config === void 0 ? void 0 : config.syncWithUrlQuery) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        var _a = config === null || config === void 0 ? void 0 : config.syncWithUrlQuery, status_1 = _a.status, getQueryOptions_1 = _a.getQueryOptions, setQueryOptions_1 = _a.setQueryOptions;
        var commonSetOptions_1 = {
            stringifyOptions: setQueryOptions_1 === null || setQueryOptions_1 === void 0 ? void 0 : setQueryOptions_1.stringifyOptions,
            method: setQueryOptions_1 === null || setQueryOptions_1 === void 0 ? void 0 : setQueryOptions_1.method,
        };
        var formatSetQuery_1 = function (table, status) {
            var _a;
            if (setQueryOptions_1 === null || setQueryOptions_1 === void 0 ? void 0 : setQueryOptions_1.format) {
                return setQueryOptions_1.format({
                    pageSize: table.pageSize,
                    currentPage: table.currentPage,
                    columnFilterValues: table.columnFilterValues,
                    sorterValues: table.sorterValues,
                    toolbarValues: (_a = table.toolbar) === null || _a === void 0 ? void 0 : _a.filterValues,
                });
            }
            return status;
        };
        var getCurrentStatusFromUrl_1 = function () {
            var urlQuery = helper_1.helper.getUrlQuery(getQueryOptions_1 === null || getQueryOptions_1 === void 0 ? void 0 : getQueryOptions_1.parseOptions);
            // 如果传了自定义的 format 函数，就用 format
            if (getQueryOptions_1 === null || getQueryOptions_1 === void 0 ? void 0 : getQueryOptions_1.format) {
                return getQueryOptions_1 === null || getQueryOptions_1 === void 0 ? void 0 : getQueryOptions_1.format(urlQuery);
            }
            return {
                pageSize: parseInt(urlQuery.pageSize) || 10,
                currentPage: parseInt(urlQuery.currentPage) || 1,
                columnFilterValues: urlQuery.columnFilterValues || {},
                sorterValues: urlQuery.sorterValues || {},
                toolbarValues: urlQuery.toolbarValues || {},
            };
        };
        return tslib_1.__assign(tslib_1.__assign({}, config), { effects: function (options) {
                var _a;
                (_a = config.effects) === null || _a === void 0 ? void 0 : _a.call(config, options);
                /**
                 * 在每个 status 改变的 effect 中去改变 url query
                 *
                 * setUrlQuery 方法默认会 merge 已有的 query（浅拷贝），所以改某个 status 时不会影响其他 status
                 *
                 * 2023-12-27 更新，之前漏掉了 filter 时会改变 currentPage 的 case。修改为只监听 onTableUpdateDataEnd 事件，在事件中做 url query 的同步
                 */
                core_1.effects.onTableUpdateDataEnd(function (_a) {
                    var _b;
                    var table = _a.table;
                    var customStatus = {};
                    if (status_1.includes(types_1.TableStatusKeys.toolbarValues)) {
                        customStatus.toolbarValues = (_b = table.toolbar) === null || _b === void 0 ? void 0 : _b.filterValues;
                    }
                    if (status_1.includes(types_1.TableStatusKeys.pageSize)) {
                        customStatus.pageSize = table.pageSize;
                    }
                    if (status_1.includes(types_1.TableStatusKeys.currentPage)) {
                        customStatus.currentPage = table.currentPage;
                    }
                    if (status_1.includes(types_1.TableStatusKeys.columnFilterValues)) {
                        customStatus.columnFilterValues = table.columnFilterValues;
                    }
                    if (status_1.includes(types_1.TableStatusKeys.sorterValues)) {
                        customStatus.sorterValues = table.sorterValues;
                    }
                    var currentStatus = getCurrentStatusFromUrl_1();
                    // 如果新状态和当前状态不一致才 setUrlQuery
                    if (!(0, lodash_es_1.isEqual)(customStatus, currentStatus)) {
                        helper_1.helper.setUrlQuery(formatSetQuery_1(table, customStatus), commonSetOptions_1);
                    }
                });
            }, getInitStatus: function (options) {
                // 如果用户传了 getInitStatus 则使用用户的
                if (config.getInitStatus) {
                    return config.getInitStatus(options);
                }
                return getCurrentStatusFromUrl_1();
            } });
    }
    return config;
};
exports.formatUrlQueryConfig = formatUrlQueryConfig;
//# sourceMappingURL=formatUrlQueryConfig.js.map