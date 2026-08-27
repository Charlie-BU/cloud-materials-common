import { __read } from "tslib";
import { useLayoutEffect, useState } from 'react';
import { updateCSS, removeCSS } from 'rc-util/es/Dom/dynamicCSS';
import { getTargetScrollBarSize } from 'rc-util/es/getScrollBarSize';
var isBodyOverflowing = function () {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
        window.innerWidth > document.body.offsetWidth;
};
var UNIQUE_ID = "scroll-locker-".concat(Date.now());
var uuid = 0;
export default function useScrollLocker(lock) {
    var mergedLock = !!lock;
    var _a = __read(useState(function () { return "".concat(UNIQUE_ID, "_").concat((uuid += 1)); }), 1), id = _a[0];
    useLayoutEffect(function () {
        if (mergedLock) {
            var scrollbarSize = getTargetScrollBarSize(document.body).width;
            var isOverflow = isBodyOverflowing();
            updateCSS("html body {overflow-y: hidden;".concat(isOverflow ? "width: calc(100% - ".concat(scrollbarSize, "px);") : '', "}"), id);
        }
        else {
            removeCSS(id);
        }
        return function () {
            removeCSS(id);
        };
    }, [mergedLock, id]);
}
//# sourceMappingURL=useScrollLocker.js.map