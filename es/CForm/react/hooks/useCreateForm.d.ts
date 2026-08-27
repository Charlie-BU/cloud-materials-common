import type { CForm, CFormBaseConfig, ObjectType } from '../../interface';
export declare function useCreateForm<T extends ObjectType = any, D extends ObjectType = any>(config?: CFormBaseConfig<T, D>, outerForm?: CForm): {
    loading: boolean;
    error: boolean;
    form: CForm<T, D> | undefined;
    run: () => void;
    defaultStep: number;
};
