"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateInnerDetailPage = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var storage_utils_safe_race_1 = require("@byted-c/storage.utils.safe-race");
var core_1 = require("../../core");
var shared_1 = require("../../shared");
/**
 * 创建detailPage配置化对象
 * @param config
 * @returns
 */
var useCreateInnerDetailPage = function (config) {
    var detailPage = (0, react_1.useMemo)(function () { return new core_1.DetailPage(config); }, []);
    // 在config改变时重新赋值
    if (config) {
        var _a = tslib_1.__assign(tslib_1.__assign({}, (0, shared_1.getInitDetailPageOptions)()), config), fetcher = _a.fetcher, rest = tslib_1.__rest(_a, ["fetcher"]);
        detailPage.options = tslib_1.__assign(tslib_1.__assign({}, rest), { fetcher: rest.enableRaceCondition ? (0, storage_utils_safe_race_1.safeRace)(fetcher) : fetcher });
        detailPage.originFetcher = fetcher;
    }
    return detailPage;
};
exports.useCreateInnerDetailPage = useCreateInnerDetailPage;
//# sourceMappingURL=useCreateInnerDetailPage.js.map