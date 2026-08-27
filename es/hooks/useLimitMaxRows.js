import { __read } from "tslib";
import { useSize } from 'ahooks';
import { useLayoutEffect, useState } from 'react';
import { getTargetElement } from '../_utils/getTargetElement';
/**
 * 限制最大展示行数 Hook，传入父元素和最大展示行数进行计算，将最大高度设置在父元素上
 */
var useLimitMaxRows = function (props) {
    var target = props.target, maxRows = props.maxRows, manual = props.manual;
    var _a = __read(useState(false), 2), isOver = _a[0], setIsOver = _a[1];
    var _b = __read(useState(), 2), maxHeight = _b[0], setMaxHeightValue = _b[1];
    var size = useSize(target);
    var setMaxHeight = function () {
        var targetDom = getTargetElement(target);
        if (!maxRows) {
            return;
        }
        var children = (targetDom === null || targetDom === void 0 ? void 0 : targetDom.children) || [];
        if (!children.length) {
            return;
        }
        var line = 1;
        var isOver = false;
        var offsetTop = children[0].offsetTop;
        var totalHeight = offsetTop;
        var parentStyle = window.getComputedStyle(targetDom);
        var paddingTop = parseInt(parentStyle.paddingTop);
        var paddingBottom = parseInt(parentStyle.paddingBottom);
        var boxSizing = parentStyle.boxSizing;
        for (var i = 1; i < children.length; i++) {
            var childTop = children[i].offsetTop;
            var clientHeight = children[i].getBoundingClientRect().height;
            if (childTop > offsetTop) {
                // 换行
                offsetTop = childTop;
                totalHeight = childTop;
                line++;
                if (line > maxRows) {
                    isOver = true;
                    totalHeight += Math.floor(clientHeight / 2);
                    // 需要减掉父元素的 padding。
                    if (boxSizing === 'content-box') {
                        totalHeight = totalHeight - paddingTop - paddingBottom;
                    }
                    break;
                }
            }
        }
        if (isOver) {
            setMaxHeightValue(totalHeight);
            targetDom.style.maxHeight = "".concat(totalHeight, "px");
            targetDom.style.overflow = 'auto';
            setIsOver(true);
        }
        else {
            setMaxHeightValue(undefined);
            targetDom.style.maxHeight = 'none';
            targetDom.style.overflow = 'visible';
            setIsOver(false);
        }
    };
    useLayoutEffect(function () {
        if (!manual && size) {
            setMaxHeight();
        }
    }, [size]);
    return { isOver: isOver, maxHeight: maxHeight, setMaxHeight: setMaxHeight };
};
export default useLimitMaxRows;
//# sourceMappingURL=useLimitMaxRows.js.map