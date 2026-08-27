import React, { useRef } from 'react';
import type { CDrawerProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { useCDrawer } from './hooks';
import COperationMenu from '../COperationMenu';
import type { COperationMenuProps } from '../COperationMenu/interface';
import { TriggerName, ChildrenRenderer, MaskableProvider } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import Drawer from './OriginDrawer';
import { useMergeProps } from '../hooks';

const testIdPrefix = classNamePrefixFactory('drawer');

export const testId = {
  drawer: testIdPrefix``,
  cancelBtn: testIdPrefix`cancel-btn`,
  okBtn: testIdPrefix`ok-btn`,
};

export const BaseCDrawerComponent = React.forwardRef<HTMLDivElement, CDrawerProps>(({ children, ...props }, ref) => {
  const { useCssPrefix, cComponentConfig: { CDrawer } = {} } = useCConfigContext();
  const cssPrefix = useCssPrefix('drawer');
  const containerClassName = cssPrefix``;
  const scrollRef = useRef<HTMLDivElement>(null);
  const mergedProps = useMergeProps<CDrawerProps>(props, {}, CDrawer ?? {});

  const [
    {
      className,
      contentTop,
      contentBottom,
      contentClassName,
      title,
      headerDescription,
      titleAfter,
      extraHeader,
      width = 1000,
      ...restProps
    },
  ] = useCDrawer({
    ...mergedProps,
    preventCloseSelectors: [`.${containerClassName}`, `[${TriggerName}]`],
  });

  return (
    <Drawer
      className={classNames(containerClassName, restProps.mask === false && cssPrefix`shadow`, className)}
      width={width}
      getChildrenPopupContainer={() => document.body}
      {...restProps}
      title={
        <>
          <div className={cssPrefix`title-box`}>
            <div className={cssPrefix`title`}>
              {headerDescription ? (
                <>
                  {title}
                  <div className={cssPrefix`header-desc`}>{headerDescription}</div>
                </>
              ) : (
                title
              )}
            </div>
            {titleAfter && (
              <div className={cssPrefix`title-after`}>
                {React.isValidElement(titleAfter) ? (
                  titleAfter
                ) : (
                  <COperationMenu {...(titleAfter as COperationMenuProps)} />
                )}
              </div>
            )}
          </div>
          {extraHeader}
        </>
      }
      data-testid={testId.drawer}
      data-cy={testId.drawer}
      okButtonProps={{
        ...restProps.okButtonProps,
        // @ts-ignore
        'data-testid': testId.okBtn,
      }}
      cancelButtonProps={{
        ...restProps.cancelButtonProps,
        // @ts-ignore
        'data-testid': testId.cancelBtn,
      }}
      ref={ref}
    >
      <ChildrenRenderer
        disableScrollShadow
        contentTop={contentTop}
        contentBottom={contentBottom}
        className={classNames(cssPrefix`content`, contentClassName)}
        ref={scrollRef}
      >
        {children}
      </ChildrenRenderer>
    </Drawer>
  );
});

BaseCDrawerComponent.displayName = 'CDrawer';

const BaseCDrawer = React.forwardRef<HTMLDivElement, CDrawerProps>((props, ref) => (
  <MaskableProvider>
    <BaseCDrawerComponent {...props} ref={ref} />
  </MaskableProvider>
));

BaseCDrawer.displayName = 'CDrawer';

export default BaseCDrawer;
