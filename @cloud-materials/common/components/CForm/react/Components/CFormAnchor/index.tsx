import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import type { AnchorProps } from '@arco-design/web-react';
import { Anchor } from '@arco-design/web-react';
import { observer, useForm } from '@formily/react';
import { CFormPrefixName } from '../../../const';
import type { FormPathPattern, GeneralField } from '@formily/core';
import { isPlainObject } from 'lodash-es';
import { getFormFieldId } from '../../../shared/utils';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';

const AnchorLink = Anchor.Link;

const cssPrefix = classNamePrefixFactory('c-form-anchor');

export interface CFormAnchorProps extends AnchorProps {
  anchorInfo: {
    isOn: boolean;
    exclude?: FormPathPattern[];
    /**
     * 生成的锚点层级深度
     * @default 1
     */
    level?: number;
  };
  anrchorScollOffset?: number;
  /**
   * 当前为第几步
   */
  current: number;
}

interface AnchorNode {
  id: string;
  title: ReactNode | string;
  subNodes?: AnchorNode[];
}

export const CFormAnchor = observer((props: CFormAnchorProps) => {
  const { scrollContainer, anrchorScollOffset = 0, anchorInfo, current } = props;

  const { level = 1 } = anchorInfo;
  const form = useForm();
  const [cFormAnchor, setCFormAnchor] = useState<AnchorNode[]>([]);

  // 显示的字段长度发生改变重新计算
  const visibleLength = form.query(`${CFormPrefixName}.*`).reduce<number>((acc, field) => {
    if (field.display === 'visible') {
      return acc + 1;
    }
    return acc;
  }, 0);

  useEffect(() => {
    const [step] = form
      .query(`${CFormPrefixName}.*`)
      .reduce<GeneralField[]>((acc: GeneralField[], field: GeneralField) => {
        if (field.data && field.data.isStep && field.data.stepIndex === current) {
          if ((isPlainObject(anchorInfo) && anchorInfo.isOn) || anchorInfo) {
            acc.push(field);
          }
        }
        return acc;
      }, []);

    // 递归解析字段
    const buildAnchorTree = (field: GeneralField, anchorLevel: number) => {
      if (anchorLevel === 0) return;
      const subField = field.form.query(`${field.address.toString()}.*`).reduce<GeneralField[]>((acc, subField) => {
        // 只添加显示的字段以及直接子代
        if (subField.display === 'visible' && subField.parent.address.toString() === field.address.toString()) {
          acc.push(subField);
        }
        return acc;
      }, []);

      const anchorNode: AnchorNode[] = [];

      subField.forEach(item => {
        // 获取每一步排除的字段
        const isExclude =
          isPlainObject(anchorInfo) &&
          anchorInfo.exclude &&
          (anchorInfo.exclude.includes(item.path.toString()) || anchorInfo.exclude.includes(item.address.toString()));
        if (!isExclude) {
          const subAnchorNode = buildAnchorTree(item, anchorLevel - 1);
          if (item.title) {
            anchorNode.push({
              id: getFormFieldId(item.address.toString()),
              title: item.title,
              subNodes: subAnchorNode,
            });
          }
        }
      });
      return anchorNode;
    };
    if (step) {
      const anchorNode = buildAnchorTree(step, level) || [];
      setCFormAnchor(anchorNode);
    } else {
      setCFormAnchor([]);
    }
  }, [current, form, visibleLength]);

  // 递归渲染锚点
  const renderAnchorLink = (anchorNodes?: AnchorNode[]) => {
    return anchorNodes?.map(item => {
      return (
        <AnchorLink key={item.id} href={`#${item.id}`} title={item.title}>
          {renderAnchorLink(item.subNodes)}
        </AnchorLink>
      );
    });
  };

  if (cFormAnchor.length === 0) {
    return null;
  }

  return (
    <Anchor
      className={cssPrefix``}
      targetOffset={100}
      boundary={anrchorScollOffset}
      scrollContainer={`#${scrollContainer}`}
      hash={false}
      onSelect={() => {}}
    >
      {renderAnchorLink(cFormAnchor)}
    </Anchor>
  );
});
