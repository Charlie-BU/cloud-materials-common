import useMergedState from 'rc-util/es/hooks/useMergedState';
import { useLayoutEffect, useRef, useState } from 'react';
import type { CTourProps } from './interface';

export const useCTour = ({ defaultCurrent, current, open, mask = true, defaultOpen, steps = [] }: CTourProps) => {
  const [currentStep, setStep] = useMergedState(defaultCurrent ?? 0, { value: current });
  const [realPosition, setRealPosition] = useState<CTourProps['position']>();

  const [mergedOpen, setOpen] = useMergedState(defaultOpen, {
    value: open,
    postState: origin => (currentStep < 0 || currentStep >= steps.length ? false : origin ?? false),
  });

  const [hasOpened, setHasOpened] = useState(mergedOpen);

  const openRef = useRef(mergedOpen);

  const { mask: stepMask } = steps[currentStep] ?? {};

  const mergedMask = mergedOpen && (stepMask ?? mask);

  useLayoutEffect(() => {
    if (mergedOpen) {
      if (!openRef.current) {
        setStep(defaultCurrent ?? 0);
      }

      setHasOpened(true);
    }
    openRef.current = mergedOpen;
  }, [mergedOpen]);

  return {
    currentStep,
    hasOpened,
    realPosition,
    open: mergedOpen,
    showMask: mergedMask,

    setStep,
    setOpen,
    setRealPosition,
  };
};
