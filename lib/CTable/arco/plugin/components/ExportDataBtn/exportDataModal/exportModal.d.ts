import React from 'react';
import type { Table } from '../../../../../core';
import type { ExportDataBtnProps } from '../index';
import type { ExportDataModalRef } from '../../../../types/Toolbar';
export declare const ExportDataModal: React.ForwardRefExoticComponent<{
    table: Table;
    options: Omit<ExportDataBtnProps, 'tooltip'>;
} & React.RefAttributes<ExportDataModalRef>>;
