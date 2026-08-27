"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var utils_1 = require("../utils");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var SearchItem_1 = tslib_1.__importDefault(require("./SearchItem"));
var CConfigProvider_1 = require("../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('search-view');
var SearchCollapse = function (props) {
    var collapsedClassName = props.collapsedClassName, _a = props.labelWith, labelWith = _a === void 0 ? utils_1.DEFAULT_LABEL_WIDTH : _a, showAdvanceReset = props.showAdvanceReset, defaultColspan = props.colspan, advanceList = props.advanceList, advanceVisible = props.advanceVisible, params = props.params, updateParams = props.updateParams, resetAdvanceParams = props.resetAdvanceParams;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), locale = _b.locale, getCPrefixCls = _b.getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    var colspan = tslib_1.__assign(tslib_1.__assign({}, utils_1.DEFAULT_COLSPAN), defaultColspan);
    return advanceVisible && advanceList.length > 0 ? (react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(searchCls, "-collapse"), collapsedClassName), "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["collapse"], ["collapse"]))) },
        react_1.default.createElement(web_react_1.Grid.Row, { gutter: [12, 12] },
            advanceList.map(function (_a, index) {
                var _b;
                var itemColspan = _a.colspan, itemLabelWidth = _a.labelWidth, content = _a.content, rest = tslib_1.__rest(_a, ["colspan", "labelWidth", "content"]);
                return (
                // @ts-ignore
                react_1.default.createElement(web_react_1.Grid.Col, { key: (_b = rest.fieldName) !== null && _b !== void 0 ? _b : index, span: itemColspan !== null && itemColspan !== void 0 ? itemColspan : colspan[content === null || content === void 0 ? void 0 : content.component] },
                    react_1.default.createElement(SearchItem_1.default, tslib_1.__assign({}, rest, { content: content, labelWidth: itemLabelWidth !== null && itemLabelWidth !== void 0 ? itemLabelWidth : labelWith, params: params, updateParams: updateParams }))));
            }),
            showAdvanceReset && (react_1.default.createElement(web_react_1.Grid.Col, { span: 4 },
                react_1.default.createElement(web_react_1.Button, { type: "outline", onClick: resetAdvanceParams }, locale.CSearch.reset)))))) : null;
};
exports.default = SearchCollapse;
var templateObject_1;
//# sourceMappingURL=SearchCollapse.js.map