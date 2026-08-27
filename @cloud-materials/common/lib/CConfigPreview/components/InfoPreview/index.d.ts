import React from 'react';
import type { FormInstance } from '@arco-design/web-react';
import type { InfoPreviewProps } from '../../interface';
/**
 * 配置详情展示组件
 * @param props
 * @returns
 */
declare const InfoPreview: React.FC<InfoPreviewProps & {
    form: FormInstance<FormData, any, any>;
}>;
export default InfoPreview;
