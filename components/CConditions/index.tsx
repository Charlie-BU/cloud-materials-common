import React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash-es';
import { Button } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import type { CConditionsProps } from './interface';
import { useCConfigContext } from '../CConfigProvider';
import CRelation from './CRelation';
import CAddButton from '../CAddButton';
import CConditionGroup from './CConditionsGroup';

const DivComp = (props: any) => <div {...omit(props, ['value', 'onChange', 'index'])} />;
/**
 * 单个条件组 XConditions.Group
 *
 * @example
 * ```js
 * {
 *   relation: 'and',
 *   conditions: [
 *     { field: 'name', operator: 'eq', value: 'test' },
 *     { field: 'age', operator: 'eq', value: 28 },
 *   ],
 * }
 * ```
 */
function CConditions<
  Condition = Record<string, any>,
  Relation extends string | number = string,
  ValueType extends { relation: Relation; conditions: Condition[] } = {
    relation: Relation;
    conditions: Condition[];
  },
>(props: CConditionsProps<Condition, Relation, ValueType>): React.ReactElement {
  const {
    style,
    className,
    readonly = false,
    disabled = false,
    allowClear = true,
    addText,
    clearText,
    newCondition,
    value = { relation: 'and', conditions: [newCondition?.() ?? {}] } as ValueType,
    onChange,
    conditionRender,
    conditionKey,
    relationOptions,
    Container = DivComp,
    ConditionWrapper = DivComp,
    minNum = 1,
    maxNum = Infinity,
  } = props;
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('conditions');
  if (readonly) {
    return (
      <div className={classNames(cssPrefix`container`, className)} style={style}>
        <CRelation readonly options={relationOptions} value={value.relation} />
        <div className={classNames(cssPrefix`content`, cssPrefix`view`)}>
          {value.conditions.map((item, index) => (
            <div className={cssPrefix`view-item`} key={index}>
              {conditionRender(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={classNames(cssPrefix`container`, className)} style={style}>
      <CRelation
        disabled={disabled}
        options={relationOptions}
        value={value.relation}
        onChange={val => {
          onChange?.({ ...value, relation: val });
        }}
      />
      <Container className={cssPrefix`content`} value={value} onChange={onChange}>
        {value.conditions?.map((item, index) => (
          <ConditionWrapper className={cssPrefix`condition-wrapper`} key={conditionKey?.(item) ?? index} index={index}>
            {conditionRender(
              item,
              onChange
                ? val => {
                    const conditions = [...value.conditions];
                    conditions[index] = val;
                    onChange({ ...value, conditions });
                  }
                : undefined,
              index,
            )}
            {value.conditions?.length > minNum && (
              <div
                className={classNames(cssPrefix`condition-delete`, disabled && 'disabled')}
                onClick={() => {
                  if (!disabled) {
                    const conditions = [...value.conditions];
                    conditions.splice(index, 1);
                    onChange?.({ ...value, conditions });
                  }
                }}
              >
                <IconDelete
                  className={classNames('c-m-icon', { disabled: disabled }, cssPrefix`condition-delete-icon`)}
                />
              </div>
            )}
          </ConditionWrapper>
        ))}
        <div>
          <CAddButton
            disabled={disabled || value.conditions?.length >= maxNum}
            className={classNames(cssPrefix`condition-add`, disabled && cssPrefix`disabled`)}
            type="primary"
            onClick={() => {
              onChange?.({
                ...value,
                conditions: [...(value.conditions ?? []), newCondition?.() ?? {}],
              });
            }}
            text={addText || locale.CConditions.add}
          />
          {allowClear && value.conditions?.length > minNum && (
            <Button
              disabled={disabled}
              type="text"
              className={cssPrefix`condition-clear`}
              onClick={() => {
                onChange?.({ ...value, conditions: Array(minNum).fill(newCondition?.() ?? {}) });
              }}
            >
              {clearText || locale.CConditions.clear}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

CConditions.Relation = CRelation;
CConditions.Group = CConditionGroup;
CConditions.displayName = 'CConditions';
export default CConditions;
