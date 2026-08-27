import { __assign, __awaiter, __generator, __makeTemplateObject, __read } from "tslib";
import React, { useContext } from 'react';
import { Space } from '@arco-design/web-react';
import { IconPlus, IconRefresh, IconDelete } from '@arco-design/web-react/icon';
import { getPagination, mode, DataCy } from '../utils';
import SelectAllBox from './SelectAllBox';
import { useTable } from '../../CTable';
import classNames from 'classnames';
import { CConfigContext } from '../../CConfigProvider';
export var LeftHeader = function (_a) {
    var cTransferProps = _a.cTransferProps;
    var table = useTable();
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('transfer');
    var _c = cTransferProps.onRefresh, onRefreshCallback = _c === void 0 ? function () { } : _c, _d = cTransferProps.onAdd, onAddCallback = _d === void 0 ? function () { } : _d, _e = cTransferProps.add, add = _e === void 0 ? React.createElement(IconPlus, null) : _e, _f = cTransferProps.refresh, refresh = _f === void 0 ? React.createElement(IconRefresh, null) : _f, _g = cTransferProps.titleTexts, titleTexts = _g === void 0 ? [] : _g, _h = cTransferProps.disabled, disabled = _h === void 0 ? false : _h;
    var total = table.total;
    var selectedKeys = table.selectedRowKeys;
    var sourceTitle = titleTexts[0];
    var simple = mode(__assign({}, cTransferProps)).simple;
    var _j = __read(getPagination(__assign({}, cTransferProps)), 1), pagination = _j[0];
    // 刷新回调
    var onRefresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
    var onAdd = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, onAddCallback()];
                case 1:
                    _a.sent();
                    table.refresh();
                    return [2 /*return*/];
            }
        });
    }); };
    var AddIcon = function () { return (React.createElement("span", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["icon"], ["icon"]))), onClick: onAdd, "data-cy": DataCy.add }, add === false ? null : add)); };
    var RefreshIcon = function () { return (React.createElement("span", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["icon"], ["icon"]))), onClick: onRefresh, "data-cy": DataCy.refresh }, refresh === false ? null : refresh)); };
    if (typeof sourceTitle === 'function') {
        return sourceTitle({
            checkbox: React.createElement(SelectAllBox, { disabled: disabled }),
            countTotal: total,
            add: React.createElement(AddIcon, null),
            refresh: React.createElement(RefreshIcon, null),
            countSelected: selectedKeys.length,
        });
    }
    return (React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header"], ["header"]))) },
        React.createElement(Space, { size: "medium" },
            !pagination && React.createElement(SelectAllBox, { disabled: disabled }),
            React.createElement("span", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-title"], ["header-title"]))) },
                sourceTitle || "".concat(locale.CTableTransfer.all, "\uFF1A"),
                !simple && React.createElement(React.Fragment, null,
                    selectedKeys.length,
                    "/"),
                total,
                locale.CTableTransfer.items)),
        React.createElement(Space, null,
            React.createElement(AddIcon, null),
            React.createElement(RefreshIcon, null))));
};
export var RightHeader = function (_a) {
    var cTransferProps = _a.cTransferProps, onClear = _a.onClear;
    var _b = useContext(CConfigContext), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('transfer');
    var _c = cTransferProps.titleTexts, titleTexts = _c === void 0 ? [] : _c, _d = cTransferProps.clear, clear = _d === void 0 ? true : _d, _e = cTransferProps.disabled, disabled = _e === void 0 ? false : _e;
    var table = useTable();
    var total = table.total;
    var selectedKeys = table.selectedRowKeys;
    var targetTitle = titleTexts[1];
    var DeleteIcon = function () { return (React.createElement("div", { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["icon"], ["icon"]))), cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["delete-all"], ["delete-all"])))), onClick: onClear, "data-cy": DataCy.deleteAll },
        React.createElement(IconDelete, null))); };
    var simple = mode(__assign({}, cTransferProps)).simple;
    var _f = __read(getPagination(__assign({}, cTransferProps)), 2), _ = _f[0], pagination = _f[1];
    if (typeof targetTitle === 'function') {
        return targetTitle({
            checkbox: React.createElement(SelectAllBox, { disabled: disabled }),
            countTotal: total,
            countSelected: selectedKeys.length,
            delete: React.createElement(DeleteIcon, null),
        });
    }
    return (React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["header"], ["header"]))) },
        React.createElement(Space, { size: "medium" },
            !pagination && !simple && React.createElement(SelectAllBox, { disabled: disabled }),
            React.createElement("span", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["header-title"], ["header-title"]))) },
                targetTitle || "".concat(locale.CTableTransfer.selected, "\uFF1A"),
                !simple && React.createElement(React.Fragment, null,
                    selectedKeys.length,
                    "/"),
                total,
                " ",
                locale.CTableTransfer.items)),
        React.createElement(Space, null, clear && React.createElement(DeleteIcon, null))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=Header.js.map