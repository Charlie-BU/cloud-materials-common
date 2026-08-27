import type { FieldDataSource } from '@formily/core';
import type { ObjectType } from '../interface';
import type { FieldHandle, DepValues, FieldHandleParams } from './effect';
import Effect from './effect';
import { getBrotherField, getParentField, checkArrayDuplicates } from './utils';
type DepValuesChecker = (values: DepValues, params: FieldHandleParams) => boolean;
type DataSourceChecker = (currentValue: any, dataSource: FieldDataSource, dataKey: string, params: FieldHandleParams) => boolean;
type DataSourceHandleParams = {
    dataKey?: string;
    checker?: DataSourceChecker;
    validFilter?: (dataSource: FieldDataSource) => FieldDataSource;
};
interface HelperConfig {
    debounceWait?: number;
    enableRaceCondition?: boolean;
}
export declare class Helper<T extends ObjectType = ObjectType, D extends ObjectType = ObjectType> {
    effects: Effect<T, D>;
    constructor(config?: HelperConfig);
    /**
     * 把 fetchData 的返回值设置为dataSource
     * @param config
     * @param config.fetchResultSourceKey 元素从fetchResult取值的key，值为路径，兼容lodash.get方法
     * @param config.validFilter dataSource 的有效值过滤函数
     * @returns {FieldHandle} fieldCallback
     */
    private setDataSource;
    /**
     * 从字段的 dataSource 中取值并赋值给字段
     * @param {string} pathKey 必填元素取值的完整pathKey，值为路径，取值lodash.get(dataSource, pathKey)
     * @param {string} dataKey 元素取值的dataKey，默认为解析 pathKey 去掉第一级路径的值，即[x].y* -> y* (如果pathKey只有一级就为本身)
     * @returns {FieldHandle} fieldCallback
     */
    private setValueByDataSource;
    /**
     * 从字段的 dataSource 中(检查后)选中第一个元素赋值给字段
     * @param config
     * @param config.dataKey 第一个元素取值的dataKey，兼容lodash.get方法，默认值为value
     * @param config.checker 赋值前校验，返回true则为需要变更，默认为检查currValue无值或不是dataSource中的有效值则选中当前第一个
     * @param config.validFilter dataSource 的有效值过滤函数
     * @returns {FieldHandle} fieldCallback
     */
    private selectFirstByDataSource;
    /**
     * 检测依赖项，并设置该字段是否为disabled，若checker为true，则disabled
     * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
     * @returns {FieldHandle} fieldCallback
     */
    private checkDisableByDeps;
    /**
     * 检测依赖项，若checker为true，则清空
     * @param checker 检测的函数，参数为依赖字段depValues，默认检测第一项是否无值
     * @returns {FieldHandle} fieldCallback
     */
    private checkClearValueByDeps;
    fieldCallback: {
        setDataSource: (config?: {
            fetchResultSourceKey?: string | undefined;
            depValuesSourceKey?: string | undefined;
            validFilter?: ((dataSource: FieldDataSource) => FieldDataSource) | undefined;
        } | undefined) => FieldHandle<DepValues, any, any>;
        setValueByDataSource: (config: {
            pathKey: string;
        } & DataSourceHandleParams) => FieldHandle<DepValues, any, any>;
        selectFirstByDataSource: (config?: DataSourceHandleParams) => FieldHandle<DepValues, any, any>;
        checkDisableByDeps: (checker?: DepValuesChecker) => FieldHandle<DepValues, any, any>;
        checkClearValueByDeps: (checker?: DepValuesChecker) => FieldHandle<DepValues, any, any>;
    };
}
export declare const createHelper: <T extends ObjectType = ObjectType, D extends ObjectType = ObjectType>(config?: HelperConfig) => Helper<T, D>;
export default createHelper;
export { getParentField, getBrotherField, checkArrayDuplicates };
