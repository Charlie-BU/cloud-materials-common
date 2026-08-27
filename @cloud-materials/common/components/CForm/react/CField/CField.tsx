import React from 'react';
import type { IFieldProps } from '@formily/react';
import { ArrayField, Field, ObjectField, VoidField } from '@formily/react';
import type { BaseOmitKey, CFieldConfig, ObjectType } from '../../interface';
import { useComponent, useDecorator, useReactionProps, useValidator } from '../hooks';
import { isFunction, omit } from 'lodash-es';

/**
 * 为什么需要包装一个组件
 * 原因：在 ArrayTable 场景下，内部需要通过 columRender 重新包装，需要解析每一列的类型
 * 解析是使用的 ReactNode 属性和 displayName
 */
const createDisplayNameComponent = (type: 'VoidField' | 'Field' | 'ArrayField' | 'ObjectField') => {
  const DisplayNameComponent: React.FC<any> = props => {
    const { component, children, decorator, ...rest } = props;
    return <CField component={component} decorator={decorator} children={children} {...rest} />;
  };

  DisplayNameComponent.displayName = type;

  return DisplayNameComponent;
};

const DisplayNameComponentMap = {
  VoidField: createDisplayNameComponent('VoidField'),
  Field: createDisplayNameComponent('Field'),
  ArrayField: createDisplayNameComponent('ArrayField'),
  ObjectField: createDisplayNameComponent('ObjectField'),
};

// 解决没有 children 组件的报错，如 input 等组件
const renderChildren = (children: any, fields?: CFieldConfig[]) => {
  if (fields && fields.length > 0) {
    return recursiveRender(fields);
  } else if (children) {
    return children;
  }
};

const recursiveRender = (fields?: CFieldConfig[]) => {
  if (!fields || fields?.length <= 0) return null;
  return fields?.map(item => {
    const component = useComponent(item, true);
    const decorator = useDecorator(item, true);
    const [_, option] = component;
    const { fields, ...rest } = item;

    /**
     * 为什么需要包装一个组件
     * 原因：在 ArrayTable 场景下，内部需要通过 columRender 重新包装，需要解析每一列的类型
     * 解析是使用的 ReactNode 属性和 displayName
     */
    const DisplayNameComponent = DisplayNameComponentMap[item.type || 'Field'];
    /**
     * 针对 footer 等在配置化场景下，componentOptions.props.children 传的是函数
     * option.children 为 componentProps.children，formily 不会区分是否为函数组件进行渲染
     * 如果它是函数组件，则将 option.children 作为组件的 children 进行渲染
     */
    const children = renderChildren(isFunction(option?.children) ? option.children : undefined, fields);
    /**
     * 在配置化的场景下，component 只是一个透传属性用于内部解析，无意义
     * 原因： formily arco 内部解析 Array 类型，是通过判断 ReactNode props 的 component 属性，内部默认为 Formily/React 的 Field
     * 所以必须得保持相同的结构才能解析
     */
    return (
      <DisplayNameComponent
        key={item.name.toString()}
        component={component}
        decorator={decorator}
        children={children}
        {...rest}
      />
    );
  });
};

const CField = <T extends ObjectType = any, D extends ObjectType = any>(
  props: CFieldConfig<T, D> & { component?: any[]; children?: any },
) => {
  const { children: child } = props;

  const {
    _title,
    _description,
    _hidden,
    _visible,
    _display,
    _pattern,
    _editable,
    _disabled,
    _readOnly,
    _readPretty,
    _data,
    _dataSource,
  } = useReactionProps(props);

  const _decorator = useDecorator(props);
  const _component = useComponent(props);
  const _validator = useValidator(props);
  const rest = omit(props, [
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
  ]) as Omit<Partial<IFieldProps<any, any>>, BaseOmitKey>;

  let FormilyField = Field;
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

  let dataFieldProps: Partial<IFieldProps<any, any>> = {};
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

  return (
    <FormilyField
      {...rest}
      key={props.name.toString()}
      name={props.name}
      title={_title}
      description={_description}
      decorator={_decorator}
      component={_component}
      hidden={_hidden}
      visible={_visible}
      display={_display}
      pattern={_pattern}
      editable={_editable}
      disabled={_disabled}
      readOnly={_readOnly}
      readPretty={_readPretty}
      dataSource={_dataSource}
      data={_data}
      {...dataFieldProps}
    >
      {renderChildren(child, props.fields)}
    </FormilyField>
  );
};

CField.displayName = 'CField';

export default CField;
