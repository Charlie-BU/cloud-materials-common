"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCombineSearch = exports.CCascaderSearch = exports.CSimpleSearch = exports.CSearch = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var react_3 = require("../../../../react");
var CSearch_1 = tslib_1.__importDefault(require("../../../../../CSearch"));
exports.CSearch = (0, react_2.observer)(function (props) {
    var onChange = props.onChange, value = props.value;
    return (
    // debounceOptions 配置为 null 时，可以去除 CSearch 的 debounce 逻辑
    react_1.default.createElement(CSearch_1.default, tslib_1.__assign({}, (0, react_3.omitToolbarItemRenderProps)(props), { value: value, onChange: onChange, debounceOptions: null })));
});
exports.CSimpleSearch = (0, react_2.observer)(function (props) {
    var onChange = props.onChange, value = props.value;
    return (react_1.default.createElement(CSearch_1.default.CSimpleSearch, tslib_1.__assign({}, (0, react_3.omitToolbarItemRenderProps)(props), { value: value, onChange: onChange, debounceOptions: null })));
});
exports.CCascaderSearch = (0, react_2.observer)(function (props) {
    var onChange = props.onChange, value = props.value;
    return (react_1.default.createElement(CSearch_1.default.CCascaderSearch, tslib_1.__assign({}, (0, react_3.omitToolbarItemRenderProps)(props), { value: value, onChange: onChange, debounceOptions: null })));
});
exports.CCombineSearch = (0, react_2.observer)(function (props) {
    var onChange = props.onChange, value = props.value;
    return react_1.default.createElement(CSearch_1.default.CCombineSearch, tslib_1.__assign({}, (0, react_3.omitToolbarItemRenderProps)(props), { value: value, onChange: onChange }));
});
//# sourceMappingURL=index.js.map