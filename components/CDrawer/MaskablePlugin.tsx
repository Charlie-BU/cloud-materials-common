import React from 'react';
import type { FormType } from '../CForm';
import type { Plugin } from '../_factory/maskableComponent';
import type { CDrawerProps } from './interface';
import type MaskableFormDecorator from '../_factory/maskableComponent/components/MaskableFormDecorator';

export default class MaskablePlugin implements Plugin<CDrawerProps> {
  private extraHeaderRef = React.createRef<HTMLDivElement>();

  getExtraMaskableProps(oldProps: CDrawerProps): CDrawerProps {
    return {
      ...oldProps,
      extraHeader: (
        <>
          {oldProps.extraHeader}
          <div ref={this.extraHeaderRef} />
        </>
      ),
    };
  }

  getFormProps(oldFormProps: React.ComponentProps<FormType<any, typeof MaskableFormDecorator>>): typeof oldFormProps {
    const { decorator } = oldFormProps;
    if (decorator?.[1]) {
      decorator[1] = {
        ...decorator[1],
        headerContainer: () => this.extraHeaderRef.current?.parentElement ?? null,
      };
    }

    return oldFormProps;
  }
}
