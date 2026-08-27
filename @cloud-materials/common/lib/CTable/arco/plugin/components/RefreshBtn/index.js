"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshBtn = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var react_3 = require("../../../../react");
exports.RefreshBtn = (0, react_2.observer)(function (_a) {
    var table = _a.table, onClick = _a.onClick;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var prefixCls = (0, react_3.usePrefix)('comp-refresh-btn');
    var click = function () {
        onClick ? onClick() : table.refresh();
    };
    return (react_1.default.createElement(web_react_1.Popover, { content: locale.CTable.Refresh },
        react_1.default.createElement(web_react_1.Button, { className: prefixCls, loading: table.loading, icon: react_1.default.createElement(icon_1.IconRefresh, null), onClick: click })));
});
//# sourceMappingURL=index.js.map