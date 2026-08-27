import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { CListEditorHooksProps, Value, ItemControl, CListEditorRules } from './interface';
import type { CPopoverVerifyRule } from '../CPopoverVerify/interface';

import {
  getInitItemControl,
  getInitDisableChange,
  changeItemControl,
  repeatLabelValidator,
  needCheck,
  getItemValuesWidthOutIndex,
  getEmptyItemValues,
} from './util';
import { set, omit, cloneDeep } from 'lodash-es';
import { useCConfigContext } from '../CConfigProvider';

export const useCListEditor = (_props: CListEditorHooksProps) => {
  const {
    onEditingDisableVerify,
    maxLen,
    addBtnSuffix,
    initValue,
    items,
    repeatValidatorLabel = [],
    repeatMessage,
    requireLabel,
    requireMessage,
  } = _props;
  const [disableAdd, setDisableAdd] = useState(false);
  const [realAddBtnSuffix, setRealAddBtnSuffix] = useState('');
  const [disableAddTip, setDisableAddTip] = useState('');
  const [itemsControl, setItemControl] = useState<ItemControl[]>(
    getInitItemControl(initValue, items?.map(item => item.label) || []),
  );
  const listValue = useRef<Value[]>(initValue?.map(i => i.value) || []);
  const { locale } = useCConfigContext();
  const listEditorProps: {
    addProps: { disableAdd: boolean; disableAddTip: React.ReactNode; addBtnSuffix: string };
    listValue: Value[];
    itemsControl: ItemControl[];
  } = {
    addProps: {
      disableAdd,
      addBtnSuffix: realAddBtnSuffix,
      disableAddTip:
        _props.disableAddTip ??
        disableAddTip ??
        `${locale.CListEditor.disableAddTipLeft} ${maxLen} ${locale.CListEditor.disableAddTipRight}`,
    },
    listValue: listValue.current,
    itemsControl,
  };

  const getAddBtnSuffix = ({
    addBtnSuffix,
    maxLen,
    num,
  }: {
    addBtnSuffix?: ReactNode | ((num: number) => ReactNode);
    maxLen?: number;
    num: number;
  }) => {
    if (typeof addBtnSuffix === 'function' && maxLen) {
      return addBtnSuffix(maxLen - num); // 还剩xxx个bb
    } else if (!addBtnSuffix && maxLen) {
      return `${locale.CListEditor.addBtnSuffixLeft}${maxLen - listValue.current.length}${
        locale.CListEditor.addBtnSuffixRight
      }`; // 还剩xxx个标签
    } else if (typeof addBtnSuffix === 'function') {
      return addBtnSuffix(0);
    } else {
      return addBtnSuffix;
    }
  };

  useEffect(() => {
    if (maxLen) {
      setDisableAdd(listValue.current.length >= maxLen);
    }
    setRealAddBtnSuffix(() => getAddBtnSuffix({ addBtnSuffix, maxLen, num: listValue.current.length }));
  }, [listValue.current?.length, maxLen]);

  const handleEditingDisableVerify = () => {
    const control = onEditingDisableVerify?.(listValue.current);
    if (control) {
      const { disableAdd, disableAddTip } = control;
      setDisableAdd(old => disableAdd ?? old);
      setDisableAddTip(old => disableAddTip ?? old);
      /** 将 itemsControl 中每个元素的disableDelete改变 */
      setItemControl(old => {
        let oldV = old;
        if (old.length !== listValue.current.length) {
          oldV = getInitItemControl(listValue.current, items?.map(item => item.label) || []);
        }
        return changeItemControl(
          oldV,
          omit(control, 'disableAdd', 'disableAddTip'),
          items.map(i => i.label),
        );
      });
    }
  };

  const addItemControl = () => {
    setItemControl(old =>
      old.concat([
        {
          disableChange: getInitDisableChange(items.map(i => i.label)),
          disableDelete: false,
          disableDeleteTip: '',
          rowDisabled: false,
          rowDisabledTip: '',
        },
      ]),
    );
  };

  const removeItem = (index: number) => {
    const remove = (val: (Value | ItemControl)[]) => val.filter((_, idx) => idx !== index);
    setItemControl(remove as (val: ItemControl[]) => ItemControl[]);
    listValue.current = remove(listValue.current) as Value[];
  };
  const changeListValue = (path: string, val: any) => {
    listValue.current = set(listValue.current, path, val);
  };
  const resetListValue = (length: number) => {
    listValue.current = listValue.current.slice(0, length);
    setItemControl(old => {
      let oldV = old;
      if (old.length !== listValue.current.length) {
        oldV = getInitItemControl(listValue.current, items?.map(item => item.label) || []);
      }
      return changeItemControl(
        oldV,
        {},
        items.map(i => i.label),
      );
    });
    handleEditingDisableVerify();
  };

  const repeatValidator = (
    label: string,
    index: number,
  ): ((value: any, callback: (error?: React.ReactNode) => void) => void) => {
    return (v, cb) =>
      repeatLabelValidator(
        v,
        cb,
        needCheck(repeatValidatorLabel, label),
        getItemValuesWidthOutIndex(listValue.current, label, index),
        repeatMessage ?? locale.CListEditor.repeatLabel,
      );
  };

  // 在rules里面的validator传入其他的值，满足关联校验场景。
  const changeRuleValidator = (index: number, rules?: CListEditorRules[]): CPopoverVerifyRule[] => {
    if (!rules) return [];
    const innerRules = cloneDeep(rules);
    for (const rule of innerRules) {
      if (rule.validator) {
        const originValidator: (
          value: any | undefined,
          callback: (error?: ReactNode) => void,
          arr: Record<string, any>,
          all: Record<string, any>[],
          idx: number,
        ) => void = rule.validator;
        rule.validator = (val: any, cb: (error?: ReactNode) => void) => {
          originValidator(val, cb, listValue.current?.[index], listValue.current, index);
        };
      }
    }
    return innerRules as CPopoverVerifyRule[];
  };

  const requireValidator = (label: string) => {
    return {
      required: requireLabel?.includes(label) || requireLabel === label,
      message: requireMessage ?? locale.CListEditor.requireMessage,
    };
  };

  const addItem = () => {
    addItemControl();
    listValue.current = listValue.current.concat(getEmptyItemValues(items));
  };

  return [
    listEditorProps,
    {
      addItem,
      removeItem,
      changeListValue,
      resetListValue,
      handleEditingDisableVerify,
      repeatValidator,
      requireValidator,
      changeRuleValidator,
    },
  ] as const;
};
