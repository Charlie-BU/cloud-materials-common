import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import type { DefaultCFormDecoratorProps } from '../../../../interface';
import { useThrottleFn } from 'ahooks';
import { CFormAnchor } from '../../CFormAnchor';
import { useFormStep } from '@storage-fe/formily-arco/es/FormStep/hooks';
import { get, isPlainObject } from 'lodash-es';
import CConfigProvider, { CConfigContext } from '../../../../../CConfigProvider';

const cssPrefix = classNamePrefixFactory('form-decorator');
const testId = {
  decoratorContainer: cssPrefix``,
};

const DefaultCFormDecorator: React.FC<DefaultCFormDecoratorProps> = props => {
  const {
    style,
    className = '',
    arcoSteps,
    steps,
    topSlot,
    headerSlot,
    footerSlot,
    residentContentSlot,
    children,
    getPopupContainer,
  } = props || {};

  const formStep = useFormStep();
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('form-decorator');

  const anchorInfo = formStep?.data.anchor[formStep.current];

  const [ScrollContainerID] = useState(() => `${Date.now()}c-form-step-content-wrapper`);
  const [anrchorScollOffset, setAnrchorScollOffset] = useState<number>(67);
  const { stickyType = 'headerSticky', isFullPage = true, isHeaderSeperatorLinkup = false, headerStyle } = props;
  const prefixStr = cssPrefix``;

  const processHeaderSeperator = useCallback(() => {
    const mainContaienr = document.getElementsByClassName(`${prefixStr}-mainContainer`)?.[0] as HTMLElement;
    const headerContainer = document.getElementsByClassName(`${prefixStr}-header`)?.[0] as HTMLElement;
    const seperatorContainer = document.getElementsByClassName(
      `${prefixStr}-header-headerSeperator`,
    )?.[0] as HTMLElement;
    if (!isFullPage || !isHeaderSeperatorLinkup || !mainContaienr || !headerContainer || !seperatorContainer) return;
    const offsetLeft = (mainContaienr.offsetWidth - headerContainer.offsetWidth) / 2;
    if (offsetLeft > 0) {
      seperatorContainer.style.width = `${mainContaienr.offsetWidth}px`;
      seperatorContainer.style.left = `-${offsetLeft}px`;
    } else {
      seperatorContainer.style.width = `100%`;
      seperatorContainer.style.left = '0px';
    }
  }, []);

  const processHeaderSeperatorThrottle = useThrottleFn(
    () => {
      processHeaderSeperator();
    },
    { wait: 200 },
  );

  const processTopOffset = useCallback(() => {
    const headerInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementHeader`)?.[0] as HTMLElement;
    const topInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementTop`)?.[0] as HTMLElement;
    if (topInnerElement && headerInnerElement && ['headerTopSticky'].includes(stickyType)) {
      topInnerElement.classList.add(`${prefixStr}-isSticky`);
      topInnerElement.style.top = `${headerInnerElement.offsetHeight}px`;
    }
  }, []);

  const processResidentOffset = useCallback(() => {
    const headerInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementHeader`)?.[0] as HTMLElement;
    const topInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementTop`)?.[0] as HTMLElement;
    const residentELement = document.getElementsByClassName(
      `${prefixStr}-content-container-resident-content-fix`,
    )?.[0] as HTMLElement;
    if (residentELement) {
      let offset = 0;
      switch (stickyType) {
        case 'headerSticky':
          offset = headerInnerElement?.offsetHeight ?? 0;
          break;
        case 'headerTopSticky':
          offset = (headerInnerElement?.offsetHeight ?? 0) + (topInnerElement?.offsetHeight ?? 0);
          break;
        default:
          break;
      }
      residentELement.style.top = `${offset}px`;
    }
  }, []);

  const calculateAnrchorScollOffset = useCallback(() => {
    const headerInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementHeader`)?.[0] as HTMLElement;
    const topInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementTop`)?.[0] as HTMLElement;
    let offset = 0;
    if (stickyType === 'headerSticky') {
      offset = headerInnerElement?.offsetHeight ?? 0;
    } else if (stickyType === 'headerTopSticky') {
      offset = (headerInnerElement?.offsetHeight ?? 0) + (topInnerElement?.offsetHeight ?? 0);
    }
    setAnrchorScollOffset(offset);
  }, []);

  const processArchorOffset = useCallback(() => {
    const archorELement = document.getElementsByClassName(`${prefixStr}-content-anchor-fix`)?.[0] as HTMLElement;
    const headerInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementHeader`)?.[0] as HTMLElement;
    const topInnerElement = document.getElementsByClassName(`${prefixStr}-innerElementTop`)?.[0] as HTMLElement;
    const scrollContainer = document.getElementsByClassName(`${prefixStr}-scrollContainer`)?.[0] as HTMLElement;
    const height =
      (scrollContainer?.offsetHeight ?? 0) -
      (headerInnerElement?.offsetHeight ?? 0) -
      (topInnerElement?.offsetHeight ?? 0) -
      20 -
      40;

    if (archorELement) {
      archorELement.style.top = `${anrchorScollOffset}px`;
      if (height) archorELement.style.height = `${height}px`;
    }
  }, []);

  useEffect(() => {
    processHeaderSeperator();
    processTopOffset();
    processResidentOffset();
    processArchorOffset();
    calculateAnrchorScollOffset();
    window.onresize = function () {
      processHeaderSeperatorThrottle.run();
    };
  }, []);

  return (
    <div
      className={classNames(cssPrefix``, { [cssPrefix`fullpage`]: isFullPage }, className)}
      style={style}
      data-cy={testId.decoratorContainer}
      data-testid={testId.decoratorContainer}
    >
      <div className={classNames(cssPrefix`mainContainer`)}>
        <div
          id={ScrollContainerID}
          className={classNames(cssPrefix`scrollContainer`, {
            [cssPrefix`scrollContainer-bottomLine`]: !!get(footerSlot, 'props.children'),
          })}
        >
          {get(headerSlot, 'props.children') ? (
            <div
              className={classNames(cssPrefix`innerElement`, cssPrefix`innerElementHeader`, {
                [cssPrefix`isSticky`]: ['headerSticky', 'headerTopSticky'].includes(stickyType),
              })}
              style={{
                top: 0,
              }}
            >
              <div className={classNames(cssPrefix`header`)} style={headerStyle}>
                <div className={classNames(cssPrefix`header-inner`)}>{headerSlot}</div>
                <div className={classNames(cssPrefix`header-headerSeperator`)} />
              </div>
            </div>
          ) : null}
          {get(topSlot, 'props.children') ? (
            <div className={classNames(cssPrefix`innerElement`, cssPrefix`innerElementTop`)}>
              <div className={cssPrefix`top`}>{topSlot}</div>
            </div>
          ) : null}
          {get(arcoSteps, 'props.children') ? (
            <div className={classNames(cssPrefix`innerElement`, cssPrefix`innerElementStep`)}>
              <div className={cssPrefix`steps`}>
                <div className={cssPrefix`steps-inner`}>{arcoSteps}</div>
              </div>
            </div>
          ) : null}
          <div className={classNames(cssPrefix`innerElement`, cssPrefix`innerElementContent`)}>
            <CConfigProvider
              getPopupContainer={
                getPopupContainer ?? (() => document.getElementById(ScrollContainerID) ?? document.body)
              }
            >
              <div
                className={classNames(cssPrefix`content-container`, {
                  [cssPrefix`content-container-no-header`]: get(arcoSteps, 'props.children')
                    ? true
                    : !get(headerSlot, 'props.children') && !get(topSlot, 'props.children'),
                  [cssPrefix`content-container-no-footer`]: !get(footerSlot, 'props.children'),
                })}
              >
                {get(steps, 'props.children') ? (
                  <div
                    className={classNames(cssPrefix`content-container-content`, {
                      [cssPrefix`content-container-content-no-resident`]: !get(residentContentSlot, 'props.children'),
                    })}
                  >
                    {steps}
                  </div>
                ) : null}
                {get(residentContentSlot, 'props.children') ? (
                  <div className={cssPrefix`content-container-resident-content`}>
                    <div className={cssPrefix`content-container-resident-content-fix`}>{residentContentSlot}</div>
                  </div>
                ) : null}
                {((isPlainObject(anchorInfo) && anchorInfo.isOn) || anchorInfo) && (
                  <div className={cssPrefix`content-anchor`}>
                    <div className={cssPrefix`content-anchor-fix`}>
                      <CFormAnchor
                        anchorInfo={anchorInfo}
                        scrollContainer={ScrollContainerID}
                        anrchorScollOffset={anrchorScollOffset}
                        current={formStep.current}
                      />
                    </div>
                  </div>
                )}
              </div>
              {children}
            </CConfigProvider>
          </div>
        </div>
        {get(footerSlot, 'props.children') ? (
          <div className={classNames(cssPrefix`innerElement`, cssPrefix`innerElementFooter`)}>
            <div className={cssPrefix`footer`}>{footerSlot}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DefaultCFormDecorator;
