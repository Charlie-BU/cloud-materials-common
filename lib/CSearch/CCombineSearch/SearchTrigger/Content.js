"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importDefault(require("react"));
var ContentInput_1 = tslib_1.__importDefault(require("./ContentInput"));
var ContentSelect_1 = tslib_1.__importDefault(require("./ContentSelect"));
var Content = function (props) {
    var _a;
    var className = props.className, current = props.current, tempValue = props.tempValue, placeholder = props.placeholder, alignType = props.alignType, readOnly = props.readOnly, defaultField = props.defaultField, searchWord = props.searchWord, updateSearchWord = props.updateSearchWord, updateTempValue = props.updateTempValue, updateSearchValue = props.updateSearchValue, updateState = props.updateState;
    var isInLine = alignType === 'inline';
    if ((current === null || current === void 0 ? void 0 : current.type) === 'input') {
        return (react_1.default.createElement(ContentInput_1.default, { className: className, size: isInLine ? 'mini' : 'default', item: current, tempValue: tempValue, placeholder: placeholder, updateTempValue: updateTempValue, updateSearchValue: updateSearchValue, updateState: updateState }));
    }
    if ((current === null || current === void 0 ? void 0 : current.type) === 'select') {
        return (react_1.default.createElement(ContentSelect_1.default, { size: isInLine ? 'mini' : 'default', searchWord: searchWord, className: className, item: current, tempValue: tempValue, placeholder: placeholder, updateTempValue: updateTempValue, updateSearchValue: updateSearchValue, updateSearchWord: updateSearchWord, updateState: updateState }));
    }
    if ((current === null || current === void 0 ? void 0 : current.type) === 'custom' && tempValue !== undefined) {
        var onSave = function (value) {
            if (value === void 0) { value = tempValue; }
            updateSearchValue(value, current === null || current === void 0 ? void 0 : current.fieldName);
            updateState('default', null);
            updateTempValue(undefined);
        };
        var onBack = function () {
            updateState('field', null);
            updateTempValue(undefined);
        };
        return (react_1.default.createElement("div", { className: className }, (_a = current.renderTrigger) === null || _a === void 0 ? void 0 : _a.call(current, { item: current, value: tempValue, onSave: onSave, onBack: onBack })));
    }
    return (react_1.default.createElement(web_react_1.Input, { autoFocus: !isInLine, size: isInLine ? 'mini' : 'default', className: className, placeholder: placeholder, readOnly: !defaultField && readOnly, 
        // TODO: 这里是默认字段进行输入，其输入内容应该是select的搜索词，而不是临时值，待优化
        onBlur: !readOnly ? function () { return updateTempValue(undefined); } : undefined, onChange: function (v) { return updateTempValue(v); }, value: tempValue }));
};
exports.default = Content;
//# sourceMappingURL=Content.js.map