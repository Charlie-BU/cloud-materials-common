import { Portal, Trigger } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { useCTour } from './hooks';
import type { CTourProps } from './interface';
import { Mask } from './Mask';
import { TourStep } from './TourStep';
import type { Gap } from './useTarget';
import { useTarget } from './useTarget';

const DefaultOffset = 8;
const DefaultPopupAlign = {
  top: DefaultOffset,
  bottom: DefaultOffset,
  left: DefaultOffset,
  right: DefaultOffset,
};

const CTour: React.FC<CTourProps> = props => {
  const {
    gap,
    steps = [],
    disabledInteraction,
    zIndex = 1000,
    position,
    children,
    trigger = 'click',
    closable = true,
    hotspot,
    mask,
    triggerRef,
    triggerProps,
    animated = true,
    scrollIntoView,
    onClose,
    onChange,
    onFinish,
    getPopupContainer,
  } = props;
  const { open, currentStep, showMask, realPosition, hasOpened, setOpen, setStep, setRealPosition } = useCTour(props);
  const arcoTriggerRef = useRef<Trigger>(null);
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('tour');

  const currentStepProps = steps[currentStep] ?? {};

  const [posInfo] = useTarget({
    target: currentStepProps.target ?? (() => arcoTriggerRef.current?.childrenDom),
    open: !!open,
    gap,
    scrollIntoView,
  });

  useImperativeHandle(triggerRef, () => arcoTriggerRef.current);

  useEffect(() => {
    if (arcoTriggerRef.current) {
      const originGetPopupStyle = arcoTriggerRef.current.getPopupStyle;

      arcoTriggerRef.current.getPopupStyle = (...args: unknown[]) => {
        const exeReturn = originGetPopupStyle.apply(arcoTriggerRef.current, args);
        // @ts-expect-error
        setRealPosition(arcoTriggerRef.current?.realPosition);
        return exeReturn;
      };
    }
  }, []);

  const singleStep = steps.length === 1;

  const handleClose = () => {
    setOpen(false);
    onClose?.(currentStep);
  };

  // ========================= Change =========================
  const onInternalChange = (nextCurrent: number) => {
    setStep(nextCurrent);
    onChange?.(nextCurrent);
  };

  const mergedHotspot = currentStepProps.hotspot ?? hotspot;
  const mergedClosable = currentStepProps.closable ?? closable;

  const getPopupElement = () => (
    <TourStep
      total={steps.length}
      onPrev={() => {
        onInternalChange(currentStep - 1);
      }}
      onNext={() => {
        onInternalChange(currentStep + 1);
      }}
      current={currentStep}
      onFinish={() => {
        handleClose();
        onFinish?.();
      }}
      onClose={handleClose}
      {...currentStepProps}
      hotspot={mergedHotspot}
      closable={children ? false : mergedClosable}
      classNamePrefix={cssPrefix``}
      realPosition={realPosition}
      hotspotStyle={arcoTriggerRef.current?.arrowStyle}
    />
  );

  const [gapOffsetLeftRight, gapOffsetTopBottom] = useMemo((): [number, number] => {
    if (gap?.offset) {
      if (Array.isArray(gap.offset)) {
        return gap.offset;
      }

      return [gap.offset, gap.offset];
    }

    return [0, 0];
  }, [gap?.offset]);

  if (!hasOpened && !children) {
    return null;
  }

  const popupAlign = gap?.offset
    ? {
        top: gapOffsetTopBottom + DefaultOffset,
        bottom: gapOffsetTopBottom + DefaultOffset,
        left: gapOffsetLeftRight + DefaultOffset,
        right: gapOffsetLeftRight + DefaultOffset,
      }
    : showMask
    ? void 0
    : DefaultPopupAlign;

  return (
    <>
      {(mask || !children) && (
        <Mask
          pos={posInfo}
          showMask={showMask}
          open={open}
          disabledInteraction={disabledInteraction}
          zIndex={zIndex - 1}
          getContainer={getPopupContainer}
          animated={animated}
        />
      )}
      <Trigger
        ref={arcoTriggerRef}
        popupVisible={open}
        popup={getPopupElement}
        onVisibleChange={v => {
          if (v) {
            setOpen(v);
          } else {
            handleClose();
          }
        }}
        clickOutsideToClose={mergedClosable}
        showArrow={currentStepProps.arrow ?? true}
        className={classNames(
          cssPrefix`trigger`,
          singleStep && cssPrefix`trigger-single`,
          animated && cssPrefix`trigger-animated`,
        )}
        style={{ zIndex }}
        position={currentStepProps.position ?? position}
        trigger={trigger}
        popupAlign={popupAlign}
        unmountOnExit
        {...triggerProps}
      >
        {children ?? (
          <Portal visible={open}>
            <div
              style={{
                ...posInfo,
                position: 'fixed',
                pointerEvents: 'none',
              }}
            />
          </Portal>
        )}
      </Trigger>
    </>
  );
};

CTour.displayName = 'CTour';

export { CTour as default };
export type { Gap };
