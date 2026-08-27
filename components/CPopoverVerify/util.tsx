import type { RulesProps } from '@arco-design/web-react/es/Form/interface';
import React from 'react';
import {
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconCheckCircleFilled,
} from '@arco-design/iconbox-react-ve-o-design';

export const ICONS = {
  init: <IconCheckCircleFilled />,
  success: <IconCheckCircleFill />,
  error: <IconCloseCircleFill />,
};

export const formatRules = <T extends RulesProps & { key?: string | number }>(
  rules: T[],
): (T & { key: string | number })[] => {
  return rules.map((rule, index) => {
    return {
      ...rule,
      key: (rule?.key ?? index) as string | number,
    };
  });
};
