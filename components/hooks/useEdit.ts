import { useBoolean } from 'ahooks';
import { useMemo, useState } from 'react';
import type { UseValidateProps } from './useValidate';
import useValidate from './useValidate';

export interface UseEditProps<T = string> {
  value: T;
  initEditable?: boolean;
  rules?: UseValidateProps['rules'];
  stopAtFirstError?: boolean;
}

export function useEdit<T = string>({
  value,
  initEditable = false,
  rules = [],
  stopAtFirstError = false,
}: UseEditProps<T>) {
  const [submitting, { setTrue: startSubmitting, setFalse: endSubmission }] = useBoolean(false);
  const [editing, { setTrue: startEditing, setFalse: endEditing }] = useBoolean(initEditable);
  const [editValue, setEditValue] = useState(value);
  const { valid, errors } = useValidate({ value: editValue, rules, stopAtFirstError });

  const state = useMemo(
    () => ({
      submitting,
      editing,
      editValue,
      valid,
      errors,
    }),
    [submitting, editing, editValue, valid, errors],
  );

  const handleSubmit = async (onSubmit: (value: T) => void) => {
    if (!valid) {
      return;
    }
    startSubmitting();
    try {
      await onSubmit(editValue);
      endEditing();
      endSubmission();
    } catch (error) {
      endSubmission();
      return Promise.reject(error);
    }
  };

  const handleCancel = (onCancel?: () => void) => {
    typeof onCancel === 'function' && onCancel();
    endEditing();
  };

  const enterEditing = () => {
    setEditValue(value);
    startEditing();
  };

  const controls = { startEditing: enterEditing, setEditValue, handleSubmit, handleCancel };

  return [state, controls] as const;
}
