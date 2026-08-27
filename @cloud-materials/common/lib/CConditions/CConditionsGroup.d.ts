import React from 'react';
import type { CConditionsGroupProps, ConditionGroup } from './interface';
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
declare function CConditionsGroup<Condition = Record<string, any>, Relation extends string | number = string, ValType extends {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
} = {
    relation: Relation;
    groups: ConditionGroup<Condition, Relation>[];
}>(props: CConditionsGroupProps<Condition, Relation, ValType>): React.ReactElement;
export default CConditionsGroup;
