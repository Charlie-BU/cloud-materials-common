import { IconDown } from '@arco-design/web-react/icon';
import { connect, mapProps } from '@formily/react';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { isNil } from 'lodash-es';

export const cssPrefix = classNamePrefixFactory('cform-section');

export interface SectionProps {
  title: ReactNode;
  /** 是否开启折叠功能 */
  enableCollapse?: boolean;
  /** 当前折叠模块是否展开，仅开启折叠功能后生效 */
  isExpand?: boolean;
  className?: string;
  style?: React.CSSProperties;
  extra?: ReactNode;
}

const Section: React.FC<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & SectionProps> = ({
  title,
  children,
  isExpand = true,
  enableCollapse = false,
  className,
  extra,
  ...restProps
}) => {
  const [expandStatus, setExpandStatus] = useState<boolean>(!enableCollapse || (enableCollapse && isExpand));

  useEffect(() => {
    if (enableCollapse) {
      if (isExpand !== expandStatus) {
        setExpandStatus(isExpand);
      }
    }
  }, [isExpand, enableCollapse]);

  return (
    <div className={classNames(cssPrefix``, className)} {...restProps}>
      <div className={cssPrefix`header`}>
        <div className={cssPrefix`header-tag`} />
        <div
          onClick={() => enableCollapse && setExpandStatus(exp => !exp)}
          className={classNames(cssPrefix`header-title`, { [cssPrefix`header-title-pointer`]: enableCollapse })}
        >
          <span>{title}</span>
          <span
            className={classNames(cssPrefix`header-title-icon`, {
              [cssPrefix`header-title-icon-expand`]: expandStatus,
              [cssPrefix`header-title-icon-visible`]: enableCollapse,
            })}
          >
            <IconDown />
          </span>
        </div>
        {!isNil(extra) && <div className={cssPrefix`header-extra`}>{extra}</div>}
      </div>
      <div
        className={classNames(cssPrefix`section-children`, {
          [cssPrefix`collapse-children-hidden`]: !expandStatus,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export const CFormSection = connect(
  Section,
  mapProps((props, field) => {
    if (!field) return props;
    return {
      title: field.title,
      ...field.decoratorProps,
    };
  }),
);

export default Section;
