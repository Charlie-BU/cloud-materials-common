"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSearch = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var _1 = require(".");
var CRadio_1 = tslib_1.__importDefault(require("../../../../CRadio"));
var CSearch_1 = tslib_1.__importDefault(require("../../../../CSearch"));
var CRadio = CRadio_1.default.Group;
exports.FilterSearch = CSearch_1.default.CSimpleSearch.register({ CRadio: CRadio });
var TableSelectFilter = function (props) {
    var component = props.component, componentProps = props.componentProps, restProps = tslib_1.__rest(props, ["component", "componentProps"]);
    return (react_1.default.createElement(exports.FilterSearch, tslib_1.__assign({ content: {
            component: component,
            componentProps: componentProps,
        } // 增强了类型，安全跳过
        , "date-cy": _1.tableSelectTestId.filter, debounceOptions: null }, restProps)));
};
TableSelectFilter.displayName = 'TableSelectFilter';
exports.default = TableSelectFilter;
//# sourceMappingURL=Search.js.map