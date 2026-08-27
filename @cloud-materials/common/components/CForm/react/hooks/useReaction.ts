import type { GeneralField, FieldPatternTypes, FieldDisplayTypes, FieldDataSource, Form } from '@formily/core';
import { useEffect } from 'react';
import { autorun, markRaw, untracked } from '@formily/reactive';
import { getFormFieldId, getPile, runCallable, updateFieldProps } from '../../shared/utils';
import type { CFieldProps, CForm } from '../../interface';
import { useRegisterConfigContext } from './context';
import { useField, useForm } from '@formily/react';
import { get } from 'lodash-es';
import { useCConfigContext } from '../../../CConfigProvider';

export const useReactionProps = (props: CFieldProps) => {
  const { name } = props;
  const form: Form = useForm();
  // 父级 Field，如果为空，说明父级为 Form
  const parentField = useField();

  useEffect(() => {
    const titleDispose = autorun(() => {
      const _title = runCallable<any>(props.title, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('title', formItemField, props['title'], _title);
      });
    });

    const descriptionDispose = autorun(() => {
      const _description = runCallable<any>(props.description, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('description', formItemField, props['description'], _description);
      });
    });

    const hiddenDispose = autorun(() => {
      const _hidden = runCallable<boolean>(props.hidden, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('hidden', formItemField, props['hidden'], _hidden);
      });
    });

    const visibleDispose = autorun(() => {
      const _visible = runCallable<boolean>(props.visible, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('visible', formItemField, props['visible'], _visible);
      });
    });

    const displayDispose = autorun(() => {
      const _display = runCallable<FieldDisplayTypes>(props.display, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<FieldDisplayTypes>('display', formItemField, props['display'], _display);
      });
    });

    const patternDispose = autorun(() => {
      const _pattern = runCallable<FieldPatternTypes>(props.pattern, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<FieldPatternTypes>('pattern', formItemField, props['pattern'], _pattern);
      });
    });

    const editableDispose = autorun(() => {
      const _editable = runCallable<boolean>(props.editable, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('editable', formItemField, props['editable'], _editable);
      });
    });

    const disabledDispose = autorun(() => {
      const _disabled = runCallable<boolean>(props.disabled, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('disabled', formItemField, props['disabled'], _disabled);
      });
    });

    const readOnlyDispose = autorun(() => {
      const _readOnly = runCallable<boolean>(props.readOnly, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('readOnly', formItemField, props['readOnly'], _readOnly);
      });
    });

    const readPrettyDispose = autorun(() => {
      const _readPretty = runCallable<boolean>(props.readPretty, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('readPretty', formItemField, props['readPretty'], _readPretty);
      });
    });

    const dataDispose = autorun(() => {
      const _data = runCallable<boolean>(props.data, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<boolean>('data', formItemField, props['data'], _data);
      });
    });

    const dataSourceDispose = autorun(() => {
      const _dataSource = runCallable<FieldDataSource>(props.dataSource, form as CForm, parentField);
      untracked(() => {
        // 拼装当前属性的全路径，用于字段查询
        const currentFieldFullPath = parentField?.address.toString()
          ? `${parentField?.address.toString()}.${name}`
          : name;
        const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
        updateFieldProps<FieldDataSource>('dataSource', formItemField, props['dataSource'], _dataSource);
      });
    });
    return () => {
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
      ].forEach(dispose => dispose());
    };
  }, []);

  const _title = runCallable<any>(props.title, form as CForm, parentField);
  const _description = runCallable<any>(props.description, form as CForm, parentField);
  const _hidden = runCallable<boolean>(props.hidden, form as CForm, parentField);
  const _visible = runCallable<boolean>(props.visible, form as CForm, parentField);
  const _display = runCallable<FieldDisplayTypes>(props.display, form as CForm, parentField);
  const _pattern = runCallable<FieldPatternTypes>(props.pattern, form as CForm, parentField);
  const _editable = runCallable<boolean>(props.editable, form as CForm, parentField);
  const _disabled = runCallable<boolean>(props.disabled, form as CForm, parentField);
  const _readOnly = runCallable<boolean>(props.readOnly, form as CForm, parentField);
  const _readPretty = runCallable<boolean>(props.readPretty, form as CForm, parentField);
  const _data = runCallable<boolean>(props.data, form as CForm, parentField);
  const _dataSource = runCallable<FieldDataSource>(props.dataSource, form as CForm, parentField);

  return {
    _title,
    _description,
    _hidden,
    _visible,
    _display,
    _pattern,
    _readOnly,
    _readPretty,
    _data,
    _disabled,
    _editable,
    _dataSource,
  };
};

export const useComponent = (props: CFieldProps, noReactions = false) => {
  const { componentsMap, defaultComponentProps } = useRegisterConfigContext();
  const { locale } = useCConfigContext();

  const { name } = props;
  const form: Form = useForm();
  // 父级 Field，如果为空，说明父级为 Form
  const parentField = useField();

  const getComponentProps = (fieldComponentProps: any) => {
    // 拼装当前属性的全路径，用于字段查询
    const currentFieldFullPath = parentField?.address.toString() ? `${parentField?.address.toString()}.${name}` : name;
    const propsComponent = props.componentOptions?.component;
    const _component = (typeof propsComponent === 'string' ? componentsMap[propsComponent] : propsComponent) || null;
    let defaultProps: any;
    if (typeof propsComponent === 'string') {
      defaultProps = defaultComponentProps?.[propsComponent];
      // CFormDefaultComponentProps 提前初始化导致语言包失效
      if (defaultProps) {
        switch (propsComponent) {
          case 'Input':
            defaultProps = {
              ...defaultProps,
              placeholder: locale.CForm.placeholder.input,
            };
            break;
          case 'Select':
            defaultProps = {
              ...defaultProps,
              placeholder: locale.CForm.placeholder.select,
            };
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
    const ref = props.componentOptions?.ref ? markRaw({ ref: props.componentOptions?.ref }) : undefined;

    /**
     * 组装 className
     * 用于错误时检索错误节点滚动到报错节点
     */
    let className: string[] = [];
    if (defaultProps?.className) {
      className = className.concat(defaultProps.className);
    }
    if (fieldComponentProps?.className) {
      className = className.concat(fieldComponentProps.className);
    }

    const _componentProps = {
      ...defaultProps,
      ...fieldComponentProps,
      className,
      id: getFormFieldId(currentFieldFullPath),
      ...ref,
    };

    // 因为和 CField 结合会解析 props.children 当成子node
    // 在响应式场景下，会直接更行 field.componentProps, formily 内部会进行 children merge 导致出现两个相同 reactNode 子节点
    // @ts-ignore
    if (props.children && get(_componentProps, 'children')) {
      delete _componentProps.children;
    }

    return { _componentProps, _component };
  };

  useEffect(() => {
    let componentPropsDispose = () => {};
    if (!noReactions) {
      componentPropsDispose = autorun(() => {
        const fieldComponentProps = runCallable<any>(props.componentOptions?.props, form as CForm, parentField);
        untracked(() => {
          const { _componentProps } = getComponentProps(fieldComponentProps);
          // 拼装当前属性的全路径，用于字段查询
          const currentFieldFullPath = parentField?.address.toString()
            ? `${parentField?.address.toString()}.${name}`
            : name;
          const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
          updateFieldProps<any>('componentProps', formItemField, props.componentOptions?.props, _componentProps);
        });
      });
    }
    return () => {
      componentPropsDispose();
    };
  }, []);

  const fieldComponentProps = runCallable<any>(props.componentOptions?.props, form as CForm, parentField);
  const { _component, _componentProps } = getComponentProps(fieldComponentProps);

  return [_component, _componentProps];
};

export const useDecorator = (props: CFieldProps, noReactions = false) => {
  const { defaultDecoratorProps, componentsMap, defaultDecorator } = useRegisterConfigContext();

  const { name } = props;
  const form: Form = useForm();
  // 父级 Field，如果为空，说明父级为 Form
  const parentField = useField();

  const decoratorComponent = props.decoratorOptions?.component || defaultDecorator || null;

  const getDecoratorProps = (fieldDecoratorProps: any) => {
    // 拼装当前属性的全路径，用于字段查询
    const currentFieldFullPath = parentField?.address.toString() ? `${parentField?.address.toString()}.${name}` : name;
    let defaultProps: any;
    if (typeof decoratorComponent === 'string') {
      defaultProps = defaultDecoratorProps?.[decoratorComponent];
    }

    /**
     * 将 ref 标记为不可被 observable 劫持
     * 在 formily 内部会通过 createElement 创建组件，会先 observer 在 toJS , 相当于进行一次深拷贝
     * 用 markRaw 包裹后，不会在进行深拷贝
     */
    const ref = markRaw({ ref: props.decoratorOptions?.ref });

    /**
     * 组装 className
     * 用于错误时检索错误节点滚动到报错节点
     */
    let className: string[] = [];
    if (defaultProps?.className) {
      className = className.concat(defaultProps.className);
    }
    if (fieldDecoratorProps?.className) {
      className = className.concat(fieldDecoratorProps.className);
    }

    const decorator = typeof decoratorComponent === 'string' ? componentsMap[decoratorComponent] : decoratorComponent;

    const _decoratorProps = {
      ...defaultProps,
      ...fieldDecoratorProps,
      className,
      id: getFormFieldId(currentFieldFullPath),
      ...getPile(decorator, parentField?.path.concat(name)),
      ...ref,
    };

    return _decoratorProps;
  };

  useEffect(() => {
    let decoratorPropsDispose = () => {};
    if (!noReactions) {
      decoratorPropsDispose = autorun(() => {
        const fieldDecoratorProps = runCallable<any>(props.decoratorOptions?.props, form as CForm, parentField);
        untracked(() => {
          const _decoratorProps = getDecoratorProps(fieldDecoratorProps);
          // 拼装当前属性的全路径，用于字段查询
          const currentFieldFullPath = parentField?.address.toString()
            ? `${parentField?.address.toString()}.${name}`
            : name;
          const formItemField = form.query(currentFieldFullPath).take() as unknown as GeneralField;
          updateFieldProps<any>('decoratorProps', formItemField, props.decoratorOptions?.props, _decoratorProps);
        });
      });
    }
    return () => {
      decoratorPropsDispose();
    };
  }, []);

  if (!decoratorComponent) {
    return undefined;
  }

  const decorator = typeof decoratorComponent === 'string' ? componentsMap[decoratorComponent] : decoratorComponent;

  const fieldDecoratorProps = runCallable<any>(props.decoratorOptions?.props, form as CForm, parentField);
  const _decoratorProps = getDecoratorProps(fieldDecoratorProps);

  return [decorator, _decoratorProps];
};
