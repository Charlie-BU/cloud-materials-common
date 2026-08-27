import type { PropsWithChildren } from 'react';
import type { CCombineSearchItem, UseCCombineSearchControl, UseCCombineSearchCustomProps } from '../../interface';
type InlineSearchViewItemProps = Pick<UseCCombineSearchControl, 'updateParams' | 'updateState'> & Pick<UseCCombineSearchCustomProps, 'enableEdit' | 'popoverClassName' | 'popoverStyle' | 'popoverTriggerProps'> & {
    value: any;
    item: CCombineSearchItem;
    itemCls: string;
};
declare const InlineItem: ({ children, item, itemCls, value, enableEdit, popoverClassName, popoverStyle, popoverTriggerProps, updateParams, updateState, }: PropsWithChildren<InlineSearchViewItemProps>) => JSX.Element;
export default InlineItem;
