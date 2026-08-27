import type { FC } from 'react';
import type { CModalProps } from '../../../../../CModal/interface';
import type { CommonProps } from './interface';
interface Props extends CommonProps {
    CModalProps?: CModalProps;
}
export declare const ModalType: FC<Props>;
export {};
