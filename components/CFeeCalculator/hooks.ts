import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { isArray, isEqual, isNumber, isUndefined, merge } from 'lodash-es';
import type {
  CFeeCalculatorHooksProps,
  DurationConfig,
  GetPriceRes,
  MergedDurationConfig,
  MergedNumConfig,
  NumConfig,
  PriceInfo,
  ValueType,
} from './interface';
import { useCConfigContext } from '../CConfigProvider';
import { useDebounceFn, useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { getPrice } from './utils/priceCalculator';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';

/**
 * 处理 时长和数量 的逻辑
 * @param props
 * @returns
 */
function useMergeValue(props: {
  value?: ValueType;
  numConfig?: NumConfig;
  durationConfig?: DurationConfig;
}): [ValueType, React.Dispatch<React.SetStateAction<ValueType>>, MergedNumConfig, MergedDurationConfig] {
  const { locale } = useCConfigContext();
  const { value, numConfig, durationConfig } = props;

  const processInValidNum = (num: number, minNum = 1, maxNum = 15): { processedNum: number; isValid: boolean } => {
    let isValid = true;
    let processedNum = num;
    if (num < minNum) {
      isValid = false;
      processedNum = minNum;
    } else if (num > maxNum) {
      isValid = false;
      processedNum = maxNum;
    }
    return {
      processedNum,
      isValid,
    };
  };

  // 数量配置的合并
  const defaultNumConfig: MergedNumConfig = {
    showNum: false,
    numLabel: locale.CFeeCalculator.defaultNumLabel,
    minNum: 1,
    maxNum: Infinity,
    initialNum: 1,
    numUnit: '',
    num: isNumber(numConfig?.initialNum) ? Number(numConfig?.initialNum) : 1,
  };
  const numConfigState: MergedNumConfig = merge(defaultNumConfig, numConfig);

  // 月份配置的合并
  const defaultDurationConfig: MergedDurationConfig = {
    showDuration: false,
    initialDuration: 1,
    duration: isNumber(durationConfig?.initialDuration) ? Number(durationConfig?.initialDuration) : 1,
    durationLabel: locale.CFeeCalculator.defaultDurationLable,
    durationOptions: [],
  };
  const durationConfigState: MergedDurationConfig = merge(defaultDurationConfig, durationConfig);

  // 管理 当前的数量和时长
  const [stateValue, setStateValue] = useState<ValueType>({
    num: isNumber(value?.num) ? Number(value?.num) : numConfigState.initialNum,
    duration: isNumber(value?.duration) ? Number(value?.duration) : durationConfigState.initialDuration,
  });

  // value更新时执行
  useUpdateEffect(() => {
    // 如果value为undefined，也就是初始有值，后面变成undefiend，则更新内部值
    // 如果value不为undefied，在下一步的逻辑中直接返回value，不需要同步到stateValue
    if (value === undefined) {
      setStateValue({ num: numConfigState.initialNum, duration: durationConfigState.initialDuration });
    }
  }, [value]);

  const mergedValue = isUndefined(value)
    ? stateValue
    : Object.assign({ num: numConfigState.initialNum, duration: durationConfigState.duration }, value);

  const { isValid, processedNum } = processInValidNum(mergedValue.num, numConfigState.minNum, numConfigState.maxNum);
  if (!isValid) {
    mergedValue.num = processedNum;
  }

  numConfigState.num = mergedValue.num;
  durationConfigState.duration = mergedValue.duration;

  return [mergedValue, setStateValue, numConfigState, durationConfigState];
}

/**
 * useCFeeCalculator Hooks
 * @param props
 * @returns
 */
export default function useCFeeCalculator({
  onChange,
  onPriceChange,
  handleData,
  loading,
  priceInfo,
  formValues = {},
  deps = [],
  numConfig,
  durationConfig,
  debounceTime = 500,
  enableCharge = true,
  thousandsSeparator,
  value,
  enableRaceCondition,
  visible = true,
}: CFeeCalculatorHooksProps) {
  // 生成竞态安全的 handleData
  const safeHandleData = useSafeRace(handleData, {
    enabled: enableRaceCondition,
  });
  // handleData函数是否正在执行中
  const [isCalculating, setIsCalculating] = useState<boolean>(true);
  // 是否展示 “计算中” 字样
  const showLoading = isUndefined(loading) ? isCalculating : loading;
  // 时长和数量是否受控
  const isControlled = !isUndefined(value);
  // 价格是否受控
  const isPriceControlled = !isUndefined(priceInfo);
  // 保存当前的数量和时长
  const [currentValue, setCurrentValue, numConfigState, durationConfigState] = useMergeValue({
    value,
    numConfig,
    durationConfig,
  });
  // 保存handleData函数返回的价格
  const [handleDataRes, setHandleDataRes] = useState<PriceInfo[]>();
  // 保存合并后的价格（最终显示的价格：处理价格的受控/非受控模式，处理默认值的合并）
  const [priceInfoArr, setPriceInfoArr] = useState<PriceInfo[]>([]);
  const prevFormValues = useRef(formValues);

  // 价格预览配置的合并
  useEffect(() => {
    if (!enableCharge) {
      setPriceInfoArr([]);
      return;
    }
    const priceInfoArrState = priceInfo ?? handleDataRes ?? [{}];
    setPriceInfoArr(priceInfoArrState);
    onPriceChange?.(priceInfoArrState);
  }, [handleDataRes, priceInfo, enableCharge]);

  // 当时长或数量发生变化时，传入变化后到值并调用handleOnChange函数
  const handleOnChange = (newConfig: Partial<ValueType>) => {
    const mergedValue = Object.assign({}, currentValue, newConfig);
    // 非受控模式，设置当前值
    if (!isControlled) {
      setCurrentValue(mergedValue);
    }
    // 受控模式 & 非受控模式
    if (!isEqual(mergedValue, currentValue)) {
      onChange?.(mergedValue); // 调用用户自定义onChange函数
    }
  };

  // 初始化时调用onChange函数
  useEffect(() => {
    onChange?.(currentValue);
  }, []);

  // 调用handleData改变状态
  const getInfo = async (
    formValues: Record<string, any>,
    numConfigState: MergedNumConfig,
    durationConfigState: MergedDurationConfig,
  ) => {
    setIsCalculating(true);
    try {
      if (safeHandleData && enableCharge) {
        const res = await safeHandleData({
          formValues,
          numConfig: numConfigState,
          durationConfig: durationConfigState,
        });
        // 容错处理，避免接口传入错误的返回值，导致res.map挂掉
        setHandleDataRes(isArray(res) ? res : [{}]);
      }
    } catch (e) {
      setHandleDataRes([{}]);
      throw e;
    } finally {
      setIsCalculating(false);
    }
  };

  // 创建唯一的debounce防抖函数
  const timeoutHandle = useDebounceFn(
    (formValues, numConfigState, durationConfigState) => getInfo(formValues, numConfigState, durationConfigState),
    { wait: debounceTime },
  );

  // 当数量、时长发生变化时，重新调用handleData获取计费数据
  useDeepCompareEffect(() => {
    !isPriceControlled && visible && timeoutHandle.run(formValues, numConfigState, durationConfigState);
    return () => {
      timeoutHandle.cancel();
    };
  }, [currentValue, visible]);

  // formValues改变时，重新调用handleData获取计费数据
  useEffect(() => {
    // 仅当依赖项改变时触发更新
    const needUpdate = deps.some(depItem => {
      return formValues[depItem] !== prevFormValues.current?.[depItem];
    });
    prevFormValues.current = formValues;
    !isPriceControlled && needUpdate && timeoutHandle.run(formValues, numConfigState, durationConfigState);
  }, [formValues]);

  // 处理价格的计算
  const priceArr: { priceConfig: PriceInfo; priceDetail: GetPriceRes }[] = priceInfoArr.map(priceInfoItem => {
    const priceDetail = getPrice({
      total: priceInfoItem.total,
      originTotal: priceInfoItem.originalTotal,
      precision: priceInfoItem.precision,
      discountPrecision: priceInfoItem.discountPrecision,
      thousandsSeparator,
      hidePriceInfo: priceInfoItem.hidePriceInfo,
    });
    return { priceConfig: priceInfoItem, priceDetail };
  });

  // 是否显示免责声明
  const hasDisclaimer = priceArr.some(({ priceDetail }) => priceDetail.isRefund);

  const feeProps = {
    /** 是否显示“计算中”字样 */
    showLoading,
    /** 是否展示免责声明 */
    hasDisclaimer,
    /** 数量相关状态 */
    numConfigState,
    /** 时长相关状态 */
    durationConfigState,
    /** 价格相关信息 */
    priceArr,
  };

  const controls = {
    /** 处理 时长和数量的改变 */
    handleOnChange,
  };

  return [feeProps, controls] as const;
}
