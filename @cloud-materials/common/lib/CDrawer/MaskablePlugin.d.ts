import React from 'react';
import type { FormType } from '../CForm';
import type { Plugin } from '../_factory/maskableComponent';
import type { CDrawerProps } from './interface';
import type MaskableFormDecorator from '../_factory/maskableComponent/components/MaskableFormDecorator';
export default class MaskablePlugin implements Plugin<CDrawerProps> {
    private extraHeaderRef;
    getExtraMaskableProps(oldProps: CDrawerProps): CDrawerProps;
    getFormProps(oldFormProps: React.ComponentProps<FormType<any, typeof MaskableFormDecorator>>): typeof oldFormProps;
}
