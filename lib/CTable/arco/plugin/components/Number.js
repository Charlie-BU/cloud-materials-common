"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Number = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var utils_1 = require("../../utils");
var Number = function (props) {
    var content = props.customContent;
    if (content === undefined) {
        // 如果没有配置  customContent，也没有配置 formatter，默认通过 toLocaleString 转换
        content = props.cell.column.config.formatter ? props.content : (0, utils_1.toLocaleString)(props.content);
    }
    return react_1.default.createElement("div", { style: { textAlign: 'right' } }, content);
};
exports.Number = Number;
//# sourceMappingURL=Number.js.map