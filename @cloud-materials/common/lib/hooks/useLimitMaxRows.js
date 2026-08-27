"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var react_1 = require("react");
var getTargetElement_1 = require("../_utils/getTargetElement");
/**
 * 限制最大展示行数 Hook，传入父元素和最大展示行数进行计算，将最大高度设置在父元素上
 */
var useLimitMaxRows = function (props) {
    var target = props.target, maxRows = props.maxRows, manual = props.manual;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), isOver = _a[0], setIsOver = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(), 2), maxHeight = _b[0], setMaxHeightValue = _b[1];
    var size = (0, ahooks_1.useSize)(target);
    var setMaxHeight = function () {
        var targetDom = (0, getTargetElement_1.getTargetElement)(target);
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
    (0, react_1.useLayoutEffect)(function () {
        if (!manual && size) {
            setMaxHeight();
        }
    }, [size]);
    return { isOver: isOver, maxHeight: maxHeight, setMaxHeight: setMaxHeight };
};
exports.default = useLimitMaxRows;
//# sourceMappingURL=useLimitMaxRows.js.map