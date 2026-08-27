import type { Sorter, Filter, Formatter, Summary, ExpandRow, RowSelection, AutoWidth, Resize, JSXComponent, ComponentProps, FetcherOptions, FetcherResponse } from '../types';
import type { Table } from '../models';
import type { RaceConditionResolver } from '../../arco/plugin/raceConditionResolver';
export interface TablePlugin {
    apply: (table: Table) => void;
}
export type ComponentConf = {
    scope: string;
    name: string;
    component: JSXComponent;
    defaultComponentProps?: ComponentProps;
};
export type MixinOptions = {
    sorter?: Sorter[];
    filter?: Filter[];
    formatter?: Formatter[];
    summary?: Summary[];
    components?: ComponentConf[];
    expandRow?: ExpandRow[];
    rowSelection?: RowSelection[];
    autoWidth?: AutoWidth[];
    resize?: Resize[];
    raceConditionResolver?: RaceConditionResolver<FetcherOptions<any>, FetcherResponse<any>>;
};
export declare class Plugin {
    sorter: {
        [key: string]: Sorter;
    };
    filter: {
        [key: string]: Filter;
    };
    formatter: {
        [key: string]: Formatter;
    };
    summary: {
        [key: string]: Summary;
    };
    components: {
        [scope: string]: {
            [name: string]: ComponentConf;
        };
    };
    expandRow: {
        [key: string]: ExpandRow;
    };
    rowSelection: {
        [key: string]: RowSelection;
    };
    autoWidth: {
        [key: string]: AutoWidth;
    };
    resize: {
        [key: string]: Resize;
    };
    raceConditionResolver: RaceConditionResolver<FetcherOptions<any>, FetcherResponse<any>>;
    pluginMap: {
        [pluginName: string]: TablePlugin;
    };
    table: Table;
    constructor(table: Table);
    static globalUse(name: string, plugin: TablePlugin): void;
    static globalMixin(options: {
        components?: ComponentConf[];
    }): void;
    static getComponent(name: string, options?: {
        scope?: string;
        logError?: boolean;
    }): ComponentConf | undefined;
    private assignTarget;
    private getMergedPluginContent;
    init(): void;
    use(name: string, plugin: TablePlugin): void;
    mixin(options: MixinOptions): void;
    getComponent(name: string | JSXComponent | undefined, options: {
        scope: string;
        logError?: boolean;
    }): {
        Component: ((props: any) => {} | null) | undefined;
        defaultComponentProps: {};
    } | {
        Component?: undefined;
        defaultComponentProps?: undefined;
    } | {
        Component: JSXComponent<any>;
        defaultComponentProps: import("../types").R | undefined;
    };
    getFormatter(formatter?: string | Formatter | Formatter['formatterFn']): Formatter;
    getSorter(sorter?: string | Sorter | Sorter['sorterFn']): Sorter;
    getFilter(filter?: string | Filter): Filter;
    getSummary(summary?: string | Summary): Summary;
    getExpandRow(expandRow?: string | ExpandRow): ExpandRow;
    getRowSelection(rowSelection?: string | RowSelection): RowSelection;
    getAutoWidth(autoWidth?: string | AutoWidth): AutoWidth;
    getResize(resize: string | Resize): Resize;
    getRaceConditionResolver(): RaceConditionResolver<FetcherOptions<any, any>, FetcherResponse<any, any>>;
}
