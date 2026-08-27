import type {
  ObjectValueType,
  ValueChangeReason,
  CBatchPasteInputValueType,
  UseCBatchPasteInputProps,
} from './interface';
import { formatStr2Arr, hasSeparatorInStr } from './utils';
import useMergeValue from '../hooks/useMergeValue';
import { isObject, isUndefined, uniqBy } from 'lodash-es';

export const useCBatchPasteInput = (props: UseCBatchPasteInputProps) => {
  const { separator, onChange, labelInValue, value, defaultValue, inputValue } = props;
  const [current, setCurrent] = useMergeValue<ObjectValueType[]>([], {
    defaultValue: defaultValue ? formatValue(defaultValue) : undefined,
    value: value ? formatValue(value) : undefined,
  });
  const [currentInputValue, setCurrentInputValue] = useMergeValue('', {
    value: inputValue,
  });

  // 调用用户输入的onChange
  function customOnChangeHandler(value: ObjectValueType[], reason: ValueChangeReason) {
    onChange?.(labelInValue ? value : value.map(item => item.value), reason);
  }

  // 调用用户传入的onSplit
  function customOnSplit(pasteValue: ObjectValueType[], current: ObjectValueType[], finalValue: ObjectValueType[]) {
    props?.onSplit?.(
      labelInValue ? pasteValue : pasteValue.map(item => item.value),
      labelInValue ? current : current.map(item => item.value),
      labelInValue ? finalValue : finalValue.map(item => item.value),
    );
  }

  function valueChangeHandler(value: ObjectValueType[]) {
    if (isUndefined(props?.value)) {
      setCurrent(value);
    }
  }

  function splitStrBySeparator(str: string): ObjectValueType[] {
    // 根据分隔符将输入字符串处理为数组，再格式化为ObjectValueType类型
    const result = formatValue(formatStr2Arr(str, separator));
    // 处理多次复制的情况，将重复数据进行合并
    const finalValue: ObjectValueType[] = uniqBy([...formatValue(current), ...result], 'value'); // 合并去重;
    // 调用用户传入的onSplit事件
    customOnSplit(result, current, finalValue);
    return finalValue;
  }

  // 将输入的CBatchPasteInputValueType[] 转换为 ObjectValueType[]
  function formatValue(value: CBatchPasteInputValueType[]): ObjectValueType[] {
    return value.map(item => {
      return isObject(item)
        ? {
            ...item,
            label: item.label,
            value: item.value,
          }
        : { label: item, value: item };
    });
  }

  const cBatchPasteStatus = {
    value: current,
    inputValue: currentInputValue,
  };

  const cBatchPasteStatusControl = {
    /** 切割字符串 并格式化为标准形式 最后与当前控制值融合后返回 */
    splitStrBySeparator: splitStrBySeparator,
    /** 将输入的CBatchPasteInputValueType[] 转换为 ObjectValueType[] */
    formatValue: formatValue,
    /** 处理输入事件,输入根据分隔符切割 */
    handleInputChange: (inputValue: string) => {
      // 输入有变化时触发
      setCurrentInputValue(inputValue);
      if (hasSeparatorInStr(inputValue, separator)) {
        const finalValue = splitStrBySeparator(inputValue);
        valueChangeHandler(finalValue);
        setCurrentInputValue('');
        // 调用用户传入的onChange
        customOnChangeHandler(finalValue, 'add');
      }
    },
    /** 处理粘贴事件，粘贴时根据分隔符切割 */
    handlePaste: (e: ClipboardEvent) => {
      const str = e.clipboardData?.getData('text/plain') ?? '';
      e.preventDefault();
      const finalValue = splitStrBySeparator(str);
      setCurrentInputValue('');
      valueChangeHandler(finalValue);
      // 调用用户传入的onChange
      customOnChangeHandler(finalValue, 'add');
      return finalValue;
    },
    /** 处理onChange事件 */
    handleOnChange: (v: CBatchPasteInputValueType[]) => {
      const value = formatValue(v);
      valueChangeHandler(value);
      setCurrentInputValue('');
      // 调用用户传入的onChange
      customOnChangeHandler(value, 'add');
    },
    setValue: (v: ObjectValueType[]) => valueChangeHandler(v),
    setInputValue: (v: string) => setCurrentInputValue(v),
  };

  return [cBatchPasteStatus, cBatchPasteStatusControl] as const;
};
