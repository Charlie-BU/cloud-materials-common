"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("@formily/react");
var react_2 = tslib_1.__importDefault(require("react"));
var CRadio_1 = tslib_1.__importDefault(require("../../../../CRadio"));
var lodash_es_1 = require("lodash-es");
var CRadio = (0, react_1.observer)(function (props) {
    var _a, _b;
    var field = (0, react_1.useField)();
    var readPretty = field.readPretty;
    var dataSource = (_b = (_a = props === null || props === void 0 ? void 0 : props.options) !== null && _a !== void 0 ? _a : field.dataSource) !== null && _b !== void 0 ? _b : [];
    var currentOption = dataSource.find(function (optionItem) {
        var option = (0, lodash_es_1.isObject)(optionItem) ? optionItem : { value: optionItem, label: optionItem };
        return option.value === (props === null || props === void 0 ? void 0 : props.value);
    });
    var readPrettyValue = props.value;
    if (currentOption) {
        readPrettyValue = (0, lodash_es_1.isObject)(currentOption) ? currentOption.label : currentOption;
    }
    return readPretty ? react_2.default.createElement("span", null, readPrettyValue) : react_2.default.createElement(CRadio_1.default.Group, tslib_1.__assign({}, props, { options: dataSource }));
});
exports.default = CRadio;
//# sourceMappingURL=index.js.map