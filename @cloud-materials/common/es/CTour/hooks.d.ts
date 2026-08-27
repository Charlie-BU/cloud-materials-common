/// <reference types="react" />
import type { CTourProps } from './interface';
export declare const useCTour: ({ defaultCurrent, current, open, mask, defaultOpen, steps }: CTourProps) => {
    currentStep: number;
    hasOpened: boolean | undefined;
    realPosition: "left" | "right" | "bottom" | "top" | "br" | "rt" | "tr" | "bl" | "tl" | "lt" | "lb" | "rb" | undefined;
    open: boolean | undefined;
    showMask: boolean | undefined;
    setStep: (updater: number | ((origin: number) => number), ignoreDestroy?: boolean | undefined) => void;
    setOpen: (updater: boolean | ((origin: boolean | undefined) => boolean | undefined) | undefined, ignoreDestroy?: boolean | undefined) => void;
    setRealPosition: import("react").Dispatch<import("react").SetStateAction<"left" | "right" | "bottom" | "top" | "br" | "rt" | "tr" | "bl" | "tl" | "lt" | "lb" | "rb" | undefined>>;
};
