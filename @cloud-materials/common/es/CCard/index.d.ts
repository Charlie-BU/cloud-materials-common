import React from 'react';
import type { CCardProps } from './interface';
export declare const components: {
    Grid: React.ForwardRefExoticComponent<import("@arco-design/web-react").GridProps & React.RefAttributes<unknown>> & {
        Col: React.ForwardRefExoticComponent<import("@arco-design/web-react").ColProps & React.RefAttributes<unknown>>;
        Row: React.ForwardRefExoticComponent<import("@arco-design/web-react").RowProps & React.RefAttributes<unknown>>;
        GridItem: React.ForwardRefExoticComponent<import("@arco-design/web-react").GridItemProps & React.RefAttributes<unknown>> & {
            __ARCO_GRID_ITEM__: boolean;
        };
    };
    Card: React.ForwardRefExoticComponent<import("@arco-design/web-react").CardProps & React.RefAttributes<unknown>> & {
        Meta: React.ForwardRefExoticComponent<import("@arco-design/web-react").CardMetaProps & React.RefAttributes<unknown>>;
        Grid: React.ForwardRefExoticComponent<import("@arco-design/web-react").CardGridProps & React.RefAttributes<unknown>>;
    };
    GridItem: React.ForwardRefExoticComponent<import("@arco-design/web-react").GridItemProps & React.RefAttributes<unknown>> & {
        __ARCO_GRID_ITEM__: boolean;
    };
};
export declare const testId: {
    container: string;
    extra: string;
    title: string;
    icon: string;
};
declare const CCard: React.FC<CCardProps> & {
    LinkListItem: React.FC<import("./interface").CLinkListItemProps>;
    displayName: string;
};
export default CCard;
