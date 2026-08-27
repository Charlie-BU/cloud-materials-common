import { __assign, __rest } from "tslib";
import { useMemo } from 'react';
import { safeRace } from '@byted-c/storage.utils.safe-race';
import { DetailPage } from '../../core';
import { getInitDetailPageOptions } from '../../shared';
/**
 * 创建detailPage配置化对象
 * @param config
 * @returns
 */
export var useCreateInnerDetailPage = function (config) {
    var detailPage = useMemo(function () { return new DetailPage(config); }, []);
    // 在config改变时重新赋值
    if (config) {
        var _a = __assign(__assign({}, getInitDetailPageOptions()), config), fetcher = _a.fetcher, rest = __rest(_a, ["fetcher"]);
        detailPage.options = __assign(__assign({}, rest), { fetcher: rest.enableRaceCondition ? safeRace(fetcher) : fetcher });
        detailPage.originFetcher = fetcher;
    }
    return detailPage;
};
//# sourceMappingURL=useCreateInnerDetailPage.js.map