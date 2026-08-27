import React from 'react';
import { Checkbox, Grid } from '@arco-design/web-react';
import CEllipsis from '../../../../../../../CEllipsis';
import { intersection } from 'lodash-es';
import { useCConfigContext } from '../../../../../../../CConfigProvider';

const { Col, Row } = Grid;
const CheckboxGroup = Checkbox.Group;

interface Props {
  value?: string[];
  items: { title: string; key: string }[];
  disabledKeys?: string[];
  prefixCls: string;
  onChange?: (keys: string[]) => void;
}

export const CheckBoxList: React.FC<Props> = ({ value = [], items = [], disabledKeys = [], prefixCls, onChange }) => {
  const { locale } = useCConfigContext();

  const checkedAll = value.length === items.length;

  // 选择某一个 checkbox
  const onCheckboxGroupChange = (checkList: string[]) => {
    onChange?.(checkList);
  };

  // 全选/取消全选
  const onChangeAll = (checkedAll: boolean) => {
    // 获取禁用或者非禁用的 key
    const getKeys = (isDisabled = true) => {
      return items
        .filter(item => (isDisabled ? disabledKeys.includes(item.key) : !disabledKeys.includes(item.key)))
        .map(item => item.key);
    };
    // 找出禁用的 key 的值
    const preCheckecAndDisabled = intersection(value, getKeys(true));
    if (checkedAll) {
      // 全选的值 = 非禁用的 key + 禁用的key的值
      onChange?.([...getKeys(false), ...preCheckecAndDisabled]);
    } else {
      // 取消全选的值 = 禁用的key的值（即取消全选不能影响禁用的 key）
      onChange?.(preCheckecAndDisabled);
    }
  };

  return (
    <div className={`${prefixCls}-checkbox-list`}>
      <div className={`${prefixCls}-section-title`}>
        <span>{locale.CTable.exportContent}</span>
      </div>
      <Checkbox onChange={onChangeAll} checked={checkedAll} indeterminate={!checkedAll && value.length > 0}>
        {locale.CTable.selectAll}
      </Checkbox>
      <CheckboxGroup value={value} onChange={onCheckboxGroupChange}>
        <Row gutter={16}>
          {items.map(item => (
            <Col key={item.key} span={8}>
              <div className={`${prefixCls}-checkbox-wrapper`}>
                <Checkbox disabled={disabledKeys.includes(item.key)} value={item.key} />
                <CEllipsis content={item.title} />
              </div>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
    </div>
  );
};
