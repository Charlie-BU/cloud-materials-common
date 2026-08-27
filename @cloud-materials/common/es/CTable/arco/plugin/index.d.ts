import type { Table, TablePlugin, ComponentConf } from '../../core';
export declare const globalComponents: ComponentConf[];
export declare class DefaultPlugin implements TablePlugin {
    apply(table: Table): void;
}
