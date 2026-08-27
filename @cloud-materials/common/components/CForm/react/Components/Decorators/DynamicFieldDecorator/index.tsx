import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@formily/react';
import type { CFieldConfig, CForm, ObjectType } from '../../../../interface';
import CField from '../../../CField/CField';
import type { Field } from '@formily/core';
import reactiveWithCForm from '../../RectiveWithCForm';
import { useCForm } from '../../../hooks';

export interface DynamicFieldDecoratorProps<FieldConfig extends CFieldConfig = CFieldConfig> {
  /** 获取动态字段 */
  getDynamicFields: (params: { form: CForm; depValues?: ObjectType; dataDepValues?: ObjectType }) => FieldConfig[];
  depValues?: ObjectType;
  dataDepValues?: ObjectType;
  children?: React.ReactNode;
  /** 不卸载所有动态字段下子字段，保留相同path的子字段模型 */
  keepFields?: boolean;
}

function removeFields({
  form,
  parentField,
  renderFields,
  newRenderFields,
  keepFields,
}: {
  form: CForm;
  parentField: Field;
  renderFields: CFieldConfig[];
  newRenderFields: CFieldConfig[];
  keepFields: boolean;
}) {
  const parentPath = parentField?.address?.entire;
  if (!parentPath) {
    return;
  }
  // keepFields: true 只卸载动态字段下不同的子字段
  // keepFields: false 卸载动态字段下所有子字段
  if (keepFields) {
    renderFields.forEach(el => {
      if (!newRenderFields.some(config => config.name === el.name)) {
        form.clearFormGraph(`${parentPath}.${el.name}`);
        form.clearFormGraph(`${parentPath}.${el.name}.*`);
      }
    });
  } else {
    form.clearFormGraph(`${parentPath}.*`);
  }
}

const DynamicFieldDecorator: React.FC<DynamicFieldDecoratorProps> = props => {
  const { children, depValues, dataDepValues, keepFields = false, getDynamicFields } = props;
  const form = useCForm();
  const field = useField() as unknown as Field;
  const [renderFields, setRenderFields] = useState<CFieldConfig[]>([]);
  const firstRef = useRef(true);

  // 对依赖项的值做出操作，去注册与注销字段
  useEffect(() => {
    const newRenderFields = getDynamicFields({ form, depValues, dataDepValues });
    // 在切换步骤时，会被卸载，因此初次渲染的时候不清理字段
    if (firstRef.current) {
      firstRef.current = false;
    } else {
      // 去移除旧字段
      removeFields({ form, parentField: field, renderFields, newRenderFields, keepFields });
    }
    setRenderFields([]);
    // 延迟设置子字段，确保重新对动态字段进行渲染
    setTimeout(() => {
      setRenderFields(newRenderFields);
    }, 0);
  }, [depValues, dataDepValues]);
  return (
    <>
      {children}
      {renderFields.map(field => (
        <CField key={field.name as string} {...field} />
      ))}
    </>
  );
};

export default reactiveWithCForm<DynamicFieldDecoratorProps>(DynamicFieldDecorator);
