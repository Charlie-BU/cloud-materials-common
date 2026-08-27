import type { ComponentConfig, ToolbarComponentConfig, R } from '../../types';
import type { Table } from '../Table';
export interface ToolbarConfig<T extends R = any, GlobalScopeType extends R = any> {
    component?: ToolbarComponentConfig<T, GlobalScopeType>;
    decorator?: ComponentConfig;
    initialValues?: Record<string, any>;
}
export declare class Toolbar<Form = any> {
    loading: boolean;
    initialized: boolean;
    mounted: boolean;
    unmounted: boolean;
    table: Table<any>;
    form: Form;
    filterValues: Record<string, any>;
    constructor(table: Table<any>);
    get config(): ToolbarConfig<any, any> | undefined;
    get component(): ToolbarComponentConfig<any, any> | undefined;
    get decorator(): ComponentConfig<any> | undefined;
    private initDataFromConfig;
    private makeObservable;
    private onInit;
    onMount(): void;
    onUnmount(): void;
    setFormInstance(form: Form): void;
    setLoading(loading: boolean): void;
    setFilterValues(filerValues: Record<string, any>, options?: {
        merge?: boolean;
    }): void;
    filter(filerValues?: Record<string, any>): void;
}
