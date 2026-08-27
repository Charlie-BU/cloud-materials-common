import type { CFeeTypeHooksProps } from './interface';
export declare const useCountDownConfig: (props: CFeeTypeHooksProps) => {
    statusName: string | undefined;
    nextStatusName: string | undefined;
    restTime: string;
    formattedRes: import("ahooks/lib/useCountDown").FormattedRes;
};
