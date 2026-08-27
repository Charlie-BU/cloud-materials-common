import React from 'react';
import { Grid } from '@arco-design/web-react';
import ModuleEditor from './ModuleEditor';
import type { CInfoSectionProps, CInfoSectionListProps, ItemProps, CInfoSectionData } from './interface';
import { useCInfoSectionLayout } from './hooks';
import { DEFAULT_COLUMN, testId, builtInMap } from './constant';
import classNames from 'classnames';
import InfoItem from './InfoItem';
import createBuiltInComponent from '../_factory/builtInComponent';
import { calcSpan, formatListData, formatSectionChildren } from './util';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

const InfoSectionItem: React.FC<CInfoSectionListProps & CInfoSectionData> = props => {
  const { useCssPrefix, cComponentConfig } = useCConfigContext();
  const {
    title,
    splitItemList,
    layout = 'horizon',
    colNumber = DEFAULT_COLUMN,
    sectionStyle,
    wrapperStyle,
    labelWidth,
    itemStyle,
    labelStyle,
    contentStyle,
    auto,
    arcoLabelColProps,
    arcoContentColProps,
    arcoRowProps,
    onModuleEditorClick,
    moduleEditor,
    hidden = false,
    visible = true,
    className,
    direction = 'row',
  } = useMergeProps(props, {}, cComponentConfig?.['CInfoSection.Item'] ?? {}, [props.colNumber]);
  const cssPrefix = useCssPrefix('info-section');
  const visibleItem = visible === true ? 'visible' : 'hidden';

  return !hidden ? (
    <div className={classNames(cssPrefix`section`, className)} style={{ ...sectionStyle, visibility: visibleItem }}>
      {title && (
        <div className={cssPrefix`title`} data-testid={testId.title}>
          {title}
          {(onModuleEditorClick || moduleEditor) && <ModuleEditor onClick={onModuleEditorClick} {...moduleEditor} />}
        </div>
      )}
      {direction === 'row' ? (
        <div className={cssPrefix`row-wrapper`} style={wrapperStyle}>
          {splitItemList?.map((itemList, index) => {
            return (
              <Grid.Row key={index} className={classNames(cssPrefix`row`)} gutter={60}>
                {itemList?.map((infoItem, key, arr) => {
                  const attrList = Object.assign(
                    {},
                    {
                      layout,
                      itemStyle,
                      labelStyle,
                      labelWidth,
                      contentStyle,
                      auto,
                      arcoLabelColProps,
                      arcoContentColProps,
                      arcoRowProps,
                      visible,
                    },
                    infoItem,
                  );
                  const colSpan = calcSpan({ arr, key, infoItem, colNumber: colNumber as number });

                  return (
                    <Grid.Col key={key} span={colSpan}>
                      <InfoItem {...attrList} columnNum={index} />
                    </Grid.Col>
                  );
                })}
              </Grid.Row>
            );
          })}
        </div>
      ) : (
        <div className={cssPrefix`column-wrapper`} style={wrapperStyle}>
          {splitItemList?.map((itemList, index) => {
            return (
              <div key={index} className={classNames(cssPrefix`column`, cssPrefix`column-${colNumber}`)}>
                {itemList?.map((infoItem, key) => {
                  const attrList = Object.assign(
                    {},
                    {
                      layout,
                      itemStyle,
                      labelStyle,
                      labelWidth,
                      contentStyle,
                      auto,
                      arcoLabelColProps,
                      arcoContentColProps,
                      arcoRowProps,
                      visible,
                    },
                    infoItem,
                  );
                  return <InfoItem key={key} {...attrList} columnNum={index} />;
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

const InfoSectionList = (props: CInfoSectionListProps) => {
  const { useCssPrefix, cComponentConfig } = useCConfigContext();
  const { listData, noMargin, className, style, labelWidth, ...restProps } = useMergeProps(
    props,
    {},
    cComponentConfig?.['CInfoSection.List'] ?? {},
  );
  const { layout, colNumber, direction } = useCInfoSectionLayout({
    layout: restProps.layout,
    colNumber: restProps.colNumber,
    direction: restProps.direction,
    responsive: restProps.responsive,
  });
  const rows = formatListData({ listData, colNumber: colNumber as number, direction });
  const cssPrefix = useCssPrefix('info-section');

  return (
    <div
      className={noMargin ? className : classNames(cssPrefix`wrapper`, className)}
      style={style}
      data-cy={testId.container}
      data-testid={testId.container}
    >
      {rows?.map((infoSectionData, index) => {
        return (
          <InfoSectionItem
            key={index}
            // 正常应该是单个的配置会覆盖全局的配置，需要显示声明都覆盖了哪些公共的配置
            {...props}
            {...infoSectionData}
            labelWidth={infoSectionData.labelWidth || labelWidth}
            layout={infoSectionData.layout || layout}
            colNumber={(infoSectionData.colNumber || colNumber) as number}
          />
        );
      })}
    </div>
  );
};

const InfoSectionComponent = (props: CInfoSectionProps) => {
  const { useCssPrefix, cComponentConfig } = useCConfigContext();
  const {
    title,
    // layout = 'horizon',
    // colNumber = DEFAULT_COLUMN,
    sectionStyle,
    wrapperStyle,
    itemStyle,
    labelWidth,
    labelStyle,
    contentStyle,
    auto,
    children,
    // direction = 'row',
    onModuleEditorClick,
    moduleEditor,
    arcoLabelColProps,
    arcoContentColProps,
    arcoRowProps,
    style,
    hidden = false,
    visible = true,
    noMargin = false,
    className,
    ...restProps
  } = useMergeProps(props, {}, cComponentConfig?.['CInfoSection'] ?? {});
  const {
    layout = 'horizon',
    colNumber = DEFAULT_COLUMN,
    direction = 'row',
  } = useCInfoSectionLayout({
    layout: restProps.layout,
    colNumber: restProps.colNumber,
    direction: restProps.direction,
    responsive: restProps.responsive,
  });
  const childrenList = formatSectionChildren({ children, direction, colNumber: colNumber as number });
  const visibleItem = visible === true ? 'visible' : 'hidden';
  const cssPrefix = useCssPrefix('info-section');

  return !hidden ? (
    <div
      {...restProps}
      style={{ visibility: visibleItem, ...style }}
      className={noMargin ? className : classNames(cssPrefix`jsx-wrapper`, className)}
      data-cy={testId.container}
      data-testid={testId.container}
    >
      <div className={cssPrefix`section`} style={{ ...sectionStyle }}>
        {title && (
          <div className={cssPrefix`title`} data-testid={testId.title}>
            {title}
            {(onModuleEditorClick || moduleEditor) && <ModuleEditor onClick={onModuleEditorClick} {...moduleEditor} />}
          </div>
        )}
        {direction === 'row' ? (
          <div className={cssPrefix`row-wrapper`} style={wrapperStyle}>
            {childrenList?.map((itemList, index) => {
              return (
                <Grid.Row key={index} className={classNames(cssPrefix`row`)} gutter={60}>
                  {itemList?.map((infoItem, key, arr) => {
                    const attrList = Object.assign(
                      {},
                      {
                        layout,
                        itemStyle,
                        labelStyle,
                        labelWidth,
                        contentStyle,
                        auto,
                        arcoLabelColProps,
                        arcoContentColProps,
                        arcoRowProps,
                        visible,
                      },
                      infoItem.props as ItemProps,
                    );
                    const colSpan = calcSpan({ arr, key, infoItem, colNumber: colNumber as number });

                    return (
                      <Grid.Col key={key} span={colSpan}>
                        {React.cloneElement(infoItem, {
                          ...attrList,
                          columnNum: index,
                          key: key,
                        })}
                      </Grid.Col>
                    );
                  })}
                </Grid.Row>
              );
            })}
          </div>
        ) : (
          <div className={cssPrefix`column-wrapper`} style={wrapperStyle}>
            {childrenList?.map((itemList, index) => {
              return (
                <div key={index} className={`${cssPrefix`column`} ${cssPrefix`column-${colNumber}`}`}>
                  {itemList?.map((infoItem, key) => {
                    const attrList = Object.assign(
                      {},
                      {
                        layout,
                        itemStyle,
                        labelStyle,
                        labelWidth,
                        contentStyle,
                        auto,
                        arcoLabelColProps,
                        arcoContentColProps,
                        arcoRowProps,
                        visible,
                      },
                      infoItem.props as ItemProps,
                    );
                    return React.cloneElement(infoItem, {
                      ...attrList,
                      columnNum: index,
                      key: key,
                    });
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

const InfoSection = Object.assign(InfoSectionComponent, {
  List: createBuiltInComponent(InfoSectionList, builtInMap),
  Item: createBuiltInComponent(InfoItem, builtInMap),
  displayName: 'CInfoSection',
});

export default InfoSection;
