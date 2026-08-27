import React from 'react';
import type { CListEditorProps } from './interface';
import classNames from 'classnames';
import { useCListEditor } from './hooks';
import { Form } from '@arco-design/web-react';
import CAddButton from '../CAddButton';
import { formatInitValue, getAddDefaultValue } from './util';
import RowItem from './RowItem';
import { useCConfigContext } from '../CConfigProvider';
import { testId, builtInMap } from './constant';
import createBuiltInComponent from '../_factory/builtInComponent';

const CListEditorComponent: React.FC<CListEditorProps> = props => {
  const { style, className, fieldName, maxHeight = 402, initValue, items, addBtnText } = props;
  const [
    { itemsControl, listValue, addProps },
    {
      addItem,
      removeItem,
      handleEditingDisableVerify,
      changeListValue,
      resetListValue,
      repeatValidator,
      requireValidator,
      changeRuleValidator,
    },
  ] = useCListEditor(props);
  const { disableAdd, disableAddTip, addBtnSuffix } = addProps;
  const { locale, getCPrefixCls } = useCConfigContext();
  const listEditorCls = getCPrefixCls('list-editor');

  return (
    <div style={style} className={classNames(`${listEditorCls}`, className)}>
      <Form.List field={fieldName} {...(initValue ? { initialValue: formatInitValue(initValue) } : {})}>
        {(fields, { add, remove }) => {
          if (fields.length !== listValue.length) {
            // form操作clear or setValue，导致值不匹配，需要重新计算listValue，及内部的控制状态
            resetListValue(fields.length);
          }
          return (
            <div className={`${listEditorCls}-content`} data-cy={testId.root}>
              <div className={`${listEditorCls}-list`} style={{ maxHeight: maxHeight - 32 }}>
                {fields.map((it, index) => (
                  <RowItem
                    key={it.key}
                    field={it.field}
                    items={items}
                    index={index}
                    controlProps={itemsControl[index]}
                    remove={(idx: number) => {
                      remove(idx);
                      removeItem(idx);
                    }}
                    handleEditingDisableVerify={handleEditingDisableVerify}
                    listValue={listValue}
                    changeListValue={changeListValue}
                    repeatValidator={repeatValidator}
                    requireValidator={requireValidator}
                    changeRuleValidator={changeRuleValidator}
                  />
                ))}
              </div>
              <div className={`${listEditorCls}-add-btn`}>
                <CAddButton
                  htmlType="button"
                  arcoPopoverProps={{ content: disableAddTip, disabled: !disableAdd }}
                  style={{ marginRight: 8 }}
                  disabled={disableAdd}
                  onClick={() => {
                    add(getAddDefaultValue(items));
                    addItem();
                  }}
                  type="primary"
                  text={addBtnText ?? locale.CListEditor.addBtnText}
                />
                <span className={`${listEditorCls}-add-btn-text`}>{addBtnSuffix}</span>
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

CListEditorComponent.displayName = 'CListEditor';

const CListEditor = createBuiltInComponent(CListEditorComponent, builtInMap);

export default CListEditor;
