import { Form, Popover } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import React from 'react';

import ComponentWrapper from './ComponentWrapper';
import { testId } from './constant';
import type { RowItemProps } from './interface';
import { disabledItemPopover, getInitDisableChange } from './util';
import { useCConfigContext } from '../CConfigProvider';
import { omit } from 'lodash-es';

const RowItem = (props: RowItemProps) => {
  const {
    field,
    items,
    controlProps = {
      disableChange: getInitDisableChange(items.map(i => i.label)),
      disableDelete: false,
      disableDeleteTip: '',
      rowDisabled: false,
      rowDisabledTip: '',
    },
    index,
    repeatValidator,
    requireValidator,
    remove,
    changeListValue,
    handleEditingDisableVerify,
    changeRuleValidator,
  } = props;
  const { getCPrefixCls } = useCConfigContext();
  const listEditorCls = getCPrefixCls('list-editor');
  const { disableChange, disableDelete, disableDeleteTip, rowDisabled, rowDisabledTip } = controlProps;

  return (
    <div className={`${listEditorCls}-list-item`} data-testid={testId.rowItem}>
      <Popover content={rowDisabledTip} position="right" disabled={!rowDisabled || !rowDisabledTip}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {items.map(tagItem => {
            const { popoverContent, arcoPopoverProps, popoverVerify = true } = tagItem;
            const { disabled = false, tip, disableRules, ...itemOptions } = disableChange[tagItem.label];
            const content = tip || popoverContent;
            return (
              <Popover
                content={content}
                disabled={disabledItemPopover(!!popoverVerify, rowDisabled, content)}
                key={tagItem.label}
                {...arcoPopoverProps}
              >
                <Form.Item
                  field={`${field}.${tagItem.label}`}
                  style={{ marginBottom: 0, width: tagItem.width, ...(itemOptions?.style || {}) }}
                  triggerPropName={tagItem.triggerPropName}
                  className={`${listEditorCls}-item`}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      validator: repeatValidator(tagItem.label, index),
                    },
                    requireValidator(tagItem.label),
                    ...(disableRules || rowDisabled ? [] : changeRuleValidator(index, tagItem.rules) || []),
                  ]}
                  {...omit(itemOptions, 'style')}
                >
                  <ComponentWrapper
                    itemOptions={itemOptions}
                    {...tagItem}
                    rules={disableRules ? undefined : changeRuleValidator(index, tagItem.rules)}
                    index={index}
                    disabled={disabled}
                    handleEditingDisableVerify={handleEditingDisableVerify}
                    changeListValue={changeListValue}
                  />
                </Form.Item>
              </Popover>
            );
          })}
          <Popover content={disableDeleteTip} disabled={!disableDelete || rowDisabled || !disableDeleteTip}>
            <div
              className={`${listEditorCls}-delete-btn`}
              onClick={() => {
                if (!disableDelete) {
                  remove(index);
                  handleEditingDisableVerify();
                }
              }}
              data-testid={testId.deleteButton}
            >
              <IconDelete className={classNames('c-m-icon', { disabled: disableDelete })} />
            </div>
          </Popover>
        </div>
      </Popover>
    </div>
  );
};

export default RowItem;
