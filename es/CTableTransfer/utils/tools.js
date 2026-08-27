import { __assign, __makeTemplateObject } from "tslib";
import { TableMode } from '../../CTable';
import { genRowKey } from '../../CTable/shared';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import { DEFAULT_KEY, ROW_KEY } from '../constant';
/**
 * @description 默认选择的rowKey
 * @param {CTableTransferProps<any>} { rowKey }
 */
export var defaultRowKey = function (props) {
    var _a;
    var CTableProps = props.CTableProps;
    if (Array.isArray(CTableProps)) {
        return ((_a = CTableProps[0]) === null || _a === void 0 ? void 0 : _a.rowKey) || DEFAULT_KEY;
    }
    return DEFAULT_KEY;
};
export var genTransferRowKey = function (props) {
    var rowKey = defaultRowKey(props);
    return function (data) {
        return data.map(function (item) {
            var _a;
            return (__assign(__assign({}, item), (_a = {}, _a[ROW_KEY] = genRowKey(item, -1, rowKey), _a)));
        });
    };
};
/**
 * @description 是否远程模式，来源于table.isRemoteMode, 在左侧table config中无法使用table.isRemoteMode判断，单独摘出来
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export var isRemoteMode = function (props) {
    var CTableProps = props.CTableProps;
    if (Array.isArray(CTableProps)) {
        var _a = CTableProps[0] || {}, mode_1 = _a.mode, fetcher = _a.fetcher;
        if (fetcher && !mode_1) {
            // 如果配置了 fetcher，并且没有配置 mode，默认为 remote 模式
            return true;
        }
        return mode_1 === TableMode.REMOTE;
    }
    return true;
};
/**
 * @description 获取配置模式：远程模式、数据留存模式、简单模式
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export var mode = function (props) {
    var _a, _b;
    var simple = props.simple, CTableProps = props.CTableProps;
    var remote = isRemoteMode(__assign({}, props));
    return {
        remote: remote,
        simple: simple || remote,
        retain: (typeof simple !== 'boolean' && (simple === null || simple === void 0 ? void 0 : simple.retainSelectedItems)) || remote,
        table: CTableProps ? !!((_b = (_a = CTableProps[0]) === null || _a === void 0 ? void 0 : _a.columns) === null || _b === void 0 ? void 0 : _b.length) : false,
    };
};
export var cssPrefix = classNamePrefixFactory('transfer');
export var DataCy = {
    deleteAll: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["delete-all"], ["delete-all"]))),
    deleteItem: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["delete-item"], ["delete-item"]))),
    refresh: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["refresh"], ["refresh"]))),
    add: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["add"], ["add"]))),
    sourceOperationButton: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["source-operation-button"], ["source-operation-button"]))),
    targetOperationButton: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["target-operation-button"], ["target-operation-button"]))),
    selectAll: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["select-all"], ["select-all"]))),
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=tools.js.map