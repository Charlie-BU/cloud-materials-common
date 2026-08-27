import type { ObjectValueType, CBatchPasteInputValueType, UseCBatchPasteInputProps } from './interface';
export declare const useCBatchPasteInput: (props: UseCBatchPasteInputProps) => readonly [{
    value: ObjectValueType[];
    inputValue: string;
}, {
    /** 切割字符串 并格式化为标准形式 最后与当前控制值融合后返回 */
    splitStrBySeparator: (str: string) => ObjectValueType[];
    /** 将输入的CBatchPasteInputValueType[] 转换为 ObjectValueType[] */
    formatValue: (value: CBatchPasteInputValueType[]) => ObjectValueType[];
    /** 处理输入事件,输入根据分隔符切割 */
    handleInputChange: (inputValue: string) => void;
    /** 处理粘贴事件，粘贴时根据分隔符切割 */
    handlePaste: (e: ClipboardEvent) => ObjectValueType[];
    /** 处理onChange事件 */
    handleOnChange: (v: CBatchPasteInputValueType[]) => void;
    setValue: (v: ObjectValueType[]) => void;
    setInputValue: (v: string) => void;
}];
