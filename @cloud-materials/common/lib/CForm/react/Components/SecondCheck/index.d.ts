import type { CFormBaseConfig } from '../../../interface';
import type { Form } from '@formily/core';
import type { CLocale } from '../../../../locales/default';
export declare const openSecondCheckModal: (params: {
    onOk?: (() => void) | undefined;
    form: Form;
    unMountCFormSecondCheck: CFormBaseConfig['unMountCFormSecondCheck'];
    locale: CLocale;
}) => void;
