import type { PopoverProps } from '@arco-design/web-react';
import { Modal } from '@arco-design/web-react';
import type { ConfirmProps } from '@arco-design/web-react/es/Modal/confirm';
import type { CAgreementProps } from '../CAgreement/interface';
type CopyStatics = Pick<typeof Modal, 'confirm' | 'error' | 'info' | 'warning' | 'success'>;
type PromiseStatics = {
    [key in keyof CopyStatics]: <T extends any = boolean>(props: CustomConfirmProps) => Promise<T> & ReturnType<CopyStatics[key]>;
};
export interface CustomConfirmProps extends ConfirmProps {
    agreement?: string | Partial<CAgreementProps>;
    popoverOnOk?: PopoverProps | false;
}
export declare const copyStaticsFromArcoModal: <T extends {
    closeAll: () => void;
}>(CModal: T) => T & PromiseStatics;
export {};
