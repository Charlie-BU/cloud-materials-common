import type { AlertProps } from '@arco-design/web-react';
import React from 'react';
import type { AlertContentType, MaskableAlertProps } from '../interface';
export interface ChildrenRendererProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    contentTop?: AlertContentType;
    contentBottom?: AlertContentType;
    children: React.ReactElement<{
        children: React.ReactChild;
    }>;
    disableScrollShadow?: boolean;
    /** 顶部有内容时，应当和下面内容有一定距离，此时需要挂载的class */
    contentClassNameWhenContentTop?: string;
    maxHeight?: number;
    onMount?: (scrollElement: HTMLDivElement, maxHeight?: number) => void;
}
export declare const ChildrenRenderer: React.ForwardRefExoticComponent<ChildrenRendererProps & React.RefAttributes<HTMLDivElement>>;
export declare const isMaskableAlertType: (contentTop: AlertContentType) => contentTop is MaskableAlertProps;
export declare function renderAlert(alert?: AlertContentType, options?: {
    ref?: React.RefObject<HTMLElement>;
    extraProps?: AlertProps;
}): React.ReactNode;
