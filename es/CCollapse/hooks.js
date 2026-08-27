import { __read } from "tslib";
import { useLayoutEffect, useState } from 'react';
import { useUpdateEffect, useUpdateLayoutEffect } from 'ahooks';
export var STATUS;
(function (STATUS) {
    STATUS[STATUS["INIT"] = 0] = "INIT";
    STATUS[STATUS["START"] = 1] = "START";
    STATUS[STATUS["MEASURING"] = 2] = "MEASURING";
    STATUS[STATUS["END"] = 3] = "END";
})(STATUS || (STATUS = {}));
export function useCollapse(props) {
    var ref = props.ref, showRows = props.showRows, length = props.length, showCount = props.showCount, containerWidth = props.containerWidth, defaultExpanded = props.defaultExpanded, expanded = props.expanded;
    var defaultSliceIndex = defaultExpanded || expanded ? length : showCount || length;
    var _a = __read(useState(false), 2), showOpt = _a[0], setShowOpt = _a[1];
    var _b = __read(useState(defaultSliceIndex), 2), sliceIndex = _b[0], setSliceIndex = _b[1];
    var _c = __read(useState(STATUS.INIT), 2), status = _c[0], setStatus = _c[1];
    var _d = __read(useState(false), 2), expand = _d[0], setExpand = _d[1];
    // 初步计算出截断位置
    var getFirstMeasure = function () {
        var _a;
        var children = ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.children) || [];
        var line = 1;
        var offsetTop = children[0].offsetTop;
        var enough = true;
        var sliceIndex = length;
        for (var i = 0; i < children.length; i++) {
            var childTop = children[i].offsetTop;
            if (childTop > offsetTop) {
                // 换行
                offsetTop = childTop;
                line++;
                if (line > showRows) {
                    enough = false;
                    sliceIndex = i;
                    break;
                }
            }
        }
        return {
            enough: enough,
            sliceIndex: sliceIndex,
        };
    };
    // 重新开始计算
    var recalculate = function () {
        setSliceIndex(showCount || length);
        setStatus(STATUS.START);
    };
    var handleCalEnd = function (finalSliceIndex) {
        setSliceIndex(finalSliceIndex);
        setShowOpt(finalSliceIndex < length);
        setStatus(STATUS.END);
    };
    // 将省略号或者展开收起放进去进行计算
    var putEllipsis = function () {
        var _a, _b, _c, _d;
        // 对比最后一个元素（展开收起）和倒数第二个元素的 offsetTop 值。
        var maxOffsetTop = (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.children[sliceIndex - 2 < 0 ? 0 : sliceIndex - 2]) === null || _b === void 0 ? void 0 : _b.offsetTop;
        var lastTop = (_d = (_c = ref.current) === null || _c === void 0 ? void 0 : _c.lastElementChild) === null || _d === void 0 ? void 0 : _d.offsetTop;
        if (lastTop !== maxOffsetTop) {
            setSliceIndex(sliceIndex - 1);
        }
        else {
            handleCalEnd(sliceIndex);
        }
    };
    var measure = function () {
        switch (status) {
            case STATUS.START: {
                if (showCount !== undefined) {
                    handleCalEnd(showCount < length ? showCount : length);
                    return;
                }
                var _a = getFirstMeasure(), enough = _a.enough, sliceIndex_1 = _a.sliceIndex;
                if (enough) {
                    handleCalEnd(sliceIndex_1);
                }
                else {
                    setSliceIndex(sliceIndex_1);
                    setShowOpt(true); // 操作符放到界面上，进行下一步计算
                    setStatus(STATUS.MEASURING);
                }
                break;
            }
            case STATUS.MEASURING:
                putEllipsis();
                break;
            default:
                break;
        }
    };
    useLayoutEffect(function () {
        measure();
    }, [sliceIndex, status]);
    useUpdateEffect(function () {
        // 外部控制状态
        if (expanded !== undefined) {
            if (expanded) {
                handleExpand();
            }
            else {
                handleCollapse();
            }
        }
    }, [expanded]);
    useLayoutEffect(function () {
        if (defaultExpanded || expanded) {
            if (showCount !== undefined) {
                setShowOpt(showCount < length);
            }
            else {
                var enough = getFirstMeasure().enough;
                if (!enough) {
                    setShowOpt(true);
                }
            }
            setStatus(STATUS.END);
            setExpand(true);
        }
    }, []);
    useUpdateLayoutEffect(function () {
        // 正在计算中，不处理
        if (status === STATUS.MEASURING || !containerWidth) {
            return;
        }
        if (!expand) {
            recalculate();
        }
    }, [containerWidth]);
    useUpdateEffect(function () {
        recalculate();
    }, [showCount, showRows, length]);
    var handleExpand = function () {
        setSliceIndex(length);
        setExpand(true);
    };
    var handleCollapse = function () {
        recalculate();
        setExpand(false);
    };
    var state = { showOpt: showOpt, expand: expand, sliceIndex: sliceIndex, status: status };
    var controls = { handleCollapse: handleCollapse, handleExpand: handleExpand };
    return [state, controls];
}
//# sourceMappingURL=hooks.js.map