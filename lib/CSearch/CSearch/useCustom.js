"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustom = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hooks_1 = require("../hooks");
var SearchDisplay_1 = tslib_1.__importDefault(require("./SearchDisplay"));
var SearchCollapse_1 = tslib_1.__importDefault(require("./SearchCollapse"));
var useCustom = function (props) {
    var displayArcoSpaceProps = props.displayArcoSpaceProps, collapsedClassName = props.collapsedClassName, labelWith = props.labelWith, showReset = props.showReset, showAdvanceReset = props.showAdvanceReset, colspan = props.colspan, restProps = tslib_1.__rest(props, ["displayArcoSpaceProps", "collapsedClassName", "labelWith", "showReset", "showAdvanceReset", "colspan"]);
    var _a = tslib_1.__read((0, hooks_1.useCSearch)(restProps), 2), _b = _a[0], manual = _b.manual, displayList = _b.displayList, advanceList = _b.advanceList, advanceVisible = _b.advanceVisible, activeAdvanceCount = _b.activeAdvanceCount, params = _b.params, _c = _a[1], toggleAdvanceVisible = _c.toggleAdvanceVisible, search = _c.search, updateParams = _c.updateParams, resetParams = _c.resetParams, resetAdvanceParams = _c.resetAdvanceParams;
    return {
        CSearchDisplay: (react_1.default.createElement(SearchDisplay_1.default, { displayArcoSpaceProps: displayArcoSpaceProps, showReset: showReset, manual: manual, displayList: displayList, advanceList: advanceList, advanceVisible: advanceVisible, activeAdvanceCount: activeAdvanceCount, params: params, toggleAdvanceVisible: toggleAdvanceVisible, search: search, updateParams: updateParams, resetParams: resetParams })),
        CSearchCollapse: (react_1.default.createElement(SearchCollapse_1.default, { collapsedClassName: collapsedClassName, labelWith: labelWith, showAdvanceReset: showAdvanceReset, colspan: colspan, advanceList: advanceList, advanceVisible: advanceVisible, params: params, updateParams: updateParams, resetAdvanceParams: resetAdvanceParams })),
    };
};
exports.useCustom = useCustom;
//# sourceMappingURL=useCustom.js.map