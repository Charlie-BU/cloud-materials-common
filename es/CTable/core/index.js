import { Table } from './models';
export * from './models';
export * from './plugin';
export * from './effects';
export * from './types';
export * from './shared';
export var createTable = function (tableConfig) {
    return new Table(tableConfig);
};
//# sourceMappingURL=index.js.map