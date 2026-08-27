import { __read } from "tslib";
import { useLayoutEffect, useMemo, useState } from 'react';
import { isInViewPort } from './utils';
import { useMemoizedFn } from 'ahooks';
function isValidNumber(val) {
    return typeof val === 'number' && !Number.isNaN(val);
}
export function useTarget(_a) {
    var target = _a.target, open = _a.open, gap = _a.gap, scrollIntoView = _a.scrollIntoView;
    // ========================= Target =========================
    // We trade `undefined` as not get target by function yet.
    // `null` as empty target.
    var _b = __read(useState(), 2), targetElement = _b[0], setTargetElement = _b[1];
    useLayoutEffect(function () {
        var nextElement = typeof target === 'function' ? target() : target;
        setTargetElement(nextElement || null);
    });
    var _c = __read(useState(), 2), posInfo = _c[0], setPosInfo = _c[1];
    var updatePos = useMemoizedFn(function () {
        if (targetElement) {
            // Exist target element. We should scroll and get target position
            if (!isInViewPort(targetElement) && open && scrollIntoView !== false) {
                targetElement.scrollIntoView(scrollIntoView);
            }
            var _a = targetElement.getBoundingClientRect(), left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
            var nextPosInfo_1 = { left: left, top: top_1, width: width, height: height, radius: 0 };
            setPosInfo(function (origin) {
                if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo_1)) {
                    return nextPosInfo_1;
                }
                return origin;
            });
        }
        else {
            // Not exist target which means we just show in center
            setPosInfo(void 0);
        }
    });
    var getGapOffset = function (index) { var _a; return (_a = (Array.isArray(gap === null || gap === void 0 ? void 0 : gap.offset) ? gap === null || gap === void 0 ? void 0 : gap.offset[index] : gap === null || gap === void 0 ? void 0 : gap.offset)) !== null && _a !== void 0 ? _a : 6; };
    useLayoutEffect(function () {
        updatePos();
        // update when window resize
        window.addEventListener('resize', updatePos);
        return function () {
            window.removeEventListener('resize', updatePos);
        };
    }, [targetElement, open, updatePos]);
    // ======================== PosInfo =========================
    var mergedPosInfo = useMemo(function () {
        if (!posInfo) {
            return posInfo;
        }
        var gapOffsetX = getGapOffset(0);
        var gapOffsetY = getGapOffset(1);
        var gapRadius = isValidNumber(gap === null || gap === void 0 ? void 0 : gap.radius) ? gap === null || gap === void 0 ? void 0 : gap.radius : 2;
        return {
            left: posInfo.left - gapOffsetX,
            top: posInfo.top - gapOffsetY,
            width: posInfo.width + gapOffsetX * 2,
            height: posInfo.height + gapOffsetY * 2,
            radius: gapRadius,
        };
    }, [posInfo, gap]);
    return [mergedPosInfo, posInfo, targetElement];
}
//# sourceMappingURL=useTarget.js.map