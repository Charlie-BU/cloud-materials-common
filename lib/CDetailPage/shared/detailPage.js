"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitDetailPageOptions = exports.dealOperationMenus = void 0;
var tslib_1 = require("tslib");
/**
 * @zh 处理顶部操作按钮
 * @param options
 */
var dealOperationMenus = function (options) {
    var operationMenuProps = options.operationMenuProps, needRefresh = options.needRefresh, detailPage = options.detailPage, refresh = options.refresh, refreshText = options.refreshText;
    if (needRefresh) {
        var refreshBtn = {
            name: refreshText,
            onClick: function () {
                var _a;
                refresh === null || refresh === void 0 ? void 0 : refresh({
                    showLoading: Boolean((_a = detailPage === null || detailPage === void 0 ? void 0 : detailPage.options) === null || _a === void 0 ? void 0 : _a.needLoading),
                });
            },
        };
        return tslib_1.__assign(tslib_1.__assign({}, operationMenuProps), { operations: tslib_1.__spreadArray([refreshBtn], tslib_1.__read(((operationMenuProps === null || operationMenuProps === void 0 ? void 0 : operationMenuProps.operations) || [])), false) });
    }
    else {
        return operationMenuProps;
    }
};
exports.dealOperationMenus = dealOperationMenus;
/**
 * 获取detailPage options的默认值
 * @returns
 */
var getInitDetailPageOptions = function () {
    var defaultOptions = {
        needLoading: true,
        needTabPane: true,
        tabs: [],
        resetActiveTab: false,
        autoInit: true,
        urlTabKeyName: 'tabKey',
        cDetailPageHeaderProps: {
            title: '',
            needRefreshBtn: true,
        },
        cDetailPageContentProps: {},
        fetcher: function () { return Promise.resolve({}); },
    };
    return defaultOptions;
};
exports.getInitDetailPageOptions = getInitDetailPageOptions;
//# sourceMappingURL=detailPage.js.map