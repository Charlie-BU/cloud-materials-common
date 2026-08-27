import React from 'react';
import type { CInfoSectionProps, CInfoSectionListProps, ItemProps } from './interface';
declare const InfoSection: ((props: CInfoSectionProps) => JSX.Element) & {
    List: import("../_factory/builtInComponent/interface").BuiltInType<(props: CInfoSectionListProps) => JSX.Element, {
        CEllipsis: typeof import("../CEllipsis").default;
        CInlineEdit: React.FC<import("..").CInlineEditProps<any>>;
        CCopy: React.FC<import("..").CCopyProps>;
        Word: React.FC<import("./Word").WordProps>;
    }>;
    Item: import("../_factory/builtInComponent/interface").BuiltInType<React.FC<ItemProps>, {
        CEllipsis: typeof import("../CEllipsis").default;
        CInlineEdit: React.FC<import("..").CInlineEditProps<any>>;
        CCopy: React.FC<import("..").CCopyProps>;
        Word: React.FC<import("./Word").WordProps>;
    }>;
    displayName: string;
};
export default InfoSection;
