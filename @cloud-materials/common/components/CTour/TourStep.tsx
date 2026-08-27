import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useMemo } from 'react';
import { DefaultPanel } from './DefaultPanel';
import type { CTourStepInnerProps } from './interface';

const DefaultOffset = 12;

export const TourStep = (props: CTourStepInnerProps) => {
  const { realPosition, classNamePrefix, hotspotStyle, ...restProps } = props;
  const { current = 0, renderPanel, hotspot } = restProps;

  const hospotCls = `${classNamePrefix}-hotspot`;

  const hotspotStyleInner = useMemo((): CSSProperties => {
    switch (realPosition) {
      case 'top':
      case 'tl':
      case 'tr':
        return { marginTop: DefaultOffset };
      case 'lt':
      case 'left':
      case 'lb':
        return { marginLeft: DefaultOffset, left: '100%' };
      case 'rt':
      case 'right':
      case 'rb':
        return { marginLeft: -DefaultOffset };
      default:
        return { marginTop: -DefaultOffset, top: 0 };
    }
  }, [realPosition]);

  return (
    <>
      {typeof renderPanel === 'function' ? renderPanel(props, current) : <DefaultPanel {...restProps} />}

      {hotspot && realPosition && (
        <div
          className={classNames(hospotCls, `${hospotCls}-${realPosition}`, `${hospotCls}-${hotspot}`)}
          style={{ ...hotspotStyle, ...hotspotStyleInner }}
        />
      )}
    </>
  );
};
