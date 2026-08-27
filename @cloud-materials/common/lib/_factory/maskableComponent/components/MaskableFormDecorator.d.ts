import type { FormStepDecoratorProps } from '@storage-fe/formily-arco/es/FormStep';
import React from 'react';
import type { StepsProps } from '@arco-design/web-react';
export interface MaskableFormDecoratorProps extends FormStepDecoratorProps {
    stickyStep?: boolean;
    stepsProps?: StepsProps;
    footerContainer?: () => HTMLElement | null;
    topContainer?: () => HTMLElement | null;
    headerContainer?: () => HTMLElement | null;
}
declare const MaskableFormDecorator: React.FC<MaskableFormDecoratorProps>;
export default MaskableFormDecorator;
