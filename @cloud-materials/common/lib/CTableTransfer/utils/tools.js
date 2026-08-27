"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCy = exports.cssPrefix = exports.mode = exports.isRemoteMode = exports.genTransferRowKey = exports.defaultRowKey = void 0;
var tslib_1 = require("tslib");
var CTable_1 = require("../../CTable");
var shared_1 = require("../../CTable/shared");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
var constant_1 = require("../constant");
/**
 * @description 默认选择的rowKey
 * @param {CTableTransferProps<any>} { rowKey }
 */
var defaultRowKey = function (props) {
    var _a;
    var CTableProps = props.CTableProps;
    if (Array.isArray(CTableProps)) {
        return ((_a = CTableProps[0]) === null || _a === void 0 ? void 0 : _a.rowKey) || constant_1.DEFAULT_KEY;
    }
    return constant_1.DEFAULT_KEY;
};
exports.defaultRowKey = defaultRowKey;
var genTransferRowKey = function (props) {
    var rowKey = (0, exports.defaultRowKey)(props);
    return function (data) {
        return data.map(function (item) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, item), (_a = {}, _a[constant_1.ROW_KEY] = (0, shared_1.genRowKey)(item, -1, rowKey), _a)));
        });
    };
};
exports.genTransferRowKey = genTransferRowKey;
/**
 * @description 是否远程模式，来源于table.isRemoteMode, 在左侧table config中无法使用table.isRemoteMode判断，单独摘出来
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
var isRemoteMode = function (props) {
    var CTableProps = props.CTableProps;
    if (Array.isArray(CTableProps)) {
        var _a = CTableProps[0] || {}, mode_1 = _a.mode, fetcher = _a.fetcher;
        if (fetcher && !mode_1) {
            // 如果配置了 fetcher，并且没有配置 mode，默认为 remote 模式
            return true;
        }
        return mode_1 === CTable_1.TableMode.REMOTE;
    }
    return true;
};
exports.isRemoteMode = isRemoteMode;
/**
 * @description 获取配置模式：远程模式、数据留存模式、简单模式
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
var mode = function (props) {
    var _a, _b;
    var simple = props.simple, CTableProps = props.CTableProps;
    var remote = (0, exports.isRemoteMode)(tslib_1.__assign({}, props));
    return {
        remote: remote,
        simple: simple || remote,
        retain: (typeof simple !== 'boolean' && (simple === null || simple === void 0 ? void 0 : simple.retainSelectedItems)) || remote,
        table: CTableProps ? !!((_b = (_a = CTableProps[0]) === null || _a === void 0 ? void 0 : _a.columns) === null || _b === void 0 ? void 0 : _b.length) : false,
    };
};
exports.mode = mode;
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('transfer');
exports.DataCy = {
    deleteAll: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["delete-all"], ["delete-all"]))),
    deleteItem: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["delete-item"], ["delete-item"]))),
    refresh: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["refresh"], ["refresh"]))),
    add: (0, exports.cssPrefix)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["add"], ["add"]))),
    sourceOperationButton: (0, exports.cssPrefix)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["source-operation-button"], ["source-operation-button"]))),
    targetOperationButton: (0, exports.cssPrefix)(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["target-operation-button"], ["target-operation-button"]))),
    selectAll: (0, exports.cssPrefix)(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["select-all"], ["select-all"]))),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=tools.js.map