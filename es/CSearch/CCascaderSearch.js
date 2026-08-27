import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React from 'react';
import { Select } from '@arco-design/web-react';
import classNames from 'classnames';
import CompactWrapper from './components/CompactWrapper';
import { useCCascaderSearch } from './hooks';
import SearchComponent, { components } from './components/Component';
import createBuiltInComponent from '../_factory/builtInComponent';
import { useCConfigContext } from '../CConfigProvider';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { merge } from 'lodash-es';
var cssPrefix = classNamePrefixFactory('cascader-search');
var CCascaderSearchComponent = function (props) {
    var _a;
    var _b = useCConfigContext(), getCPrefixCls = _b.getCPrefixCls, cComponentConfig = _b.cComponentConfig;
    var className = props.className, style = props.style, arcoSelectProps = props.arcoSelectProps, labelWidth = props.labelWidth, prefixAutoWidth = props.prefixAutoWidth, restProps = __rest(props, ["className", "style", "arcoSelectProps", "labelWidth", "prefixAutoWidth"]);
    var _c = __read(useCCascaderSearch(restProps), 2), _d = _c[0], validOptions = _d.validOptions, state = _d.state, _e = _d.searchComponent, content = _e.content, commonProps = _e.commonProps, _f = _c[1], updateField = _f.updateField, updateValue = _f.updateValue;
    var cascaderCls = getCPrefixCls('search-cascader');
    return (React.createElement(CompactWrapper, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className: classNames(cascaderCls, className), style: style, labelWidth: labelWidth, label: React.createElement(Select, __assign({}, merge({}, arcoSelectProps, (prefixAutoWidth !== null && prefixAutoWidth !== void 0 ? prefixAutoWidth : (_a = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig['CSearch.CCascaderSearch']) === null || _a === void 0 ? void 0 : _a.prefixAutoWidth)
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
        React.createElement(SearchComponent, { content: content, commonProps: __assign(__assign({}, commonProps), { value: state.value, onChange: updateValue }) })));
};
CCascaderSearchComponent.useCCascaderSearch = useCCascaderSearch;
CCascaderSearchComponent.displayName = 'CCascaderSearch';
var CCascaderSearch = createBuiltInComponent(CCascaderSearchComponent, components);
export default CCascaderSearch;
var templateObject_1;
//# sourceMappingURL=CCascaderSearch.js.map