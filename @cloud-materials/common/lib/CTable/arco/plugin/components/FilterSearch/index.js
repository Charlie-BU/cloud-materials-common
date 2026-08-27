"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var react_2 = require("../../../../react");
var Search = web_react_1.Input.Search;
var SearchInput = function (_a) {
    var _b, _c;
    var column = _a.column, placeholder = _a.placeholder, dropdownOptions = _a.dropdownOptions;
    var inputRef = (0, react_1.useRef)(null);
    var table = (0, react_2.useTable)();
    var prefixCls = (0, react_2.usePrefix)('comp-filter-search');
    // 2023-05-09 修改
    // 问题：在 useEffect 中调用 inputElement.focus() 会导致页面滚动到顶部，原因暂时未知
    // 参考 arco 的做法，用 setTimeout 包裹下，并把延时设为 0ms
    // arco demo 链接: https://arco.bytedance.net/react/components/table#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AD%9B%E9%80%89%E8%8F%9C%E5%8D%95
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            var inputElement = inputRef.current;
            if (column.filterVisible && inputElement) {
                inputElement.focus();
            }
        }, 0);
        return function () { return clearTimeout(timer); };
    }, [column.filterVisible]);
    var tableConfig = table.config;
    // 为了兼容老配置
    var isPolling = tableConfig.polling || ((_b = tableConfig.extraConfig) === null || _b === void 0 ? void 0 : _b.isPolling);
    return (react_1.default.createElement("div", { className: prefixCls },
        react_1.default.createElement(Search, tslib_1.__assign({ ref: inputRef, searchButton: true, allowClear: true, placeholder: placeholder }, (isPolling ? {} : { value: ((_c = dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.filterKeys) === null || _c === void 0 ? void 0 : _c[0]) || '' }), { onChange: function (value) {
                var _a;
                (_a = dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.setFilterKeys) === null || _a === void 0 ? void 0 : _a.call(dropdownOptions, value ? [value] : []);
            }, onSearch: function () {
                var _a;
                (_a = dropdownOptions === null || dropdownOptions === void 0 ? void 0 : dropdownOptions.confirm) === null || _a === void 0 ? void 0 : _a.call(dropdownOptions);
            } }))));
};
exports.SearchInput = SearchInput;
//# sourceMappingURL=index.js.map