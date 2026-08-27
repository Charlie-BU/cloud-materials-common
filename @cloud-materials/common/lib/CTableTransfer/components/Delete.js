"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var icon_1 = require("@arco-design/web-react/icon");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var CTable_1 = require("../../CTable");
var constant_1 = require("../constant");
var utils_1 = require("../utils");
var Delete = function (_a) {
    var item = _a.item;
    var table = (0, CTable_1.useTable)();
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["delete-icon"], ["delete-icon"]))), "data-cy": utils_1.DataCy.deleteItem, onClick: function () {
            table.selectRow([item[constant_1.ROW_KEY]], { triggerSelectRowEvent: true });
        } },
        react_1.default.createElement(icon_1.IconClose, { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))) })));
};
exports.default = Delete;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Delete.js.map