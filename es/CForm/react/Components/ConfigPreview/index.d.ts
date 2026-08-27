import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { Form } from '@formily/core';
import type { DescriptionsProps } from '@arco-design/web-react';
export interface ConfigPreviewItemFormatterData {
    fieldKey: string;
    title: string | JSX.Element;
    value: any;
}
export interface ConfigPreviewItemFormatterRes {
    fieldKey: string;
    title: ReactNode;
    value: ReactNode;
}
export type ConfigPreviewItemCustomRender = {
    title: ReactNode;
    customRender?: () => ReactElement;
};
export type ConfigPreviewItemBuiltInRender = {
    title: ReactNode;
    fieldIndex: string[];
    layout?: DescriptionsProps['layout'];
    formatter?: (data: ConfigPreviewItemFormatterData, form: Form) => ConfigPreviewItemFormatterRes | undefined | null | void;
};
export type ConfigPreviewItem = ConfigPreviewItemCustomRender | ConfigPreviewItemBuiltInRender;
export interface ConfigPreviewComponentProps {
    config: ConfigPreviewItem[];
}
declare const ConfigPreviewComponent: React.FC<ConfigPreviewComponentProps>;
export default ConfigPreviewComponent;
