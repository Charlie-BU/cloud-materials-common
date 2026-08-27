import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import createBuiltInComponent from '../_factory/builtInComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CompactWrapper from './components/CompactWrapper';
import SearchComponent, { components } from './components/Component';
import { useDebounceHandler } from './hooks/useDebounceHandler';
import { dropUndefined } from './utils';
import { isString, merge } from 'lodash-es';
import { useFilterUserInput } from './hooks/useFilterUserInput';
import CEllipsis from '../CEllipsis';
var cssPrefix = classNamePrefixFactory('simple-search');
var CSimpleSearchComponent = function (props) {
    var wrapperClassName = props.wrapperClassName, wrapperStyle = props.wrapperStyle, label = props.label, labelWidth = props.labelWidth, labelBordered = props.labelBordered, onChange = props.onChange, content = props.content, debounceOptions = props.debounceOptions, normalize = props.normalize, componentProps = __rest(props, ["wrapperClassName", "wrapperStyle", "label", "labelWidth", "labelBordered", "onChange", "content", "debounceOptions", "normalize"]);
    var debounceHandleChange = useDebounceHandler({ onChange: onChange, debounceOptions: debounceOptions }).debounceHandleChange;
    var filterUserInput = useFilterUserInput({
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
                if ((option === null || option === void 0 ? void 0 : option.children) && isString(option === null || option === void 0 ? void 0 : option.children)) {
                    return React.createElement(CEllipsis, { content: option.children });
                }
                return option === null || option === void 0 ? void 0 : option.children;
            }
            : undefined,
    };
    return (React.createElement(CompactWrapper, { "data-cy": cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className: wrapperClassName, style: wrapperStyle, label: label, labelWidth: labelWidth, labelBordered: labelBordered },
        React.createElement(SearchComponent, { content: React.isValidElement(content)
                ? content
                : {
                    component: content.component,
                    componentProps: dropUndefined(merge({}, dropUndefined(extraProps), __assign({}, content.componentProps))),
                }, commonProps: dropUndefined(__assign(__assign({}, componentProps), { onChange: debounceHandleChange })) })));
};
CSimpleSearchComponent.displayName = 'CSimpleSearch';
var CSimpleSearch = createBuiltInComponent(CSimpleSearchComponent, components);
export default CSimpleSearch;
var templateObject_1;
//# sourceMappingURL=CSimpleSearch.js.map