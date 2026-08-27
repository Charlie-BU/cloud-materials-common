import type { RuleFeedback } from '../CPopoverVerify/interface';
import type { FormItemProps, RulesProps } from '@arco-design/web-react/es/Form/interface';
/**
 * @title UseValidateRule
 */
export interface UseValidateRule extends RulesProps {
    /**
     * @zh 关键字 用于错误信息和规则匹配，默认为索引
     * @defaultValue 索引
     */
    key?: string | number;
}
/**
 * @title  UseValidateProps
 */
export interface UseValidateProps {
    /**
     * @zh 待验证的值
     */
    value: any;
    /**
     * @zh 待验证的规则
     */
    rules: UseValidateRule[];
    /**
     * @zh 失败时，是否阻塞之后的规则校验
     * @defaultValue false
     */
    stopAtFirstError?: boolean;
    /**
     * @zh 规则改变时，是否主动触发重新校验
     * @defaultValue false
     */
    validateOnRulesChange?: boolean;
}
export declare const schemaValidate: (rules: UseValidateRule[], field: Required<FormItemProps>['field'], value: unknown, stopAtFirstError?: boolean) => Promise<{
    warning: RuleFeedback[];
    error: RuleFeedback[];
}>;
export declare const useValidate: ({ value, rules, stopAtFirstError, validateOnRulesChange, }: UseValidateProps) => {
    valid: boolean;
    errors: RuleFeedback[];
    warnings: RuleFeedback[];
    isInit: boolean;
};
export default useValidate;
