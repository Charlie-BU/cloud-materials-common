import type { CStatusConfig, CStatusProps } from './interface';
export declare const useBuildIn: () => {
    defaultStatusMap: Record<string, CStatusConfig>;
    mergeProps: (props: CStatusProps) => CStatusProps;
    statusCls: string;
};
