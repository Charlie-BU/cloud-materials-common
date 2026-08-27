"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDataBtn = exports.ExportDataRangeType = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var exportDataModal_1 = require("./exportDataModal");
var ExportDataRangeType;
(function (ExportDataRangeType) {
    ExportDataRangeType["all"] = "all";
    ExportDataRangeType["selectedRows"] = "selectedRows";
    ExportDataRangeType["searchResult"] = "searchResult";
})(ExportDataRangeType = exports.ExportDataRangeType || (exports.ExportDataRangeType = {}));
var ExportDataBtn = function (props) {
    return react_1.default.createElement(exportDataModal_1.ExportData, { table: props.table, options: props });
};
exports.ExportDataBtn = ExportDataBtn;
//# sourceMappingURL=index.js.map