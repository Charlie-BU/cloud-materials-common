"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var useDownload_1 = require("../../../hooks/useDownload");
var __1 = require("../..");
var CConfigProvider_1 = require("../../../CConfigProvider");
var Download = function (_a) {
    var value = _a.value, fileName = _a.fileName;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('code-block');
    var iconCls = useCssPrefix('')(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["icon"], ["icon"])));
    // 下载hooks
    var _b = tslib_1.__read((0, useDownload_1.useDownload)({
        value: value,
        fileName: fileName,
    }), 2), arcoPopoverProps = _b[0].arcoPopoverProps, controls = _b[1];
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["download"], ["download"])))) },
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({}, arcoPopoverProps),
            react_1.default.createElement(icon_1.IconDownload, { className: (0, classnames_1.default)(iconCls, cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["download-icon"], ["download-icon"])))), onClick: controls.downloadFile, "data-testid": __1.testId.downloadBtn }))));
};
exports.default = Download;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map