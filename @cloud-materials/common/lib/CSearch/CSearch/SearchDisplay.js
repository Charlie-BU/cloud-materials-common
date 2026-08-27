"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var SearchItem_1 = tslib_1.__importDefault(require("./SearchItem"));
var CConfigProvider_1 = require("../../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var cssPrefix = (0, classNamePrefixFactory_1.default)('search-view');
var SearchDisplay = function (props) {
    var displayArcoSpaceProps = props.displayArcoSpaceProps, showReset = props.showReset, manual = props.manual, displayList = props.displayList, advanceList = props.advanceList, advanceVisible = props.advanceVisible, activeAdvanceCount = props.activeAdvanceCount, params = props.params, toggleAdvanceVisible = props.toggleAdvanceVisible, search = props.search, updateParams = props.updateParams, resetParams = props.resetParams;
    var _a = (0, CConfigProvider_1.useCConfigContext)(), locale = _a.locale, getCPrefixCls = _a.getCPrefixCls;
    var searchCls = getCPrefixCls('search');
    return (react_1.default.createElement(web_react_1.Space, tslib_1.__assign({ size: 12, align: "center" }, displayArcoSpaceProps, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["display"], ["display"]))) }),
        displayList.map(function (item, index) {
            var _a;
            return (react_1.default.createElement(SearchItem_1.default, tslib_1.__assign({}, item, { key: (_a = item.fieldName) !== null && _a !== void 0 ? _a : index, params: params, updateParams: updateParams })));
        }),
        advanceList.length > 0 && (react_1.default.createElement(web_react_1.Button, { type: "outline", className: "".concat(searchCls, "-advance-button"), onClick: toggleAdvanceVisible },
            react_1.default.createElement(iconbox_react_ve_o_design_1.IconFilter, null),
            react_1.default.createElement("span", null, locale.CSearch.advanceFilter),
            !advanceVisible && react_1.default.createElement(web_react_1.Badge, { dotClassName: "".concat(searchCls, "-advance-dot"), count: activeAdvanceCount }))),
        Boolean(manual) && (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "primary" }, ((0, lodash_es_1.isObject)(manual) ? manual : {}), { onClick: function (e) {
                var _a;
                search(true);
                (0, lodash_es_1.isObject)(manual) && ((_a = manual.onClick) === null || _a === void 0 ? void 0 : _a.call(manual, e));
            } }), locale.CSearch.search)),
        showReset && (react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ type: "outline" }, ((0, lodash_es_1.isObject)(showReset) ? showReset : {}), { onClick: function (e) {
                var _a;
                resetParams();
                (0, lodash_es_1.isObject)(showReset) && ((_a = showReset.onClick) === null || _a === void 0 ? void 0 : _a.call(showReset, e));
            } }), locale.CSearch.reset))));
};
exports.default = SearchDisplay;
var templateObject_1;
//# sourceMappingURL=SearchDisplay.js.map