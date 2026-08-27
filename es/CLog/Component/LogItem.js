import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { transformAnsi } from '../util';
import Ansi from './ansi';
import { testId } from '../dataCy';
var Serial = function (_a) {
    var serial = _a.serial, serialWidth = _a.serialWidth;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    return (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["item-serial"], ["item-serial"]))), style: { minWidth: serialWidth } }, serial));
};
var LogItem = function (props) {
    var _a;
    var showSerialNumber = props.showSerialNumber, serialNumberType = props.serialNumberType, data = props.data, index = props.index, serialWidth = props.serialWidth, keyWord = props.keyWord, formatSerial = props.formatSerial, onClickItem = props.onClickItem;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('log');
    // NOTE: 只支持object 的格式，数据中包含 Time， 如果是 string 要如何处理
    var serial = serialNumberType === 'time' && typeof data !== 'string' && data.Time
        ? "[".concat((_a = formatSerial === null || formatSerial === void 0 ? void 0 : formatSerial(data === null || data === void 0 ? void 0 : data.Time)) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.Time, "]")
        : "".concat(index);
    var content = typeof data === 'object' ? transformAnsi(data === null || data === void 0 ? void 0 : data.Log) : transformAnsi(data);
    return (React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["item"], ["item"]))), onClick: function () { return onClickItem === null || onClickItem === void 0 ? void 0 : onClickItem(data); }, "data-cy": testId.logItem, "data-testid": testId.logItem },
        showSerialNumber && React.createElement(Serial, { serial: serial, serialWidth: serialWidth }),
        React.createElement(Ansi, { searchText: keyWord }, content)));
};
export { LogItem, Serial };
var templateObject_1, templateObject_2;
//# sourceMappingURL=LogItem.js.map