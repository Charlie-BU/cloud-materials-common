"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportData = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
/** FIXME  Base 下面的Modal没有静态属性，为了解决循环引用问题暂时这样 */
var CConfigProvider_1 = require("../../../../../../CConfigProvider");
var react_2 = require("../../../../../react");
var exportModal_1 = require("./exportModal");
var ExportData = function (_a) {
    var table = _a.table, options = _a.options;
    var prefixCls = (0, react_2.usePrefix)('export-data');
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var exportModalRef = (0, react_1.useRef)(null);
    return (react_1.default.createElement(web_react_1.Popover, { content: options.tooltip || locale.CTable.exportData },
        react_1.default.createElement(web_react_1.Button, { className: "".concat(prefixCls, "-btn"), icon: react_1.default.createElement(icon_1.IconDownload, null), onClick: function () {
                var _a;
                (_a = exportModalRef.current) === null || _a === void 0 ? void 0 : _a.openModal();
            } }),
        react_1.default.createElement(exportModal_1.ExportDataModal, { ref: exportModalRef, table: table, options: options })));
};
exports.ExportData = ExportData;
//# sourceMappingURL=index.js.map