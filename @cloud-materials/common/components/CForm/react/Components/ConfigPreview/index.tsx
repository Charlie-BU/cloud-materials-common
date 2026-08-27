import { observer, useForm } from '@formily/react';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { has } from 'lodash-es';
import { Descriptions } from '@arco-design/web-react';
import type { Field, Form } from '@formily/core';
import type { DescriptionsProps } from '@arco-design/web-react';

const cssPrefix = classNamePrefixFactory('cform-preview');

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
  formatter?: (
    data: ConfigPreviewItemFormatterData,
    form: Form,
  ) => ConfigPreviewItemFormatterRes | undefined | null | void;
};

export type ConfigPreviewItem = ConfigPreviewItemCustomRender | ConfigPreviewItemBuiltInRender;

export interface ConfigPreviewComponentProps {
  config: ConfigPreviewItem[];
}

const ConfigPreviewComponent: React.FC<ConfigPreviewComponentProps> = observer(props => {
  const { config } = props;
  const form: Form = useForm();

  const renderItem = (item: ConfigPreviewItem) => {
    if (has(item, 'customRender')) {
      return (item as ConfigPreviewItemCustomRender).customRender?.();
    } else if (has(item, 'fieldIndex')) {
      const formatter = (item as ConfigPreviewItemBuiltInRender).formatter;
      const layout = (item as ConfigPreviewItemBuiltInRender).layout;
      const list: Record<string, ConfigPreviewItemFormatterRes> = {};
      (item as ConfigPreviewItemBuiltInRender).fieldIndex?.map((fieldKeyItem: string, index: number) => {
        const path = (item as ConfigPreviewItemBuiltInRender).fieldIndex[index];
        const field = form?.query(path)?.take() as Field;
        const formatterRes = formatter?.(
          {
            fieldKey: fieldKeyItem,
            title: field?.title,
            value: field?.value,
          },
          form,
        );
        if (!field || !formatterRes) return;
        list[fieldKeyItem] = {
          fieldKey: fieldKeyItem,
          title: formatterRes.title,
          value: formatterRes.value,
        };
      });
      const data = Object.values(list).map((item: ConfigPreviewItemFormatterData) => ({
        label: item.title,
        value: item.value,
      }));
      return (
        <div className={cssPrefix`item-detail`}>
          <Descriptions column={1} layout={layout} title={null} data={data} style={{ marginBottom: 10 }} />
        </div>
      );
    }
  };

  const renderComponent = (items?: ConfigPreviewItem[]) => {
    return items?.map((item, index) => {
      return (
        <div key={`${index}`} className={cssPrefix`item`}>
          {item.title ? (
            <div className={cssPrefix`item-title`}>
              <span>{item.title}</span>
            </div>
          ) : null}
          {renderItem(item)}
        </div>
      );
    });
  };

  return <div className={cssPrefix``}>{renderComponent(config)}</div>;
});

export default ConfigPreviewComponent;
