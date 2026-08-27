"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CompactWrapper_1 = tslib_1.__importDefault(require("./components/CompactWrapper"));
var hooks_1 = require("./hooks");
var Component_1 = tslib_1.__importStar(require("./components/Component"));
var builtInComponent_1 = tslib_1.__importDefault(require("../_factory/builtInComponent"));
var CConfigProvider_1 = require("../CConfigProvider");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
var cssPrefix = (0, classNamePrefixFactory_1.default)('cascader-search');
var CCascaderSearchComponent = function (props) {
    var _a;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), getCPrefixCls = _b.getCPrefixCls, cComponentConfig = _b.cComponentConfig;
    var className = props.className, style = props.style, arcoSelectProps = props.arcoSelectProps, labelWidth = props.labelWidth, prefixAutoWidth = props.prefixAutoWidth, restProps = tslib_1.__rest(props, ["className", "style", "arcoSelectProps", "labelWidth", "prefixAutoWidth"]);
    var _c = tslib_1.__read((0, hooks_1.useCCascaderSearch)(restProps), 2), _d = _c[0], validOptions = _d.validOptions, state = _d.state, _e = _d.searchComponent, content = _e.content, commonProps = _e.commonProps, _f = _c[1], updateField = _f.updateField, updateValue = _f.updateValue;
    var cascaderCls = getCPrefixCls('search-cascader');
    return (react_1.default.createElement(CompactWrapper_1.default, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className: (0, classnames_1.default)(cascaderCls, className), style: style, labelWidth: labelWidth, label: react_1.default.createElement(web_react_1.Select, tslib_1.__assign({}, (0, lodash_es_1.merge)({}, arcoSelectProps, (prefixAutoWidth !== null && prefixAutoWidth !== void 0 ? prefixAutoWidth : (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CSearch.CCascaderSearch']) === null || _a === void 0 ? void 0 : _a.prefixAutoWidth)
            ? {
                triggerProps: {
                    autoAlignPopupMinWidth: false,
                    autoAlignPopupWidth: false,
                    position: 'bl',
                },
                style: {
                    width: 'auto',
                    maxWidth: '50%',
                },
            }
            : {}), { options: validOptions.map(function (_a) {
                var label = _a.label, fieldName = _a.fieldName;
                return ({ label: label, value: fieldName });
            }), value: state.fieldName, onChange: function (value, option) {
                var _a;
                updateField(value);
                (_a = arcoSelectProps === null || arcoSelectProps === void 0 ? void 0 : arcoSelectProps.onChange) === null || _a === void 0 ? void 0 : _a.call(arcoSelectProps, value, option);
            } })) },
        react_1.default.createElement(Component_1.default, { content: content, commonProps: tslib_1.__assign(tslib_1.__assign({}, commonProps), { value: state.value, onChange: updateValue }) })));
};
CCascaderSearchComponent.useCCascaderSearch = hooks_1.useCCascaderSearch;
CCascaderSearchComponent.displayName = 'CCascaderSearch';
var CCascaderSearch = (0, builtInComponent_1.default)(CCascaderSearchComponent, Component_1.components);
exports.default = CCascaderSearch;
var templateObject_1;
//# sourceMappingURL=CCascaderSearch.js.map