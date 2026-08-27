import { createEffectHook } from '@formily/core';
import type { CForm } from '../..';

export const onCFormDataChange = createEffectHook('onCFormDataChange', (data: any, form: CForm) => listener => {
  listener(data, form);
});
