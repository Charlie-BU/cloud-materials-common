/*
 * @Author: youjingyu
 * @Date: 2021-09-14 21:17:09
 * @LastEditTime: 2021-10-09 17:33:24
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { Tag as ArcoTag, Popover } from '@arco-design/web-react';
import { prefixCls as classScope } from '../../../constants';
var DEFAULT_MAX_TAG_NUM = 3;
var prefixCls = "".concat(classScope, "-cell-tags");
export var Tag = function (props) {
    // 没有tags展示-
    if (!props.tags || !Array.isArray(props.tags))
        return React.createElement("div", null, "-");
    var _a = props.maxTagNum, maxTagNum = _a === void 0 ? DEFAULT_MAX_TAG_NUM : _a, _b = props.tags, tags = _b === void 0 ? [] : _b, tagsContainerStyle = props.tagsContainerStyle, tagStyle = props.tagStyle;
    var totalNum = tags.length;
    var renderTip = function () { return (React.createElement(Popover, { className: "".concat(prefixCls, "-tip-hover"), content: tags.map(function (tag, idx) { return (React.createElement("div", { className: "".concat(prefixCls, "-tip-tag"), key: idx },
            React.createElement("span", null, tag))); }) },
        React.createElement(ArcoTag, { className: "".concat(prefixCls, "-tip") }, totalNum))); };
    return (React.createElement("div", { className: prefixCls, style: tagsContainerStyle },
        tags.slice(0, maxTagNum).map(function (tag, idx) { return (React.createElement(ArcoTag, { key: idx, style: tagStyle }, tag)); }),
        totalNum > maxTagNum && renderTip()));
};
//# sourceMappingURL=index.js.map