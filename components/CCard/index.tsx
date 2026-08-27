import React, { useMemo } from 'react';
import type { CCardProps } from './interface';
import cs from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks/useMergeProps';
import { Card, Grid } from '@arco-design/web-react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import LinkListItem from './component/LinkListItem';

const { GridItem } = Grid;

export const components = {
  Grid,
  Card,
  GridItem,
};

const cssPrefix = classNamePrefixFactory('card');

export const testId = {
  container: cssPrefix`container`,
  extra: cssPrefix`header-extra`,
  title: cssPrefix`header-title`,
  icon: cssPrefix`header-icon`,
};

const defaultProps: CCardProps = {
  bordered: true,
};
const CCardComponent: React.FC<CCardProps> = baseProps => {
  const props = useMergeProps<React.PropsWithChildren<CCardProps>>(baseProps, defaultProps as CCardProps, {});

  const { className, title, type, children, icon, ...rest } = props;
  const typeClassName = useMemo(() => {
    switch (type) {
      case 'linkList':
        return 'link-list';
      default:
        return type;
    }
  }, [type]);

  const { useCssPrefix } = useCConfigContext();

  const cssPrefix = useCssPrefix(`card`);

  const renderChildren = () => {
    if (type === 'linkList') {
      const { cols, items } = props;
      return (
        <Grid colGap={24} cols={cols ?? 1} rowGap={8}>
          {items
            ? //items 优先级最高
              items.map((item, i) => {
                return (
                  <GridItem key={i}>
                    <LinkListItem {...item} />
                  </GridItem>
                );
              })
            : //如果没有配置item，则使用 Children
              React.Children.map(children, (element: JSX.Element) => {
                return <GridItem>{element}</GridItem>;
              })}
        </Grid>
      );
    }
    return children;
  };

  return (
    <Card
      title={
        <>
          {icon}
          {title}
        </>
      }
      data-testid={testId.container}
      {...rest}
      className={cs(cssPrefix``, cssPrefix`${typeClassName}`, className)}
    >
      {renderChildren()}
    </Card>
  );
};

const CCard = Object.assign(CCardComponent, {
  LinkListItem: LinkListItem,
  displayName: 'CCard',
});

export default CCard;
