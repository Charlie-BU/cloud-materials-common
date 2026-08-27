import { __assign, __awaiter, __generator } from "tslib";
import { clamp } from 'lodash-es';
/**
 * 执行fetcher，保证页码在正确的范围里，返回请求数据和正确的页码
 * @param fetcher
 * @param fetcherOptions
 * @param startPageNumber 第一页的页码
 */
export function runFetcher(params) {
    return __awaiter(this, void 0, void 0, function () {
        var fetcher, fetcherOptions, startPageNumber, isLoadMore, currentPage, pageSize, res, maxPageNumber, pageNumber, offset, res_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetcher = params.fetcher, fetcherOptions = params.fetcherOptions, startPageNumber = params.startPageNumber, isLoadMore = params.isLoadMore;
                    currentPage = fetcherOptions.currentPage, pageSize = fetcherOptions.pageSize;
                    return [4 /*yield*/, fetcher(fetcherOptions)];
                case 1:
                    res = _a.sent();
                    // load more 模式、第一页不需要不做页码修正
                    if (isLoadMore || currentPage === startPageNumber) {
                        return [2 /*return*/, {
                                fetcherResp: res,
                                pageNumber: currentPage,
                            }];
                    }
                    maxPageNumber = Math.ceil(res.total / pageSize) - 1 + startPageNumber;
                    if (!(currentPage > maxPageNumber)) return [3 /*break*/, 3];
                    pageNumber = clamp(currentPage, startPageNumber, maxPageNumber);
                    offset = (pageNumber - startPageNumber) * pageSize;
                    return [4 /*yield*/, fetcher(__assign(__assign({}, fetcherOptions), { currentPage: pageNumber, offset: offset }))];
                case 2:
                    res_1 = _a.sent();
                    return [2 /*return*/, {
                            fetcherResp: res_1,
                            pageNumber: pageNumber,
                        }];
                case 3: return [2 /*return*/, {
                        fetcherResp: res,
                        pageNumber: currentPage, // 页码不需要修正时保持不变
                    }];
            }
        });
    });
}
//# sourceMappingURL=fetcher.js.map