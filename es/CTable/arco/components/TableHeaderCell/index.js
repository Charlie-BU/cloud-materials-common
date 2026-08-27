import { __assign, __rest } from "tslib";
import React, { forwardRef } from 'react';
import { Resizable } from 'react-resizable';
import cls from 'classnames';
import { isNum } from '../../../shared';
import { usePrefix } from '../../../react';
// 鼠标移动上去，用于拖拽的元素
var ResizeHandle = forwardRef(function (props, ref) {
    // handleAxis 代表的是拖拽的方向，我们的场景，固定为 'se'
    var handleAxis = props.handleAxis, restProps = __rest(props, ["handleAxis"]);
    var prefixCls = usePrefix();
    return (React.createElement("span", __assign({ ref: ref, className: cls("".concat(prefixCls, "-react-resizable-handle"), "".concat(prefixCls, "-react-resizable-handle-").concat(handleAxis)) }, restProps, { onClick: function (e) {
            e.stopPropagation();
        } })));
});
export var TableHeaderCell = function (_a) {
    var _b;
    var _c;
    var column = _a.columnModel, restProps = __rest(_a, ["columnModel"]);
    var prefixCls = usePrefix();
    var table = column.table;
    var width = column.width || ((_c = table.columnsAutoWidth) === null || _c === void 0 ? void 0 : _c[column.config.dataIndex]);
    /**
     * 如果没有配置 resize，直接渲染 th
     * 由于 react-resizable 必须有初始的宽度
     * 因此支持拖拽宽度的列，要么配置 width，要么配置 autoWidth，并且不能设置为百分比宽度
     */
    if (!column.config.resize || !isNum(width)) {
        return React.createElement("th", __assign({}, restProps));
    }
    var resizeConf = table.plugin.getResize(column.config.resize);
    // 这里不能 debounce，debounce 后 width 不能实时变化，Resizable 拖不动
    var onResize = function (_event, _a) {
        var size = _a.size;
        var width = size.width;
        // 如果超过了最大最小宽度，直接覆写 width 为极限值
        // 超过极限值后，不直接 return，是怕用户从 100 拖拽到 500，
        // 如果极限值为 400，这个时候其实应该设置为 400，所以不能直接 return
        if (resizeConf.minWidth && size.width <= resizeConf.minWidth) {
            width = resizeConf.minWidth;
        }
        if (resizeConf.maxWidth && size.width >= resizeConf.maxWidth) {
            width = resizeConf.maxWidth;
        }
        column.setWidth(width);
    };
    return (React.createElement(Resizable, { width: width, height: 0, className: cls("".concat(prefixCls, "-resizable-column-title"), (_b = {},
            _b["".concat(prefixCls, "-resizable-column-title-fixed")] = column.config.fixed,
            _b)), 
        // @ts-ignore
        // Resizable 内部是调用的 React.cloneElement 来给 ResizeHandle 设置的 props
        handle: React.createElement(ResizeHandle, null), onResize: onResize, draggableOpts: {
            enableUserSelectHack: false,
        } },
        React.createElement("th", __assign({}, restProps))));
};
//# sourceMappingURL=index.js.map