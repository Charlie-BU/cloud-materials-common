"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableCell = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CInlineEdit_1 = tslib_1.__importDefault(require("../../../../CInlineEdit"));
var lodash_es_1 = require("lodash-es");
var EditableCell = function (props) {
    var value = props.value, _a = props.onChange, onChange = _a === void 0 ? lodash_es_1.noop : _a, onSubmit = props.onSubmit, restProps = tslib_1.__rest(props, ["value", "onChange", "onSubmit"]);
    var handleSubmit = function (v) {
        return onSubmit ? onSubmit(v, value, onChange) : onChange(v);
        // if (onSubmit) {
        //   return onSubmit(v, value, onChange);
        // } else {
        //   onChange(v);
        // }
    };
    return react_1.default.createElement(CInlineEdit_1.default, tslib_1.__assign({}, restProps, { value: value, onSubmit: handleSubmit }));
};
exports.EditableCell = EditableCell;
//# sourceMappingURL=index.js.map