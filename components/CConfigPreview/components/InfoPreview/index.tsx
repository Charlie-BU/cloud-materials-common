import React, { useContext } from 'react';
import { Descriptions, Form } from '@arco-design/web-react';
import type { FormInstance } from '@arco-design/web-react';
import type { InfoPreviewProps } from '../../interface';
import { CConfigContext } from '../../../CConfigProvider';
import classNamePrefixFactory from '../../../_utils/classNamePrefixFactory';
import { comPrefix, listContainerId } from '../../utils';
import type { DataType } from '@arco-design/web-react/es/Descriptions/interface';
import { get } from 'lodash-es';
import useMergeProps from '@arco-design/web-react/es/_util/hooks/useMergeProps';

const cssPrefix = classNamePrefixFactory(comPrefix);

const testId = {
  infoContainer: cssPrefix`info`,
};

/**
 * 配置详情展示组件
 * @param props
 * @returns
 */
const InfoPreview: React.FC<InfoPreviewProps & { form: FormInstance<FormData, any, any> }> = props => {
  const { useCssPrefix, cComponentConfig } = useContext(CConfigContext);
  const infoPreviewProps = cComponentConfig?.CConfigPreview?.infoPreview ?? {};
  const cssPrefix = useCssPrefix(comPrefix);
  const form = props.form;
  const { formatter, fieldIndex, title, layout } = useMergeProps(props, {}, infoPreviewProps);
  const data: DataType = [];
  // 监听表单内部字段值的变动
  const values = Form.useWatch(fieldIndex, form);
  // 如果用户传了formatter，则对每一个字段调用formatter，formatter的返回值作为展示值，formatter返回值为空则不展示当前字段
  if (formatter) {
    fieldIndex?.forEach((fieldKeyItem: string) => {
      const formatterRes = formatter({
        fieldKey: fieldKeyItem,
        title: fieldKeyItem, // ARCO Form 配置的Label无法通过form实例再次获取到，需要用户自己记住label的配置
        value: get(values, fieldKeyItem),
      });
      if (!formatterRes) return;
      data.push({
        label: formatterRes.title,
        value: formatterRes.value,
      });
    });
  }
  // 如果用户没有传formatter，展示所有字段的默认值
  else {
    fieldIndex?.forEach((fieldKeyItem: string) => {
      data.push({
        label: fieldKeyItem,
        value: get(values, fieldKeyItem),
      });
    });
  }

  return (
    <div className={cssPrefix`info`} data-cy={testId.infoContainer} data-testid={testId.infoContainer}>
      <div className={cssPrefix`title`}>{title}</div>
      <div className={cssPrefix`info-list`} id={listContainerId}>
        <Descriptions layout={layout} column={1} title={null} data={data} />
      </div>
    </div>
  );
};

export default InfoPreview;
