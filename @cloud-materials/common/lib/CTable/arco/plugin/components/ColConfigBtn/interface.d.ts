/// <reference types="react" />
import type { Column } from '../../../../core/models/Column';
export interface CommonProps {
    columns: Column[];
    showReset: boolean;
    defaultVisibleMap: Record<string, boolean>;
    localStorageKey?: string;
    tooltip?: boolean | Record<string, boolean | React.ReactNode>;
    setLocalStorage: () => void;
    isColumnDisabled: (dataIndex: string) => boolean;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
