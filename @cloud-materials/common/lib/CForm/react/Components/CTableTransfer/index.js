"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var CTableTransfer_1 = tslib_1.__importDefault(require("../../../../CTableTransfer"));
var CFormTableTransfer = (0, react_2.observer)(function (props) {
    var _a = props.value, value = _a === void 0 ? [] : _a, restProps = tslib_1.__rest(props, ["value"]);
    var field = (0, react_2.useField)();
    var onDataSource = function (dataSource) {
        field.setDataSource(dataSource);
    };
    return react_1.default.createElement(CTableTransfer_1.default, tslib_1.__assign({}, restProps, { defaultSelectedValues: value, onDataSource: onDataSource }));
});
exports.default = CFormTableTransfer;
//# sourceMappingURL=index.js.map