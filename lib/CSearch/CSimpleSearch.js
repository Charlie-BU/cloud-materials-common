"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var builtInComponent_1 = tslib_1.__importDefault(require("../_factory/builtInComponent"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var CompactWrapper_1 = tslib_1.__importDefault(require("./components/CompactWrapper"));
var Component_1 = tslib_1.__importStar(require("./components/Component"));
var useDebounceHandler_1 = require("./hooks/useDebounceHandler");
var utils_1 = require("./utils");
var lodash_es_1 = require("lodash-es");
var useFilterUserInput_1 = require("./hooks/useFilterUserInput");
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('simple-search');
var CSimpleSearchComponent = function (props) {
    var wrapperClassName = props.wrapperClassName, wrapperStyle = props.wrapperStyle, label = props.label, labelWidth = props.labelWidth, labelBordered = props.labelBordered, onChange = props.onChange, content = props.content, debounceOptions = props.debounceOptions, normalize = props.normalize, componentProps = tslib_1.__rest(props, ["wrapperClassName", "wrapperStyle", "label", "labelWidth", "labelBordered", "onChange", "content", "debounceOptions", "normalize"]);
    var debounceHandleChange = (0, useDebounceHandler_1.useDebounceHandler)({ onChange: onChange, debounceOptions: debounceOptions }).debounceHandleChange;
    var filterUserInput = (0, useFilterUserInput_1.useFilterUserInput)({
        content: content,
        normalize: normalize,
    }).filterUserInput;
    var extraProps = {
        normalize: content.component === 'Input' ? filterUserInput : undefined,
        inputProps: content.component === 'AutoComplete'
            ? {
                normalize: filterUserInput,
            }
            : undefined,
        renderFormat: content.component === 'Select'
            ? function (option) {
                if ((option === null || option === void 0 ? void 0 : option.children) && (0, lodash_es_1.isString)(option === null || option === void 0 ? void 0 : option.children)) {
                    return react_1.default.createElement(CEllipsis_1.default, { content: option.children });
                }
                return option === null || option === void 0 ? void 0 : option.children;
            }
            : undefined,
    };
    return (react_1.default.createElement(CompactWrapper_1.default, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className: wrapperClassName, style: wrapperStyle, label: label, labelWidth: labelWidth, labelBordered: labelBordered },
        react_1.default.createElement(Component_1.default, { content: react_1.default.isValidElement(content)
                ? content
                : {
                    component: content.component,
                    componentProps: (0, utils_1.dropUndefined)((0, lodash_es_1.merge)({}, (0, utils_1.dropUndefined)(extraProps), tslib_1.__assign({}, content.componentProps))),
                }, commonProps: (0, utils_1.dropUndefined)(tslib_1.__assign(tslib_1.__assign({}, componentProps), { onChange: debounceHandleChange })) })));
};
CSimpleSearchComponent.displayName = 'CSimpleSearch';
var CSimpleSearch = (0, builtInComponent_1.default)(CSimpleSearchComponent, Component_1.components);
exports.default = CSimpleSearch;
var templateObject_1;
//# sourceMappingURL=CSimpleSearch.js.map