import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import useLimitMaxRows from '../hooks/useLimitMaxRows';
import classNames from 'classnames';
import { STATUS, useCollapse } from './hooks';
import { testId } from '.';
import { useCConfigContext } from '../CConfigProvider';
var HideStyle = {
    zIndex: -999,
    opacity: 0,
    height: 0,
};
var CCollapseText = function (props) {
    var data = props.data, expanded = props.expanded, _a = props.showRows, showRows = _a === void 0 ? 3 : _a, maxRows = props.maxRows, className = props.className, style = props.style, operateRender = props.operateRender, defaultExpanded = props.defaultExpanded, onExpandedChange = props.onExpandedChange;
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('collapse');
    var containerRef = useRef(null);
    var textRef = useRef(null);
    var _c = useLimitMaxRows({
        target: textRef,
        maxRows: maxRows,
        manual: true,
    }), isOver = _c.isOver, setMaxHeight = _c.setMaxHeight;
    var size = useSize(containerRef);
    var _d = __read(useCollapse({
        ref: textRef,
        showRows: showRows,
        defaultExpanded: defaultExpanded,
        expanded: expanded,
        length: data.length,
        containerWidth: size === null || size === void 0 ? void 0 : size.width,
    }), 2), _e = _d[0], showOpt = _e.showOpt, status = _e.status, sliceIndex = _e.sliceIndex, expand = _e.expand, _f = _d[1], handleExpand = _f.handleExpand, handleCollapse = _f.handleCollapse;
    useLayoutEffect(function () {
        if (defaultExpanded) {
            setMaxHeight();
        }
    }, []);
    useEffect(function () {
        onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(expand);
    }, [expand]);
    useLayoutEffect(function () {
        if (status === STATUS.START) {
            setMaxHeight();
        }
    }, [status, maxRows]);
    var displayData = data.slice(0, sliceIndex);
    // 展开收起操作样式
    var renderTextOperate = function () {
        // 非数组
        var innerRender;
        if (operateRender) {
            innerRender = operateRender(expand);
        }
        else {
            innerRender = expand ? locale.CCollapse.close : locale.CCollapse.expand;
        }
        return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["operation"], ["operation"]))), "data-cy": testId.operate, onClick: function () {
                if (expand) {
                    handleCollapse();
                }
                else {
                    handleExpand();
                }
            } }, innerRender));
    };
    return (React.createElement("div", { style: __assign({ width: '100%' }, style), className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["text"], ["text"]))), className), ref: containerRef, "data-cy": testId.container },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["text-container"], ["text-container"]))), isOver && expand ? 'over' : '') },
            React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["text-content"], ["text-content"]))), style: status !== STATUS.END ? HideStyle : undefined, ref: textRef }, status !== STATUS.END ? (React.createElement(React.Fragment, null,
                Array.from(displayData).map(function (item, index) {
                    return (React.createElement("span", { key: index, className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["text-letter"], ["text-letter"]))) }, item));
                }),
                showOpt && !expand && React.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["text-ellipsis"], ["text-ellipsis"]))) }, "..."))) : (React.createElement(React.Fragment, null,
                displayData,
                showOpt && !expand && React.createElement(React.Fragment, null, "..."))))),
        showOpt && renderTextOperate()));
};
export default CCollapseText;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Text.js.map