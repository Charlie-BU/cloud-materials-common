/// <reference types="react" />
import type { CurrentDisplayPop, ExtraOperation, COperationMenuProps } from './interface';
import { MenuStatus } from './interface';
export declare const useCOperationMenu: (props: COperationMenuProps) => readonly [{
    outsideOperation: ExtraOperation[];
    menuOperation: ExtraOperation[][];
    menuStatus: MenuStatus;
    loadedRef: import("react").MutableRefObject<boolean>;
    currentPop: CurrentDisplayPop | undefined;
    dropdownVisible: boolean;
    dropdownProps: {
        popupVisible: boolean;
        triggerProps: {
            onClickOutside: () => void;
            updateOnScroll: boolean;
        };
    } & import("@arco-design/web-react").DropdownProps;
}, {
    setDropDownVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    getAsyncOperations: () => Promise<void>;
    dropdownBtnClick: () => void;
    popVisibleChange: (val: CurrentDisplayPop, visible: boolean) => void;
}];
export declare const useMenu: () => readonly [{
    activeMenu: string;
}, {
    setActiveMenu: import("react").Dispatch<import("react").SetStateAction<string>>;
    clearActiveMenu: () => void;
    subMenuVisible: (visible: boolean, key: string) => void;
}];
