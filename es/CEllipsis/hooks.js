import { __read } from "tslib";
import { useState, useLayoutEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { getTargetElement } from '../_utils/getTargetElement';
export function useCEllipsis(target) {
    var _a = __read(useState(false), 2), isTextOverflow = _a[0], setTextOverflow = _a[1];
    var checkOverflow = function (el) {
        var clientWidth = el.clientWidth, scrollWidth = el.scrollWidth;
        /**
         * FIXME:使用 JS 计算，来解决父元素与文本宽度相近的场景
         */
        return scrollWidth > clientWidth;
        // if (scrollWidth > clientWidth) {
        //   return true;
        // }
        // if (scrollWidth === clientWidth) {
        //   const width = parseFloat(window.getComputedStyle(el).width);
        //   return width !== scrollWidth && width + 1 > scrollWidth;
        // }
        // return false;
    };
    useLayoutEffect(function () {
        var el = getTargetElement(target);
        if (el) {
            setTextOverflow(checkOverflow(el));
        }
    }, [target]);
    useResizeObserver(target, function (entry) {
        setTextOverflow(checkOverflow(entry.target));
    });
    return [{ isTextOverflow: isTextOverflow }];
}
//# sourceMappingURL=hooks.js.map