"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightHeader = exports.LeftHeader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var utils_1 = require("../utils");
var SelectAllBox_1 = tslib_1.__importDefault(require("./SelectAllBox"));
var CTable_1 = require("../../CTable");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../CConfigProvider");
var LeftHeader = function (_a) {
    var cTransferProps = _a.cTransferProps;
    var table = (0, CTable_1.useTable)();
    var _b = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('transfer');
    var _c = cTransferProps.onRefresh, onRefreshCallback = _c === void 0 ? function () { } : _c, _d = cTransferProps.onAdd, onAddCallback = _d === void 0 ? function () { } : _d, _e = cTransferProps.add, add = _e === void 0 ? react_1.default.createElement(icon_1.IconPlus, null) : _e, _f = cTransferProps.refresh, refresh = _f === void 0 ? react_1.default.createElement(icon_1.IconRefresh, null) : _f, _g = cTransferProps.titleTexts, titleTexts = _g === void 0 ? [] : _g, _h = cTransferProps.disabled, disabled = _h === void 0 ? false : _h;
    var total = table.total;
    var selectedKeys = table.selectedRowKeys;
    var sourceTitle = titleTexts[0];
    var simple = (0, utils_1.mode)(tslib_1.__assign({}, cTransferProps)).simple;
    var _j = tslib_1.__read((0, utils_1.getPagination)(tslib_1.__assign({}, cTransferProps)), 1), pagination = _j[0];
    // 刷新回调
    var onRefresh = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onRefreshCallback()];
                case 1:
                    _a.sent();
                    table.refresh();
                    return [2 /*return*/];
            }
        });
    }); };
    // 添加回调
    var onAdd = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onAddCallback()];
                case 1:
                    _a.sent();
                    table.refresh();
                    return [2 /*return*/];
            }
        });
    }); };
    var AddIcon = function () { return (react_1.default.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))), onClick: onAdd, "data-cy": utils_1.DataCy.add }, add === false ? null : add)); };
    var RefreshIcon = function () { return (react_1.default.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))), onClick: onRefresh, "data-cy": utils_1.DataCy.refresh }, refresh === false ? null : refresh)); };
    if (typeof sourceTitle === 'function') {
        return sourceTitle({
            checkbox: react_1.default.createElement(SelectAllBox_1.default, { disabled: disabled }),
            countTotal: total,
            add: react_1.default.createElement(AddIcon, null),
            refresh: react_1.default.createElement(RefreshIcon, null),
            countSelected: selectedKeys.length,
        });
    }
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header"], ["header"]))) },
        react_1.default.createElement(web_react_1.Space, { size: "medium" },
            !pagination && react_1.default.createElement(SelectAllBox_1.default, { disabled: disabled }),
            react_1.default.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"]))) },
                sourceTitle || "".concat(locale.CTableTransfer.all, "\uFF1A"),
                !simple && react_1.default.createElement(react_1.default.Fragment, null,
                    selectedKeys.length,
                    "/"),
                total,
                locale.CTableTransfer.items)),
        react_1.default.createElement(web_react_1.Space, null,
            react_1.default.createElement(AddIcon, null),
            react_1.default.createElement(RefreshIcon, null))));
};
exports.LeftHeader = LeftHeader;
var RightHeader = function (_a) {
    var cTransferProps = _a.cTransferProps, onClear = _a.onClear;
    var _b = (0, react_1.useContext)(CConfigProvider_1.CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('transfer');
    var _c = cTransferProps.titleTexts, titleTexts = _c === void 0 ? [] : _c, _d = cTransferProps.clear, clear = _d === void 0 ? true : _d, _e = cTransferProps.disabled, disabled = _e === void 0 ? false : _e;
    var table = (0, CTable_1.useTable)();
    var total = table.total;
    var selectedKeys = table.selectedRowKeys;
    var targetTitle = titleTexts[1];
    var DeleteIcon = function () { return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["icon"], ["icon"]))), cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["delete-all"], ["delete-all"])))), onClick: onClear, "data-cy": utils_1.DataCy.deleteAll },
        react_1.default.createElement(icon_1.IconDelete, null))); };
    var simple = (0, utils_1.mode)(tslib_1.__assign({}, cTransferProps)).simple;
    var _f = tslib_1.__read((0, utils_1.getPagination)(tslib_1.__assign({}, cTransferProps)), 2), _ = _f[0], pagination = _f[1];
    if (typeof targetTitle === 'function') {
        return targetTitle({
            checkbox: react_1.default.createElement(SelectAllBox_1.default, { disabled: disabled }),
            countTotal: total,
            countSelected: selectedKeys.length,
            delete: react_1.default.createElement(DeleteIcon, null),
        });
    }
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["header"], ["header"]))) },
        react_1.default.createElement(web_react_1.Space, { size: "medium" },
            !pagination && !simple && react_1.default.createElement(SelectAllBox_1.default, { disabled: disabled }),
            react_1.default.createElement("span", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"]))) },
                targetTitle || "".concat(locale.CTableTransfer.selected, "\uFF1A"),
                !simple && react_1.default.createElement(react_1.default.Fragment, null,
                    selectedKeys.length,
                    "/"),
                total,
                " ",
                locale.CTableTransfer.items)),
        react_1.default.createElement(web_react_1.Space, null, clear && react_1.default.createElement(DeleteIcon, null))));
};
exports.RightHeader = RightHeader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=Header.js.map