import React, { useMemo } from 'react';
import { useForm } from '@formily/react';
import { cloneDeep, isFunction, isPlainObject, isString, omit } from 'lodash-es';
import Detail from './Detail';
import { useFormStep } from '@storage-fe/formily-arco/es/FormStep/hooks';
import { getFormFieldId } from '../../../shared/utils';
import type { CFormConfirmDetail, ConfirmDetail } from '../../../interface';

const DefaultText = '-';

export const useFormDetail = (props: Omit<CFormConfirmDetail, 'protocol'>): ConfirmDetail => {
  const { detail, labelWidth } = props;

  const formStep = useFormStep();
  const form = useForm();
  const { values } = form;
  const cloneDetail = useMemo(() => cloneDeep(detail), [detail]);
  // TODO:下面这坨逻辑时间复杂度高，需要优化写法
  cloneDetail.forEach(step => {
    step.section = step.section.filter(item => {
      if (isFunction(item.hidden)) {
        return !item.hidden(values, form as any);
      }
      return true;
    });
    step.section.forEach(section => {
      // @ts-ignore
      section.fields = section.fields
        .filter(item => {
          if (isString(item)) {
            return true;
          }
          if (isPlainObject(item)) {
            const value = item?.name ? values[item.name] : '';
            return isFunction(item.hidden) ? !item.hidden(value, values, form as any) : !item.hidden;
          }
          return true;
        })
        .map(item => {
          if (isString(item)) {
            const field = form.getFieldState(item);
            const label = field?.title ?? item;
            const value = values[item] || DefaultText;
            const mapValue: string = (field?.dataSource || []).find(ele => ele.value === value)?.label;
            return {
              label: label,
              content: mapValue ?? value,
              hidden: false,
            };
          }
          if (isPlainObject(item)) {
            const field = item?.name ? form.getFieldState(item.name) : {};
            const value = item?.name ? values[item.name] : '';
            const label = isFunction(item.label)
              ? item.label(value, values, form as any)
              : item?.label ?? field?.title ?? item?.name;
            const formatValue = isFunction(item.formatter) ? item.formatter(value, values, form as any) : void 0;
            const hidden = isFunction(item.hidden) ? !!item.hidden(value, values, form as any) : !!item.hidden;
            const mapValue: string = (field?.dataSource || []).find(item => item.value === value)?.label;
            return {
              ...omit(item, ['name', 'formatter']),
              label,
              content: formatValue ?? mapValue ?? value,
              hidden,
              labelStyle: {
                ...(item.labelStyle || {}),
                // 无label情况
                display: label ? 'flex' : 'none',
              },
            };
          }
          return item;
        });
    });
  });

  const onEdit = (step: number, section?: string) => {
    formStep.setCurrent(step);
    if (section) {
      // @ts-ignore
      const address = form.query(section)?.addresses?.[0];
      if (address) {
        const dom = document.getElementById(getFormFieldId(address));
        dom?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };
  return {
    onEdit,
    form,
    values,
    labelWidth,
    detail: cloneDetail as unknown as ConfirmDetail['detail'],
  };
};

export default (props: Omit<CFormConfirmDetail, 'protocol'>) => {
  const { detail } = props;
  if (!detail) {
    return null;
  }
  const config = useFormDetail(props);
  return <Detail {...config} />;
};
