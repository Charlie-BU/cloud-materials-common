import React, { useRef } from 'react';
import { Grid } from '@arco-design/web-react';
import type { ItemProps } from './interface';
import { testId, labelWidthMap } from './constant';
import classNames from 'classnames';
import CEllipsis from '../CEllipsis';
import { isString, isNil, isBoolean, isArray, isNumber } from 'lodash-es';
import { useBuiltIn } from '../_factory/builtInComponent';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

const InfoItem: React.FC<ItemProps> = (props: ItemProps) => {
  const { useCssPrefix, cComponentConfig } = useCConfigContext();
  const {
    label,
    layout = 'horizon',
    content,
    labelWidth = 'normal', // 6字高频，默认值80px
    labelStyle,
    contentStyle,
    itemStyle,
    columnNum = 0,
    auto = true,
    children = null,
    defaultEmptyContent = '-',
    hidden = false,
    visible = true,
    arcoLabelColProps,
    arcoContentColProps,
    arcoRowProps,
    cEllipsisProps,
    enableEllipsis = false,
    extraContent,
  } = useMergeProps(props, {}, cComponentConfig?.['CInfoSection.Item'] ?? {});
  const cssPrefix = useCssPrefix('info-section');
  const LABEL_CLASS_NAME = cssPrefix`label`;
  const ref = useRef<HTMLDivElement>(null);
  const visibleItem = visible === true ? 'visible' : 'hidden';

  const { renderBuiltIn } = useBuiltIn();

  const isValidChildren = (children: any): boolean => {
    if (!isArray(children)) {
      return React.isValidElement(children) || isString(children) || isNumber(children);
    }
    const res: boolean[] = React.Children.map(children, child => {
      return React.isValidElement(child) || isString(child) || isNumber(children);
    });
    return res.reduce((pre, cur) => pre && cur, true);
  };

  const getContent = () => {
    if (!isValidChildren(children)) {
      if (!(isNil(content) || isBoolean(content) || content === '')) {
        if (enableEllipsis) {
          return <CEllipsis {...cEllipsisProps}>{renderBuiltIn(content)!}</CEllipsis>;
        }
        return renderBuiltIn(content, {
          commonProps: { style: { maxWidth: '100%' } },
          defaultPropsMap: {
            CInlineEdit: {
              style: { margin: '2px 0px 2px 2px' },
            },
          },
        });
      }
      return defaultEmptyContent;
    }
    if (enableEllipsis) {
      return <CEllipsis {...cEllipsisProps}>{children}</CEllipsis>;
    }
    return children;
  };

  const getContentClassName = (basicClass: string): string => {
    return `${
      layout === 'horizon' ? cssPrefix`${basicClass}` : classNames(cssPrefix`${basicClass}`, cssPrefix`margin-top-4px`)
    }`;
  };

  const getLabelWidth = (labelWidth: ItemProps['labelWidth']) => {
    return isString(labelWidth) ? labelWidthMap[labelWidth] : labelWidth;
  };

  return !hidden ? (
    <Grid.Row
      {...arcoRowProps}
      className={classNames(cssPrefix`${layout}`, props.className)}
      style={{ visibility: visibleItem, ...itemStyle }}
      div={arcoLabelColProps === undefined && arcoContentColProps === undefined && arcoRowProps === undefined}
      data-testid={testId.item}
    >
      <Grid.Col
        {...arcoLabelColProps}
        className={classNames(LABEL_CLASS_NAME, `${LABEL_CLASS_NAME}${columnNum}`)}
        style={auto ? { width: getLabelWidth(labelWidth), ...labelStyle } : { ...labelStyle }}
      >
        {label}
      </Grid.Col>
      <Grid.Col
        {...arcoContentColProps}
        className={cssPrefix`content-wrapper`}
        style={layout === 'vertical' ? { overflow: 'visible', visibility: visibleItem, ...itemStyle } : {}}
      >
        <div className={getContentClassName('content')} style={{ ...contentStyle }}>
          {getContent()}
        </div>
        <div ref={ref} className={getContentClassName('rest-content')}>
          {renderBuiltIn(extraContent, {
            commonProps: { style: { maxWidth: '100%' } },
            defaultPropsMap: {
              CInlineEdit: {
                style: { margin: '2px 0px 2px 2px' },
              },
            },
          })}
        </div>
      </Grid.Col>
    </Grid.Row>
  ) : (
    <></>
  );
};

export default InfoItem;
