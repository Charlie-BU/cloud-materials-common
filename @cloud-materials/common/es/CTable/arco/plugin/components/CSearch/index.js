import { __assign } from "tslib";
import React from 'react';
import { observer } from '@formily/react';
import { omitToolbarItemRenderProps } from '../../../../react';
import { default as CSearchOuter } from '../../../../../CSearch';
export var CSearch = observer(function (props) {
    var onChange = props.onChange, value = props.value;
    return (
    // debounceOptions 配置为 null 时，可以去除 CSearch 的 debounce 逻辑
    React.createElement(CSearchOuter, __assign({}, omitToolbarItemRenderProps(props), { value: value, onChange: onChange, debounceOptions: null })));
});
export var CSimpleSearch = observer(function (props) {
    var onChange = props.onChange, value = props.value;
    return (React.createElement(CSearchOuter.CSimpleSearch, __assign({}, omitToolbarItemRenderProps(props), { value: value, onChange: onChange, debounceOptions: null })));
});
export var CCascaderSearch = observer(function (props) {
    var onChange = props.onChange, value = props.value;
    return (React.createElement(CSearchOuter.CCascaderSearch, __assign({}, omitToolbarItemRenderProps(props), { value: value, onChange: onChange, debounceOptions: null })));
});
export var CCombineSearch = observer(function (props) {
    var onChange = props.onChange, value = props.value;
    return React.createElement(CSearchOuter.CCombineSearch, __assign({}, omitToolbarItemRenderProps(props), { value: value, onChange: onChange }));
});
//# sourceMappingURL=index.js.map