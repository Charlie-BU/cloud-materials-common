"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 21:17:09
 * @LastEditTime: 2021-10-09 17:33:24
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var constants_1 = require("../../../constants");
var DEFAULT_MAX_TAG_NUM = 3;
var prefixCls = "".concat(constants_1.prefixCls, "-cell-tags");
var Tag = function (props) {
    // 没有tags展示-
    if (!props.tags || !Array.isArray(props.tags))
        return react_1.default.createElement("div", null, "-");
    var _a = props.maxTagNum, maxTagNum = _a === void 0 ? DEFAULT_MAX_TAG_NUM : _a, _b = props.tags, tags = _b === void 0 ? [] : _b, tagsContainerStyle = props.tagsContainerStyle, tagStyle = props.tagStyle;
    var totalNum = tags.length;
    var renderTip = function () { return (react_1.default.createElement(web_react_1.Popover, { className: "".concat(prefixCls, "-tip-hover"), content: tags.map(function (tag, idx) { return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-tip-tag"), key: idx },
            react_1.default.createElement("span", null, tag))); }) },
        react_1.default.createElement(web_react_1.Tag, { className: "".concat(prefixCls, "-tip") }, totalNum))); };
    return (react_1.default.createElement("div", { className: prefixCls, style: tagsContainerStyle },
        tags.slice(0, maxTagNum).map(function (tag, idx) { return (react_1.default.createElement(web_react_1.Tag, { key: idx, style: tagStyle }, tag)); }),
        totalNum > maxTagNum && renderTip()));
};
exports.Tag = Tag;
//# sourceMappingURL=index.js.map