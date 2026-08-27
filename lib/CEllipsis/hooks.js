"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCEllipsis = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var resize_observer_1 = tslib_1.__importDefault(require("@react-hook/resize-observer"));
var getTargetElement_1 = require("../_utils/getTargetElement");
function useCEllipsis(target) {
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), isTextOverflow = _a[0], setTextOverflow = _a[1];
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
    (0, react_1.useLayoutEffect)(function () {
        var el = (0, getTargetElement_1.getTargetElement)(target);
        if (el) {
            setTextOverflow(checkOverflow(el));
        }
    }, [target]);
    (0, resize_observer_1.default)(target, function (entry) {
        setTextOverflow(checkOverflow(entry.target));
    });
    return [{ isTextOverflow: isTextOverflow }];
}
exports.useCEllipsis = useCEllipsis;
//# sourceMappingURL=hooks.js.map