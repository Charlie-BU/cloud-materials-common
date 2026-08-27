import { __awaiter, __generator, __read } from "tslib";
import { useState, useEffect, useRef } from 'react';
import { isArray, isEqual, isNumber, isUndefined, merge } from 'lodash-es';
import { useCConfigContext } from '../CConfigProvider';
import { useDebounceFn, useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { getPrice } from './utils/priceCalculator';
import { useSafeRace } from '@byted-c/storage.utils.safe-race';
/**
 * 处理 时长和数量 的逻辑
 * @param props
 * @returns
 */
function useMergeValue(props) {
    var locale = useCConfigContext().locale;
    var value = props.value, numConfig = props.numConfig, durationConfig = props.durationConfig;
    var processInValidNum = function (num, minNum, maxNum) {
        if (minNum === void 0) { minNum = 1; }
        if (maxNum === void 0) { maxNum = 15; }
        var isValid = true;
        var processedNum = num;
        if (num < minNum) {
            isValid = false;
            processedNum = minNum;
        }
        else if (num > maxNum) {
            isValid = false;
            processedNum = maxNum;
        }
        return {
            processedNum: processedNum,
            isValid: isValid,
        };
    };
    // 数量配置的合并
    var defaultNumConfig = {
        showNum: false,
        numLabel: locale.CFeeCalculator.defaultNumLabel,
        minNum: 1,
        maxNum: Infinity,
        initialNum: 1,
        numUnit: '',
        num: isNumber(numConfig === null || numConfig === void 0 ? void 0 : numConfig.initialNum) ? Number(numConfig === null || numConfig === void 0 ? void 0 : numConfig.initialNum) : 1,
    };
    var numConfigState = merge(defaultNumConfig, numConfig);
    // 月份配置的合并
    var defaultDurationConfig = {
        showDuration: false,
        initialDuration: 1,
        duration: isNumber(durationConfig === null || durationConfig === void 0 ? void 0 : durationConfig.initialDuration) ? Number(durationConfig === null || durationConfig === void 0 ? void 0 : durationConfig.initialDuration) : 1,
        durationLabel: locale.CFeeCalculator.defaultDurationLable,
        durationOptions: [],
    };
    var durationConfigState = merge(defaultDurationConfig, durationConfig);
    // 管理 当前的数量和时长
    var _a = __read(useState({
        num: isNumber(value === null || value === void 0 ? void 0 : value.num) ? Number(value === null || value === void 0 ? void 0 : value.num) : numConfigState.initialNum,
        duration: isNumber(value === null || value === void 0 ? void 0 : value.duration) ? Number(value === null || value === void 0 ? void 0 : value.duration) : durationConfigState.initialDuration,
    }), 2), stateValue = _a[0], setStateValue = _a[1];
    // value更新时执行
    useUpdateEffect(function () {
        // 如果value为undefined，也就是初始有值，后面变成undefiend，则更新内部值
        // 如果value不为undefied，在下一步的逻辑中直接返回value，不需要同步到stateValue
        if (value === undefined) {
            setStateValue({ num: numConfigState.initialNum, duration: durationConfigState.initialDuration });
        }
    }, [value]);
    var mergedValue = isUndefined(value)
        ? stateValue
        : Object.assign({ num: numConfigState.initialNum, duration: durationConfigState.duration }, value);
    var _b = processInValidNum(mergedValue.num, numConfigState.minNum, numConfigState.maxNum), isValid = _b.isValid, processedNum = _b.processedNum;
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
export default function useCFeeCalculator(_a) {
    var _this = this;
    var onChange = _a.onChange, onPriceChange = _a.onPriceChange, handleData = _a.handleData, loading = _a.loading, priceInfo = _a.priceInfo, _b = _a.formValues, formValues = _b === void 0 ? {} : _b, _c = _a.deps, deps = _c === void 0 ? [] : _c, numConfig = _a.numConfig, durationConfig = _a.durationConfig, _d = _a.debounceTime, debounceTime = _d === void 0 ? 500 : _d, _e = _a.enableCharge, enableCharge = _e === void 0 ? true : _e, thousandsSeparator = _a.thousandsSeparator, value = _a.value, enableRaceCondition = _a.enableRaceCondition, _f = _a.visible, visible = _f === void 0 ? true : _f;
    // 生成竞态安全的 handleData
    var safeHandleData = useSafeRace(handleData, {
        enabled: enableRaceCondition,
    });
    // handleData函数是否正在执行中
    var _g = __read(useState(true), 2), isCalculating = _g[0], setIsCalculating = _g[1];
    // 是否展示 “计算中” 字样
    var showLoading = isUndefined(loading) ? isCalculating : loading;
    // 时长和数量是否受控
    var isControlled = !isUndefined(value);
    // 价格是否受控
    var isPriceControlled = !isUndefined(priceInfo);
    // 保存当前的数量和时长
    var _h = __read(useMergeValue({
        value: value,
        numConfig: numConfig,
        durationConfig: durationConfig,
    }), 4), currentValue = _h[0], setCurrentValue = _h[1], numConfigState = _h[2], durationConfigState = _h[3];
    // 保存handleData函数返回的价格
    var _j = __read(useState(), 2), handleDataRes = _j[0], setHandleDataRes = _j[1];
    // 保存合并后的价格（最终显示的价格：处理价格的受控/非受控模式，处理默认值的合并）
    var _k = __read(useState([]), 2), priceInfoArr = _k[0], setPriceInfoArr = _k[1];
    var prevFormValues = useRef(formValues);
    // 价格预览配置的合并
    useEffect(function () {
        var _a;
        if (!enableCharge) {
            setPriceInfoArr([]);
            return;
        }
        var priceInfoArrState = (_a = priceInfo !== null && priceInfo !== void 0 ? priceInfo : handleDataRes) !== null && _a !== void 0 ? _a : [{}];
        setPriceInfoArr(priceInfoArrState);
        onPriceChange === null || onPriceChange === void 0 ? void 0 : onPriceChange(priceInfoArrState);
    }, [handleDataRes, priceInfo, enableCharge]);
    // 当时长或数量发生变化时，传入变化后到值并调用handleOnChange函数
    var handleOnChange = function (newConfig) {
        var mergedValue = Object.assign({}, currentValue, newConfig);
        // 非受控模式，设置当前值
        if (!isControlled) {
            setCurrentValue(mergedValue);
        }
        // 受控模式 & 非受控模式
        if (!isEqual(mergedValue, currentValue)) {
            onChange === null || onChange === void 0 ? void 0 : onChange(mergedValue); // 调用用户自定义onChange函数
        }
    };
    // 初始化时调用onChange函数
    useEffect(function () {
        onChange === null || onChange === void 0 ? void 0 : onChange(currentValue);
    }, []);
    // 调用handleData改变状态
    var getInfo = function (formValues, numConfigState, durationConfigState) { return __awaiter(_this, void 0, void 0, function () {
        var res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsCalculating(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    if (!(safeHandleData && enableCharge)) return [3 /*break*/, 3];
                    return [4 /*yield*/, safeHandleData({
                            formValues: formValues,
                            numConfig: numConfigState,
                            durationConfig: durationConfigState,
                        })];
                case 2:
                    res = _a.sent();
                    // 容错处理，避免接口传入错误的返回值，导致res.map挂掉
                    setHandleDataRes(isArray(res) ? res : [{}]);
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    e_1 = _a.sent();
                    setHandleDataRes([{}]);
                    throw e_1;
                case 5:
                    setIsCalculating(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // 创建唯一的debounce防抖函数
    var timeoutHandle = useDebounceFn(function (formValues, numConfigState, durationConfigState) { return getInfo(formValues, numConfigState, durationConfigState); }, { wait: debounceTime });
    // 当数量、时长发生变化时，重新调用handleData获取计费数据
    useDeepCompareEffect(function () {
        !isPriceControlled && visible && timeoutHandle.run(formValues, numConfigState, durationConfigState);
        return function () {
            timeoutHandle.cancel();
        };
    }, [currentValue, visible]);
    // formValues改变时，重新调用handleData获取计费数据
    useEffect(function () {
        // 仅当依赖项改变时触发更新
        var needUpdate = deps.some(function (depItem) {
            var _a;
            return formValues[depItem] !== ((_a = prevFormValues.current) === null || _a === void 0 ? void 0 : _a[depItem]);
        });
        prevFormValues.current = formValues;
        !isPriceControlled && needUpdate && timeoutHandle.run(formValues, numConfigState, durationConfigState);
    }, [formValues]);
    // 处理价格的计算
    var priceArr = priceInfoArr.map(function (priceInfoItem) {
        var priceDetail = getPrice({
            total: priceInfoItem.total,
            originTotal: priceInfoItem.originalTotal,
            precision: priceInfoItem.precision,
            discountPrecision: priceInfoItem.discountPrecision,
            thousandsSeparator: thousandsSeparator,
            hidePriceInfo: priceInfoItem.hidePriceInfo,
        });
        return { priceConfig: priceInfoItem, priceDetail: priceDetail };
    });
    // 是否显示免责声明
    var hasDisclaimer = priceArr.some(function (_a) {
        var priceDetail = _a.priceDetail;
        return priceDetail.isRefund;
    });
    var feeProps = {
        /** 是否显示“计算中”字样 */
        showLoading: showLoading,
        /** 是否展示免责声明 */
        hasDisclaimer: hasDisclaimer,
        /** 数量相关状态 */
        numConfigState: numConfigState,
        /** 时长相关状态 */
        durationConfigState: durationConfigState,
        /** 价格相关信息 */
        priceArr: priceArr,
    };
    var controls = {
        /** 处理 时长和数量的改变 */
        handleOnChange: handleOnChange,
    };
    return [feeProps, controls];
}
//# sourceMappingURL=hooks.js.map