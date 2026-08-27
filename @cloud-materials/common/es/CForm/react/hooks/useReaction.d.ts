import type { FieldDataSource } from '@formily/core';
import type { CFieldProps } from '../../interface';
export declare const useReactionProps: (props: CFieldProps) => {
    _title: any;
    _description: any;
    _hidden: boolean | undefined;
    _visible: boolean | undefined;
    _display: string | undefined;
    _pattern: string | undefined;
    _readOnly: boolean | undefined;
    _readPretty: boolean | undefined;
    _data: boolean | undefined;
    _disabled: boolean | undefined;
    _editable: boolean | undefined;
    _dataSource: FieldDataSource | undefined;
};
export declare const useComponent: (props: CFieldProps, noReactions?: boolean) => any[];
export declare const useDecorator: (props: CFieldProps, noReactions?: boolean) => any[] | undefined;
