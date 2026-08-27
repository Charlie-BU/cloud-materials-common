import { __assign } from "tslib";
import { useEffect } from 'react';
import { autorun, markRaw, untracked } from '@formily/reactive';
import { getFormFieldId, getPile, runCallable, updateFieldProps } from '../../shared/utils';
import { useRegisterConfigContext } from './context';
import { useField, useForm } from '@formily/react';
import { get } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';
export var useReactionProps = function (props) {
    var name = props.name;
    var form = useForm();
    // 父级 Field，如果为空，说明父级为 Form
    var parentField = useField();
    useEffect(function () {
        var titleDispose = autorun(function () {
            var _title = runCallable(props.title, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('title', formItemField, props['title'], _title);
            });
        });
        var descriptionDispose = autorun(function () {
            var _description = runCallable(props.description, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('description', formItemField, props['description'], _description);
            });
        });
        var hiddenDispose = autorun(function () {
            var _hidden = runCallable(props.hidden, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('hidden', formItemField, props['hidden'], _hidden);
            });
        });
        var visibleDispose = autorun(function () {
            var _visible = runCallable(props.visible, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('visible', formItemField, props['visible'], _visible);
            });
        });
        var displayDispose = autorun(function () {
            var _display = runCallable(props.display, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('display', formItemField, props['display'], _display);
            });
        });
        var patternDispose = autorun(function () {
            var _pattern = runCallable(props.pattern, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('pattern', formItemField, props['pattern'], _pattern);
            });
        });
        var editableDispose = autorun(function () {
            var _editable = runCallable(props.editable, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('editable', formItemField, props['editable'], _editable);
            });
        });
        var disabledDispose = autorun(function () {
            var _disabled = runCallable(props.disabled, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('disabled', formItemField, props['disabled'], _disabled);
            });
        });
        var readOnlyDispose = autorun(function () {
            var _readOnly = runCallable(props.readOnly, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('readOnly', formItemField, props['readOnly'], _readOnly);
            });
        });
        var readPrettyDispose = autorun(function () {
            var _readPretty = runCallable(props.readPretty, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('readPretty', formItemField, props['readPretty'], _readPretty);
            });
        });
        var dataDispose = autorun(function () {
            var _data = runCallable(props.data, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('data', formItemField, props['data'], _data);
            });
        });
        var dataSourceDispose = autorun(function () {
            var _dataSource = runCallable(props.dataSource, form, parentField);
            untracked(function () {
                // 拼装当前属性的全路径，用于字段查询
                var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                    ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                    : name;
                var formItemField = form.query(currentFieldFullPath).take();
                updateFieldProps('dataSource', formItemField, props['dataSource'], _dataSource);
            });
        });
        return function () {
            [
                titleDispose,
                descriptionDispose,
                hiddenDispose,
                visibleDispose,
                displayDispose,
                patternDispose,
                editableDispose,
                disabledDispose,
                readOnlyDispose,
                readPrettyDispose,
                dataDispose,
                dataSourceDispose,
            ].forEach(function (dispose) { return dispose(); });
        };
    }, []);
    var _title = runCallable(props.title, form, parentField);
    var _description = runCallable(props.description, form, parentField);
    var _hidden = runCallable(props.hidden, form, parentField);
    var _visible = runCallable(props.visible, form, parentField);
    var _display = runCallable(props.display, form, parentField);
    var _pattern = runCallable(props.pattern, form, parentField);
    var _editable = runCallable(props.editable, form, parentField);
    var _disabled = runCallable(props.disabled, form, parentField);
    var _readOnly = runCallable(props.readOnly, form, parentField);
    var _readPretty = runCallable(props.readPretty, form, parentField);
    var _data = runCallable(props.data, form, parentField);
    var _dataSource = runCallable(props.dataSource, form, parentField);
    return {
        _title: _title,
        _description: _description,
        _hidden: _hidden,
        _visible: _visible,
        _display: _display,
        _pattern: _pattern,
        _readOnly: _readOnly,
        _readPretty: _readPretty,
        _data: _data,
        _disabled: _disabled,
        _editable: _editable,
        _dataSource: _dataSource,
    };
};
export var useComponent = function (props, noReactions) {
    var _a;
    if (noReactions === void 0) { noReactions = false; }
    var _b = useRegisterConfigContext(), componentsMap = _b.componentsMap, defaultComponentProps = _b.defaultComponentProps;
    var locale = useCConfigContext().locale;
    var name = props.name;
    var form = useForm();
    // 父级 Field，如果为空，说明父级为 Form
    var parentField = useField();
    var getComponentProps = function (fieldComponentProps) {
        var _a, _b, _c;
        // 拼装当前属性的全路径，用于字段查询
        var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString()) ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name) : name;
        var propsComponent = (_a = props.componentOptions) === null || _a === void 0 ? void 0 : _a.component;
        var _component = (typeof propsComponent === 'string' ? componentsMap[propsComponent] : propsComponent) || null;
        var defaultProps;
        if (typeof propsComponent === 'string') {
            defaultProps = defaultComponentProps === null || defaultComponentProps === void 0 ? void 0 : defaultComponentProps[propsComponent];
            // CFormDefaultComponentProps 提前初始化导致语言包失效
            if (defaultProps) {
                switch (propsComponent) {
                    case 'Input':
                        defaultProps = __assign(__assign({}, defaultProps), { placeholder: locale.CForm.placeholder.input });
                        break;
                    case 'Select':
                        defaultProps = __assign(__assign({}, defaultProps), { placeholder: locale.CForm.placeholder.select });
                        break;
                    default:
                        break;
                }
            }
        }
        /**
         * 将 ref 标记为不可被 observable 劫持
         * 在 formily 内部会通过 createElement 创建组件，会先 observer 在 toJS , 相当于进行一次深拷贝
         * 用 markRaw 包裹后，不会在进行深拷贝
         * 但是会导致 field.componenProps.xxx = 'xxx' 的响应式失效，这里可以再考虑一下要不要支持 ref
         */
        var ref = ((_b = props.componentOptions) === null || _b === void 0 ? void 0 : _b.ref) ? markRaw({ ref: (_c = props.componentOptions) === null || _c === void 0 ? void 0 : _c.ref }) : undefined;
        /**
         * 组装 className
         * 用于错误时检索错误节点滚动到报错节点
         */
        var className = [];
        if (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.className) {
            className = className.concat(defaultProps.className);
        }
        if (fieldComponentProps === null || fieldComponentProps === void 0 ? void 0 : fieldComponentProps.className) {
            className = className.concat(fieldComponentProps.className);
        }
        var _componentProps = __assign(__assign(__assign(__assign({}, defaultProps), fieldComponentProps), { className: className, id: getFormFieldId(currentFieldFullPath) }), ref);
        // 因为和 CField 结合会解析 props.children 当成子node
        // 在响应式场景下，会直接更行 field.componentProps, formily 内部会进行 children merge 导致出现两个相同 reactNode 子节点
        // @ts-ignore
        if (props.children && get(_componentProps, 'children')) {
            delete _componentProps.children;
        }
        return { _componentProps: _componentProps, _component: _component };
    };
    useEffect(function () {
        var componentPropsDispose = function () { };
        if (!noReactions) {
            componentPropsDispose = autorun(function () {
                var _a;
                var fieldComponentProps = runCallable((_a = props.componentOptions) === null || _a === void 0 ? void 0 : _a.props, form, parentField);
                untracked(function () {
                    var _a;
                    var _componentProps = getComponentProps(fieldComponentProps)._componentProps;
                    // 拼装当前属性的全路径，用于字段查询
                    var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                        ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                        : name;
                    var formItemField = form.query(currentFieldFullPath).take();
                    updateFieldProps('componentProps', formItemField, (_a = props.componentOptions) === null || _a === void 0 ? void 0 : _a.props, _componentProps);
                });
            });
        }
        return function () {
            componentPropsDispose();
        };
    }, []);
    var fieldComponentProps = runCallable((_a = props.componentOptions) === null || _a === void 0 ? void 0 : _a.props, form, parentField);
    var _c = getComponentProps(fieldComponentProps), _component = _c._component, _componentProps = _c._componentProps;
    return [_component, _componentProps];
};
export var useDecorator = function (props, noReactions) {
    var _a, _b;
    if (noReactions === void 0) { noReactions = false; }
    var _c = useRegisterConfigContext(), defaultDecoratorProps = _c.defaultDecoratorProps, componentsMap = _c.componentsMap, defaultDecorator = _c.defaultDecorator;
    var name = props.name;
    var form = useForm();
    // 父级 Field，如果为空，说明父级为 Form
    var parentField = useField();
    var decoratorComponent = ((_a = props.decoratorOptions) === null || _a === void 0 ? void 0 : _a.component) || defaultDecorator || null;
    var getDecoratorProps = function (fieldDecoratorProps) {
        var _a;
        // 拼装当前属性的全路径，用于字段查询
        var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString()) ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name) : name;
        var defaultProps;
        if (typeof decoratorComponent === 'string') {
            defaultProps = defaultDecoratorProps === null || defaultDecoratorProps === void 0 ? void 0 : defaultDecoratorProps[decoratorComponent];
        }
        /**
         * 将 ref 标记为不可被 observable 劫持
         * 在 formily 内部会通过 createElement 创建组件，会先 observer 在 toJS , 相当于进行一次深拷贝
         * 用 markRaw 包裹后，不会在进行深拷贝
         */
        var ref = markRaw({ ref: (_a = props.decoratorOptions) === null || _a === void 0 ? void 0 : _a.ref });
        /**
         * 组装 className
         * 用于错误时检索错误节点滚动到报错节点
         */
        var className = [];
        if (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.className) {
            className = className.concat(defaultProps.className);
        }
        if (fieldDecoratorProps === null || fieldDecoratorProps === void 0 ? void 0 : fieldDecoratorProps.className) {
            className = className.concat(fieldDecoratorProps.className);
        }
        var decorator = typeof decoratorComponent === 'string' ? componentsMap[decoratorComponent] : decoratorComponent;
        var _decoratorProps = __assign(__assign(__assign(__assign(__assign({}, defaultProps), fieldDecoratorProps), { className: className, id: getFormFieldId(currentFieldFullPath) }), getPile(decorator, parentField === null || parentField === void 0 ? void 0 : parentField.path.concat(name))), ref);
        return _decoratorProps;
    };
    useEffect(function () {
        var decoratorPropsDispose = function () { };
        if (!noReactions) {
            decoratorPropsDispose = autorun(function () {
                var _a;
                var fieldDecoratorProps = runCallable((_a = props.decoratorOptions) === null || _a === void 0 ? void 0 : _a.props, form, parentField);
                untracked(function () {
                    var _a;
                    var _decoratorProps = getDecoratorProps(fieldDecoratorProps);
                    // 拼装当前属性的全路径，用于字段查询
                    var currentFieldFullPath = (parentField === null || parentField === void 0 ? void 0 : parentField.address.toString())
                        ? "".concat(parentField === null || parentField === void 0 ? void 0 : parentField.address.toString(), ".").concat(name)
                        : name;
                    var formItemField = form.query(currentFieldFullPath).take();
                    updateFieldProps('decoratorProps', formItemField, (_a = props.decoratorOptions) === null || _a === void 0 ? void 0 : _a.props, _decoratorProps);
                });
            });
        }
        return function () {
            decoratorPropsDispose();
        };
    }, []);
    if (!decoratorComponent) {
        return undefined;
    }
    var decorator = typeof decoratorComponent === 'string' ? componentsMap[decoratorComponent] : decoratorComponent;
    var fieldDecoratorProps = runCallable((_b = props.decoratorOptions) === null || _b === void 0 ? void 0 : _b.props, form, parentField);
    var _decoratorProps = getDecoratorProps(fieldDecoratorProps);
    return [decorator, _decoratorProps];
};
//# sourceMappingURL=useReaction.js.map