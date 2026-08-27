import { __read } from "tslib";
import { useEventListener, useThrottleFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { getTargetElement } from '../../../_utils/getTargetElement';
import useResizeObserver from '@react-hook/resize-observer';
/**
 * 滚动时能自动加上阴影效果，滚动到顶部自动去掉阴影效果
 */
export var useScrollPosition = function (scrollElement) {
    var _a = __read(useState(false), 2), shouldTopShadow = _a[0], setTopShadow = _a[1];
    var _b = __read(useState(false), 2), shouldBottomShadow = _b[0], setBottomShadow = _b[1];
    var _c = useThrottleFn(function (scrollElement) {
        var scrollElementHeight = scrollElement.clientHeight;
        var scrollElementScrollHeight = scrollElement.scrollHeight;
        // const [topShadow, bottomShadow] = boxShadow;
        if (scrollElementScrollHeight > scrollElementHeight) {
            setTopShadow(scrollElement.scrollTop > 0);
            setBottomShadow(scrollElement.scrollTop < scrollElementScrollHeight - scrollElementHeight);
        }
        else {
            setTopShadow(false);
            setBottomShadow(false);
        }
    }, { wait: 200 }), setShadow = _c.run, flush = _c.flush;
    useEffect(function () {
        var element = scrollElement && getTargetElement(scrollElement);
        if (element) {
            setShadow(element);
        }
    }, [scrollElement]);
    useResizeObserver(scrollElement, function (_a) {
        var target = _a.target;
        setShadow(target);
        // 立即执行，忽略防抖
        flush();
    });
    useEventListener('scroll', function (e) {
        var scrollElement = e.target;
        setShadow(scrollElement);
    }, { target: scrollElement });
    return [shouldTopShadow, shouldBottomShadow];
};
//# sourceMappingURL=useScrollShadow.js.map