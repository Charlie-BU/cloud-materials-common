import React from 'react';
import { AutoComplete, DatePicker, InputNumber, Select } from '@arco-design/web-react';
import { useBuiltIn } from '../../_factory/builtInComponent';
import { useCConfigContext } from '../../CConfigProvider';
import SearchInput from './SearchInput';
var RangePicker = DatePicker.RangePicker;
export var components = {
    Input: SearchInput,
    InputNumber: InputNumber,
    Select: Select,
    DatePicker: DatePicker,
    RangePicker: RangePicker,
    AutoComplete: AutoComplete,
};
var SearchComponent = function (_a) {
    var content = _a.content, commonProps = _a.commonProps;
    var renderBuiltIn = useBuiltIn().renderBuiltIn;
    var _b = useCConfigContext(), getCPrefixCls = _b.getCPrefixCls, locale = _b.locale;
    var componentCls = getCPrefixCls('search-component');
    var getDefaultPlaceholder = function (name) {
        if (['Input', 'InputNumber', 'AutoComplete'].includes(name)) {
            return locale.CSearch.inputPlaceholder;
        }
        if (name === 'Select') {
            return locale.CSearch.selectPlaceholder;
        }
        return;
    };
    var defaultProps = Object.fromEntries(Object.keys(components).map(function (name) { return [
        name,
        {
            className: componentCls,
            placeholder: getDefaultPlaceholder(name),
        },
    ]; }));
    return (React.createElement(React.Fragment, null, renderBuiltIn(content, {
        defaultPropsMap: defaultProps,
        commonProps: commonProps,
    })));
};
export default SearchComponent;
//# sourceMappingURL=Component.js.map