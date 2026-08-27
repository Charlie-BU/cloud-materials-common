"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importStar(require("react"));
var interface_1 = require("../interface");
var icon_1 = require("@arco-design/web-react/icon");
var utils_1 = require("../utils");
var react_2 = require("@formily/react");
var CConfigProvider_1 = require("../../CConfigProvider");
var Operation = function (_a) {
    var sourceTable = _a.sourceTable, targetTable = _a.targetTable, cTransferProps = _a.cTransferProps, onMove = _a.onMove;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    var _b = cTransferProps.operationStyle, operationStyle = _b === void 0 ? {} : _b, operationTexts = cTransferProps.operationTexts, disabled = cTransferProps.disabled;
    var sourceActive = sourceTable.selectedRowKeys.length > 0;
    var targetActive = targetTable.selectedRowKeys.length > 0;
    // const buttons = oneWay ? [CTransferDirection.Source] : [CTransferDirection.Source, CTransferDirection.Target];
    var buttons = [interface_1.CTransferDirection.Source, interface_1.CTransferDirection.Target];
    var simple = (0, utils_1.mode)(tslib_1.__assign({}, cTransferProps)).simple;
    return simple ? null : (react_1.default.createElement("div", { style: operationStyle, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["operations"], ["operations"]))) }, buttons.map(function (source, index) {
        var Icon;
        var _disabled;
        var dataCy = '';
        if (source === interface_1.CTransferDirection.Target) {
            Icon = icon_1.IconLeft;
            dataCy = utils_1.DataCy.sourceOperationButton;
            _disabled = disabled || !targetActive;
        }
        else {
            Icon = icon_1.IconRight;
            dataCy = utils_1.DataCy.targetOperationButton;
            _disabled = disabled || !sourceActive;
        }
        return (react_1.default.createElement(web_react_1.Button, { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["operation-btn"], ["operation-btn"]))), key: index, type: "secondary", size: "small", shape: "round", disabled: _disabled, onClick: function () { return onMove(source); }, icon: react_1.default.createElement(Icon, null), "data-cy": dataCy }, operationTexts && operationTexts[index]));
    })));
};
exports.default = (0, react_2.observer)(Operation);
var templateObject_1, templateObject_2;
//# sourceMappingURL=Operation.js.map