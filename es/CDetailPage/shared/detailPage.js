import { __assign, __read, __spreadArray } from "tslib";
/**
 * @zh 处理顶部操作按钮
 * @param options
 */
export var dealOperationMenus = function (options) {
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
        return __assign(__assign({}, operationMenuProps), { operations: __spreadArray([refreshBtn], __read(((operationMenuProps === null || operationMenuProps === void 0 ? void 0 : operationMenuProps.operations) || [])), false) });
    }
    else {
        return operationMenuProps;
    }
};
/**
 * 获取detailPage options的默认值
 * @returns
 */
export var getInitDetailPageOptions = function () {
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
//# sourceMappingURL=detailPage.js.map