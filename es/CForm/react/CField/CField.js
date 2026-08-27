import { __assign, __read, __rest } from "tslib";
import React from 'react';
import { ArrayField, Field, ObjectField, VoidField } from '@formily/react';
import { useComponent, useDecorator, useReactionProps, useValidator } from '../hooks';
import { isFunction, omit } from 'lodash-es';
/**
 * 为什么需要包装一个组件
 * 原因：在 ArrayTable 场景下，内部需要通过 columRender 重新包装，需要解析每一列的类型
 * 解析是使用的 ReactNode 属性和 displayName
 */
var createDisplayNameComponent = function (type) {
    var DisplayNameComponent = function (props) {
        var component = props.component, children = props.children, decorator = props.decorator, rest = __rest(props, ["component", "children", "decorator"]);
        return React.createElement(CField, __assign({ component: component, decorator: decorator, children: children }, rest));
    };
    DisplayNameComponent.displayName = type;
    return DisplayNameComponent;
};
var DisplayNameComponentMap = {
    VoidField: createDisplayNameComponent('VoidField'),
    Field: createDisplayNameComponent('Field'),
    ArrayField: createDisplayNameComponent('ArrayField'),
    ObjectField: createDisplayNameComponent('ObjectField'),
};
// 解决没有 children 组件的报错，如 input 等组件
var renderChildren = function (children, fields) {
    if (fields && fields.length > 0) {
        return recursiveRender(fields);
    }
    else if (children) {
        return children;
    }
};
var recursiveRender = function (fields) {
    if (!fields || (fields === null || fields === void 0 ? void 0 : fields.length) <= 0)
        return null;
    return fields === null || fields === void 0 ? void 0 : fields.map(function (item) {
        var component = useComponent(item, true);
        var decorator = useDecorator(item, true);
        var _a = __read(component, 2), _ = _a[0], option = _a[1];
        var fields = item.fields, rest = __rest(item, ["fields"]);
        /**
         * 为什么需要包装一个组件
         * 原因：在 ArrayTable 场景下，内部需要通过 columRender 重新包装，需要解析每一列的类型
         * 解析是使用的 ReactNode 属性和 displayName
         */
        var DisplayNameComponent = DisplayNameComponentMap[item.type || 'Field'];
        /**
         * 针对 footer 等在配置化场景下，componentOptions.props.children 传的是函数
         * option.children 为 componentProps.children，formily 不会区分是否为函数组件进行渲染
         * 如果它是函数组件，则将 option.children 作为组件的 children 进行渲染
         */
        var children = renderChildren(isFunction(option === null || option === void 0 ? void 0 : option.children) ? option.children : undefined, fields);
        /**
         * 在配置化的场景下，component 只是一个透传属性用于内部解析，无意义
         * 原因： formily arco 内部解析 Array 类型，是通过判断 ReactNode props 的 component 属性，内部默认为 Formily/React 的 Field
         * 所以必须得保持相同的结构才能解析
         */
        return (React.createElement(DisplayNameComponent, __assign({ key: item.name.toString(), component: component, decorator: decorator, children: children }, rest)));
    });
};
var CField = function (props) {
    var child = props.children;
    var _a = useReactionProps(props), _title = _a._title, _description = _a._description, _hidden = _a._hidden, _visible = _a._visible, _display = _a._display, _pattern = _a._pattern, _editable = _a._editable, _disabled = _a._disabled, _readOnly = _a._readOnly, _readPretty = _a._readPretty, _data = _a._data, _dataSource = _a._dataSource;
    var _decorator = useDecorator(props);
    var _component = useComponent(props);
    var _validator = useValidator(props);
    var rest = omit(props, [
        'name',
        'title',
        'description',
        'hidden',
        'visible',
        'display',
        'pattern',
        'editable',
        'disabled',
        'readOnly',
        'readPretty',
        'dataSource',
        'data',
        'validator',
        'children',
        'type',
        'fields',
        'rules',
        'dynamicField',
        'componentOptions',
        'decoratorOptions',
    ]);
    var FormilyField = Field;
    switch (props.type) {
        case 'ArrayField':
            FormilyField = ArrayField;
            break;
        case 'ObjectField':
            FormilyField = ObjectField;
            break;
        case 'VoidField':
            FormilyField = VoidField;
            break;
        default:
            break;
    }
    var dataFieldProps = {};
    switch (props.type) {
        case 'VoidField':
            break;
        default:
            dataFieldProps = {
                value: props.value,
                initialValue: props.initialValue,
                dataSource: _dataSource,
                validator: _validator,
            };
            break;
    }
    return (React.createElement(FormilyField, __assign({}, rest, { key: props.name.toString(), name: props.name, title: _title, description: _description, decorator: _decorator, component: _component, hidden: _hidden, visible: _visible, display: _display, pattern: _pattern, editable: _editable, disabled: _disabled, readOnly: _readOnly, readPretty: _readPretty, dataSource: _dataSource, data: _data }, dataFieldProps), renderChildren(child, props.fields)));
};
CField.displayName = 'CField';
export default CField;
//# sourceMappingURL=CField.js.map