import type { OperationList, Operation, ExtraOperation } from './interface';
import { set } from 'lodash-es';

/**
 * 删除不可见的 operation
 * @param operation
 */
export const removeInvisibleOperation = (
  operation: Operation,
  index: string,
  parentKey?: string,
): ExtraOperation | undefined => {
  const _opertaion = { ...operation };
  if (operation.visible === false) {
    return undefined;
  } else if (operation.subOperation) {
    _opertaion.subOperation = [];
    const visibleOperation = operation.subOperation?.filter(o => o?.visible !== false);
    if (visibleOperation?.length > 0) {
      visibleOperation.forEach((item, i) => {
        const key = `${parentKey ? `${parentKey}.` : ''}${makeKey(`${index}${i}`, operation.name)}`;
        const result = removeInvisibleOperation(item, `${index}${i}`, key);
        if (result) {
          _opertaion?.subOperation?.push(result);
        }
      });
      if (_opertaion?.subOperation?.length === 0) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
  const key = `${parentKey ? `${parentKey}.` : ''}${makeKey(index, operation.name)}`;
  set(_opertaion, 'key', key);
  set(_opertaion, 'index', index);

  return _opertaion as ExtraOperation;
};

/**
 *
 * 对操作进行分组
 * 并过滤掉 visible 是 false 的操作
 * 例如：[1,2,3,[4],5,[6,7,8], 9] => [[1,2,3], [4], [5], [6,7,8], [9]]
 * @param operation
 */

export function groupOperation(operation?: OperationList): ExtraOperation[][] {
  const newOperation: ExtraOperation[][] = [];
  let tempGroup: ExtraOperation[] = [];
  operation?.forEach((item, index) => {
    if (item instanceof Array) {
      item.forEach((sub, i) => {
        const temp = removeInvisibleOperation(sub, `${index}${i}`);
        if (temp) {
          tempGroup.push(temp);
        }
      });
      if (tempGroup?.length > 0) {
        newOperation.push(tempGroup);
        tempGroup = [];
      }
    } else {
      const temp = removeInvisibleOperation(item, `${index}`);
      if (temp) {
        tempGroup.push(temp);
      }
    }
    const next = operation[index + 1];
    if (next instanceof Array && tempGroup.length > 0) {
      newOperation.push(tempGroup);
      tempGroup = [];
    }
  });

  if (tempGroup.length > 0) {
    newOperation.push(tempGroup);
  }

  return newOperation;
}

/**
 * 从二维数组中取出前n个保持后面的结构不变
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [[3],[4,5]]
 * @param operation
 * @param displayNum
 */
export function splitOperation(
  operation: ExtraOperation[][],
  displayNum: number,
): [ExtraOperation[], ExtraOperation[][]] {
  const poped = operation.reduce((prev, current) => {
    return prev.length < displayNum ? prev.concat(current.splice(0, displayNum - prev.length)) : prev;
  }, []);

  return [poped, operation.filter(o => o.length)];
}

/**
 * 从二维数据中拆出外露的操作，和收入在 dropdown 的操作
 * 例： [[1],[2,3],[4,5]] 取出前2个后结果为 [1, 2], [[3],[4,5]]
 */
export function getDisplayOperation(operations: OperationList = [], displayNum: number) {
  const groupedOpt = groupOperation(operations);
  if (displayNum > 0) {
    const [outsideOperation, menuOperation] = splitOperation(groupedOpt, displayNum);
    return {
      // 未被收入菜单的操作项
      outsideOperation,
      // 菜单中的操作项
      menuOperation,
    };
  }

  return {
    outsideOperation: [],
    menuOperation: groupedOpt,
  };
}

// 如果那么不存在的时候，使用 index 作为 key
export function makeKey(index: string, str?: string) {
  if (str) {
    return str;
  }

  return `operation-${index}`;
}

/**
 * 最大展示数下，显示的分组分割线的数量
 * @param menuOperations
 * @param maxMenuOperationNum
 */
export function getGroupNumInMaxNum(menuOperations: ExtraOperation[][], maxMenuOperationNum: number) {
  let num = 0;
  menuOperations.reduce((prev, current, index) => {
    if (current?.length <= maxMenuOperationNum - prev && menuOperations[index + 1]) {
      num++;
      return (prev += current?.length);
    } else {
      return (prev += current.length);
    }
  }, 0);
  return num;
}
