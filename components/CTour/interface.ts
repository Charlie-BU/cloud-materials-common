import type { ButtonProps, Trigger, TriggerProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
import type { Gap } from './useTarget';

export interface CTourStepInfo {
  arrow?: boolean;
  target?: HTMLElement | (() => HTMLElement | null | undefined) | null;
  title?: ReactNode;
  desc?: ReactNode;
  mask?: boolean;

  hotspot?: 'orange' | 'blue';
  className?: string;
  style?: CSSProperties;
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  cover?: React.ReactNode;
  closable?: boolean;
  footer?: boolean;
  position?: TriggerProps['position'];
  prevButtonProps?: ButtonProps | null;
  nextButtonProps?: ButtonProps | null;
}

export interface CTourStepProps extends CTourStepInfo {
  total?: number;
  current: number;
  onClose?: () => void;
  onFinish?: () => void;
  renderPanel?: (step: CTourStepProps, current: number) => ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}

export interface CTourStepInnerProps extends CTourStepProps {
  realPosition?: TriggerProps['position'];
  classNamePrefix: string;
  hotspotStyle?: React.CSSProperties;
}

/**
 * @title CTourProps
 */
export interface CTourProps {
  steps?: CTourStepInfo[];
  open?: boolean;
  defaultOpen?: boolean;
  defaultCurrent?: number;
  current?: number;
  onChange?: (current: number) => void;
  onClose?: (current: number) => void;
  onFinish?: () => void;
  closable?: CTourStepProps['closable'];
  mask?: boolean;
  arrow?: boolean;
  renderPanel?: (props: CTourStepProps, current: number) => ReactNode;
  /** 自动将target滚动到视图内 */
  scrollIntoView?: false | ScrollIntoViewOptions;
  zIndex?: number;
  disabledInteraction?: boolean;
  position?: TriggerProps['position'];
  children?: ReactNode;
  trigger?: TriggerProps['trigger'];
  triggerProps?: TriggerProps;
  hotspot?: CTourStepInfo['hotspot'];
  gap?: Gap;
  escToClose?: boolean;
  triggerRef?: React.RefObject<Trigger | null>;
  getPopupContainer?: () => HTMLElement;
  animated?: boolean;
}
