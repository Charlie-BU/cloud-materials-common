import React from 'react';
import type { CConditionsProps } from './interface';
import CRelation from './CRelation';
import CConditionGroup from './CConditionsGroup';
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
declare function CConditions<Condition = Record<string, any>, Relation extends string | number = string, ValueType extends {
    relation: Relation;
    conditions: Condition[];
} = {
    relation: Relation;
    conditions: Condition[];
}>(props: CConditionsProps<Condition, Relation, ValueType>): React.ReactElement;
declare namespace CConditions {
    var Relation: typeof CRelation;
    var Group: typeof CConditionGroup;
    var displayName: string;
}
export default CConditions;
