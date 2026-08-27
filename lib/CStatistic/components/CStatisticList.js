"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../CConfigProvider");
var index_1 = tslib_1.__importStar(require("../index"));
var CStatisticList = function (props) {
    var style = props.style, className = props.className, children = props.children, title = props.title, _a = props.list, list = _a === void 0 ? [] : _a;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var classPrefix = useCssPrefix('statistic');
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(classPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["list"], ["list"]))), className), "data-testid": index_1.testId.listWrapper },
        title && (react_1.default.createElement("div", { className: classPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["list-title"], ["list-title"]))), "data-testid": index_1.testId.listTitle, "data-cy": true }, title)),
        react_1.default.createElement("div", { className: classPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["list-content"], ["list-content"]))) },
            list.map(function (item, idx) {
                return item.isCountdown ? (react_1.default.createElement(index_1.default.Countdown, tslib_1.__assign({ key: idx }, item, { border: false }))) : (react_1.default.createElement(index_1.default, tslib_1.__assign({ key: idx }, item, { border: false })));
            }),
            children)));
};
exports.default = CStatisticList;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CStatisticList.js.map