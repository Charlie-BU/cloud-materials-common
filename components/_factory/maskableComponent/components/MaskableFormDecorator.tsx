import type { FormStepDecoratorProps } from '@storage-fe/formily-arco/es/FormStep';
import React from 'react';
import ReactDOM from 'react-dom';
import { useCConfigContext } from '../../../CConfigProvider';
import classNames from 'classnames';
import type { StepsProps } from '@arco-design/web-react';

export interface MaskableFormDecoratorProps extends FormStepDecoratorProps {
  stickyStep?: boolean;
  stepsProps?: StepsProps;
  footerContainer?: () => HTMLElement | null;
  topContainer?: () => HTMLElement | null;
  headerContainer?: () => HTMLElement | null;
}

const MaskableFormDecorator: React.FC<MaskableFormDecoratorProps> = ({
  steps,
  arcoSteps,
  footerSlot,
  topSlot,
  headerSlot,
  children,
  residentContentSlot,
  stickyStep,
  stepsProps,
  footerContainer,
  headerContainer,
  topContainer,
}) => {
  const footerContainerNode = footerContainer?.();
  const topContainerNode = topContainer?.();
  const headerContainerNode = headerContainer?.();

  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('maskable-form');

  // for tree shaking
  if (process.env.NODE_ENV !== 'production') {
    if (residentContentSlot) {
      throw new Error('暂不支持 `residentContent` ');
    }
  }

  const shouldStickyStep = Boolean(stickyStep && headerContainerNode);

  const arcoStepsCopy =
    arcoSteps &&
    React.cloneElement(arcoSteps as React.ReactElement, {
      className: classNames(cssPrefix`step`, shouldStickyStep && cssPrefix`step-sticky`, stepsProps?.className),
      ...stepsProps,
    });

  return (
    <>
      {headerContainerNode && headerSlot
        ? ReactDOM.createPortal(<div className={cssPrefix`header`}>{headerSlot}</div>, headerContainerNode)
        : headerSlot}
      {topContainerNode && ReactDOM.createPortal(topSlot, topContainerNode)}
      {footerContainerNode && ReactDOM.createPortal(footerSlot, footerContainerNode)}
      {shouldStickyStep
        ? headerContainerNode && arcoStepsCopy && ReactDOM.createPortal(arcoStepsCopy, headerContainerNode)
        : arcoStepsCopy}
      {steps}
      {children}
    </>
  );
};

export default MaskableFormDecorator;
