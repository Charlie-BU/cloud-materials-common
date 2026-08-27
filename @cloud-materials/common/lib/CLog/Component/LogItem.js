"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serial = exports.LogItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var util_1 = require("../util");
var ansi_1 = tslib_1.__importDefault(require("./ansi"));
var dataCy_1 = require("../dataCy");
var Serial = function (_a) {
    var serial = _a.serial, serialWidth = _a.serialWidth;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["item-serial"], ["item-serial"]))), style: { minWidth: serialWidth } }, serial));
};
exports.Serial = Serial;
var LogItem = function (props) {
    var _a;
    var showSerialNumber = props.showSerialNumber, serialNumberType = props.serialNumberType, data = props.data, index = props.index, serialWidth = props.serialWidth, keyWord = props.keyWord, formatSerial = props.formatSerial, onClickItem = props.onClickItem;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    // NOTE: 只支持object 的格式，数据中包含 Time， 如果是 string 要如何处理
    var serial = serialNumberType === 'time' && typeof data !== 'string' && data.Time
        ? "[".concat((_a = formatSerial === null || formatSerial === void 0 ? void 0 : formatSerial(data === null || data === void 0 ? void 0 : data.Time)) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.Time, "]")
        : "".concat(index);
    var content = typeof data === 'object' ? (0, util_1.transformAnsi)(data === null || data === void 0 ? void 0 : data.Log) : (0, util_1.transformAnsi)(data);
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["item"], ["item"]))), onClick: function () { return onClickItem === null || onClickItem === void 0 ? void 0 : onClickItem(data); }, "data-cy": dataCy_1.testId.logItem, "data-testid": dataCy_1.testId.logItem },
        showSerialNumber && react_1.default.createElement(Serial, { serial: serial, serialWidth: serialWidth }),
        react_1.default.createElement(ansi_1.default, { searchText: keyWord }, content)));
};
exports.LogItem = LogItem;
var templateObject_1, templateObject_2;
//# sourceMappingURL=LogItem.js.map