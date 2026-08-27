"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAsyncSelectForm = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var CAsyncSelect_1 = tslib_1.__importDefault(require("../../../../CAsyncSelect"));
var lodash_es_1 = require("lodash-es");
var hooks_1 = require("../../hooks");
var RectiveWithCForm_1 = tslib_1.__importDefault(require("../RectiveWithCForm"));
var ahooks_1 = require("ahooks");
exports.CAsyncSelectForm = (0, RectiveWithCForm_1.default)(function (props) {
    var _a, _b;
    var _c = props.disableDepsResetValue, disableDepsResetValue = _c === void 0 ? false : _c, _d = props.depValues, depValues = _d === void 0 ? {} : _d, _e = props.dataDepValues, dataDepValues = _e === void 0 ? {} : _e, rest = tslib_1.__rest(props, ["disableDepsResetValue", "depValues", "dataDepValues"]);
    var innerRef = (0, react_1.useRef)(null);
    var ref = (_a = props.ref) !== null && _a !== void 0 ? _a : innerRef;
    var field = (0, react_2.useField)();
    var form = (0, hooks_1.useCForm)();
    // 是否需要在focus事件时，触发重新加载
    var _f = tslib_1.__read((0, react_1.useState)(false), 2), refreshOnFocus = _f[0], setRefreshOnFocus = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)({
        page: 1,
        list: ((_b = field.dataSource) !== null && _b !== void 0 ? _b : []),
        noMore: false,
    }), 2), dataSource = _g[0], setDataSource = _g[1];
    var processedFetchData = function (_a) {
        var page = _a.page, searchWord = _a.searchWord, cacheData = _a.cacheData;
        return props.fetchData({
            page: page,
            searchWord: searchWord,
            cacheData: cacheData,
            depValues: depValues,
            dataDepValues: dataDepValues,
            form: form,
            field: field,
        });
    };
    var processedFetchInitData = (0, lodash_es_1.isFunction)(props.fetchInitData)
        ? function () {
            return props.fetchInitData(form, field);
        }
        : undefined;
    // 重新加载数据的函数
    var reloadData = function () {
        var _a, _b;
        if (!disableDepsResetValue)
            (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.reset();
        else
            (_b = ref === null || ref === void 0 ? void 0 : ref.current) === null || _b === void 0 ? void 0 : _b.refresh();
    };
    // 依赖发生变化时，进行相应的处理
    (0, ahooks_1.useUpdateEffect)(function () {
        // 初始化时，默认不做清空操作
        // 依赖发生变化时，立即将dataSource置为空
        setDataSource({ page: 1, list: [], noMore: false });
        field.dataSource = [];
        // 如果配置了 依赖重置异步下拉组件的value，并且当前不是依赖第一次发生变化：则清除value
        if (!disableDepsResetValue)
            field.value = props.mode === 'multiple' ? [] : undefined;
        // 依赖改变时，如果配置了autoLoad，立即触发重新加载
        if (props.autoLoad)
            reloadData();
        // 依赖改变时，如果没有配置autoLoad，设置refreshOnFocus为true，等组件onFocus时消费refreshOnFocus，触发重新加载
        else
            setRefreshOnFocus(true);
    }, [depValues, dataDepValues]);
    return (react_1.default.createElement(CAsyncSelect_1.default, tslib_1.__assign({ onError: function (e) {
            console.error(e);
        } }, rest, { ref: ref, fetchData: processedFetchData, fetchInitData: processedFetchInitData, onFocus: function (e) {
            var _a;
            if (refreshOnFocus) {
                reloadData();
                setRefreshOnFocus(false);
            }
            (_a = props === null || props === void 0 ? void 0 : props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }, dataSource: dataSource, 
        // 仅配置了该字段才能实现组件value的受控
        isControlStateChange: true, onDataSourceChange: function (dataSource) {
            var _a, _b;
            var currentList = (_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.list) !== null && _a !== void 0 ? _a : [];
            // 数据源改变时，将数据源同步到field.dataSource
            var fieldDataSource = field.dataSource;
            if (!(0, lodash_es_1.isEqual)(currentList, fieldDataSource)) {
                field.setDataSource(currentList);
                setDataSource(dataSource);
            }
            (_b = rest === null || rest === void 0 ? void 0 : rest.onDataSourceChange) === null || _b === void 0 ? void 0 : _b.call(rest, dataSource);
        } })));
});
exports.default = exports.CAsyncSelectForm;
//# sourceMappingURL=index.js.map