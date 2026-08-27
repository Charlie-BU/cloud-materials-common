import type { CFormConfig, CFormStepConfig } from '../../interface';
/**
 * 检查表单配置里是否有重复的path，有则进行提醒
 * @param config
 */
export declare const checkConfigRepeatedPath: (config?: CFormConfig | CFormStepConfig) => void;
