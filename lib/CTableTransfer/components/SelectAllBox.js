"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var CTable_1 = require("../../CTable");
var utils_1 = require("../utils");
var SelectAllBox = function (_a) {
    var disabled = _a.disabled;
    var table = (0, CTable_1.useTable)();
    var _b = table.getSelectedStatusInfo(), canControlRowKeys = _b.canControlRowKeys, partialSelected = _b.partialSelected, allSelected = _b.allSelected;
    var onChange = function () {
        table.selectRowAll(!allSelected, { triggerSelectRowEvent: true });
    };
    return (react_1.default.createElement(web_react_1.Checkbox, { className: (0, utils_1.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["check-all"], ["check-all"]))), disabled: disabled || canControlRowKeys.length === 0, checked: allSelected, indeterminate: partialSelected, onClick: onChange, "data-cy": utils_1.DataCy.selectAll }));
};
exports.default = SelectAllBox;
var templateObject_1;
//# sourceMappingURL=SelectAllBox.js.map