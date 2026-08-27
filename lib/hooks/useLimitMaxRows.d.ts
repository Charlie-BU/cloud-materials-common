interface UseLimitMaxRowsProps {
    target: any;
    maxRows?: number;
    manual?: boolean;
}
/**
 * 限制最大展示行数 Hook，传入父元素和最大展示行数进行计算，将最大高度设置在父元素上
 */
declare const useLimitMaxRows: (props: UseLimitMaxRowsProps) => {
    isOver: boolean;
    maxHeight: number | undefined;
    setMaxHeight: () => void;
};
export default useLimitMaxRows;
