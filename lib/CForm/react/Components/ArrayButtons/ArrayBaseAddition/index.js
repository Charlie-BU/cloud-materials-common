"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var ArrayBase_1 = tslib_1.__importDefault(require("@storage-fe/formily-arco/es/ArrayBase"));
var CAddButton_1 = tslib_1.__importDefault(require("../../../../../CAddButton"));
var CConfigProvider_1 = require("../../../../../CConfigProvider");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('cform-array-base-addition');
var ArrayBaseAddition = function (props) {
    var _a, _b;
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var _c = props.method, method = _c === void 0 ? 'push' : _c, defaultValue = props.defaultValue, _d = props.title, title = _d === void 0 ? locale.CForm.array.addRow : _d, _e = props.max, max = _e === void 0 ? Number.MAX_SAFE_INTEGER : _e, _f = props.showSubInfo, showSubInfo = _f === void 0 ? false : _f, subInfo = props.subInfo, addButtonProps = props.addButtonProps;
    var _g = ArrayBase_1.default.useAddition(method, defaultValue), addItem = _g.addItem, showAdd = _g.showAdd, disabled = _g.disabled, fieldTitle = _g.title;
    var array = ArrayBase_1.default.useArray();
    if (!showAdd)
        return null;
    var currentCount = ((_a = array.field.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    var disableAdd = ((_b = array.field.value) === null || _b === void 0 ? void 0 : _b.length) >= max;
    var subNode;
    if (typeof subInfo === 'function') {
        subNode = subInfo(currentCount);
    }
    else if (typeof subInfo === 'string') {
        var info = subInfo.replace('${count}', "".concat(max - currentCount));
        subNode = info;
    }
    return (react_1.default.createElement("div", { className: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement(CAddButton_1.default, tslib_1.__assign({ type: 'primary', disabled: disabled || disableAdd, onClick: function () {
                var _a;
                addItem();
                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
            }, text: title || fieldTitle, enableAddCount: max - currentCount, showEnableAddTips: showSubInfo, customTips: showSubInfo && subNode }, addButtonProps))));
};
ArrayBaseAddition.displayName = 'ArrayBaseAddition';
exports.default = ArrayBaseAddition;
var templateObject_1;
//# sourceMappingURL=index.js.map