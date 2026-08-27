import React from 'react';
import type { CConditionsGroupProps, ConditionGroup } from './interface';
import { Button } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
import CRelation from './CRelation';
import CAddButton from '../CAddButton';
import { isStringOrNumber } from './utils';
import CConditions from '.';
import classNames from 'classnames';

/**
 * 条件组(包含分组)
 *
 * @example
 * ```js
 * {
 *   relation: 'and',
 *   groups: [
 *     {
 *       relation: 'or',
 *       conditions: [
 *         { field: 'name', operator: 'eq', value: 'test' },
 *         { field: 'age', operator: 'eq', value: 28 },
 *       ],
 *     },
 *   ],
 * }
 * ```
 */

function CConditionsGroup<
  Condition = Record<string, any>,
  Relation extends string | number = string,
  ValType extends {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
  } = {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
  },
>(props: CConditionsGroupProps<Condition, Relation, ValType>): React.ReactElement {
  const {
    style,
    className,
    readonly = false,
    disabled = false,
    addText,
    addGroupText,
    deleteGroupText,
    value,
    onChange,
    conditionRender,
    conditionKey,
    newCondition,
    groupRender,
    groupKey,
    newGroup,
    relationOptions,
    minNum,
    maxNum,
    minGroupNum = 1,
    maxGroupNum = Infinity,
  } = props;

  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('conditions-group');

  if (readonly) {
    return (
      <div style={style} className={classNames(cssPrefix`container`, className)}>
        <CRelation readonly options={relationOptions} value={value?.relation} />
        <div className={cssPrefix`content`}>
          {value?.groups?.map((group, index) => (
            <div className={cssPrefix`wrapper`} key={groupKey?.(group) ?? index}>
              {groupRender ? (
                groupRender(group, undefined, index)
              ) : (
                <CConditions<Condition, Relation>
                  readonly
                  value={group}
                  conditionRender={(...args) => {
                    return conditionRender(...args, index);
                  }}
                  key={index}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={style} className={classNames(cssPrefix`container`, className)}>
      <CRelation
        disabled={disabled}
        options={relationOptions}
        value={value?.relation}
        onChange={val => onChange?.({ ...value, relation: val } as ValType)}
      />
      <div className={cssPrefix`content`}>
        {value?.groups?.map((group, index) => (
          <div className={cssPrefix`wrapper`} key={groupKey?.(group) ?? index}>
            {groupRender ? (
              groupRender(
                group,
                onChange
                  ? (val: ConditionGroup<Condition, Relation>) => {
                      const groups = [...value.groups];
                      groups.splice(index, 1, val);
                      onChange?.({ ...value, groups });
                    }
                  : undefined,
                index,
              )
            ) : (
              <CConditions<Condition, Relation>
                minNum={minNum}
                maxNum={maxNum}
                disabled={disabled}
                value={group}
                addText={addText}
                allowClear={false}
                onChange={
                  onChange
                    ? (val: ConditionGroup<Condition, Relation>) => {
                        const groups = [...value.groups];
                        groups.splice(index, 1, val);
                        onChange?.({ ...value, groups });
                      }
                    : undefined
                }
                conditionRender={(...args) => {
                  return conditionRender(...args, index);
                }}
                conditionKey={conditionKey}
                newCondition={newCondition}
              />
            )}
            {value.groups.length > minGroupNum && (
              <Button
                disabled={disabled}
                type="text"
                className={cssPrefix`delete`}
                onClick={() => {
                  const groups = [...value.groups];
                  groups.splice(index, 1);
                  onChange?.({ ...value, groups });
                }}
              >
                {deleteGroupText || locale.CConditions.deleteGroup}
              </Button>
            )}
          </div>
        ))}
        <CAddButton
          disabled={disabled || (value?.groups?.length ?? 0) > maxGroupNum}
          className={classNames(cssPrefix`add`, disabled && cssPrefix`disabled`)}
          type="primary"
          onClick={() => {
            onChange?.({
              ...value,
              groups: [
                ...(value?.groups ?? []),
                newGroup?.() ?? {
                  relation: isStringOrNumber(relationOptions?.[0])
                    ? relationOptions?.[0]
                    : relationOptions?.[0]?.value ?? 'and',
                  conditions: [newCondition?.() ?? {}],
                },
              ],
            } as ValType);
          }}
          text={addGroupText || locale.CConditions.addGroup}
        />
      </div>
    </div>
  );
}

export default CConditionsGroup;
