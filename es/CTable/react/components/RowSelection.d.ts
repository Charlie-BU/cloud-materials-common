import React from 'react';
import type { Row } from '../../core';
export declare const RowSelectionContext: React.Context<Row<any>>;
export declare const RowSelectionProvider: React.FC<{
    rowKey: string;
}>;
