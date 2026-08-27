/// <reference types="react" />
import type { CurrentDisplayPop, ExtraOperation } from '../interface';
import { MenuStatus } from '../interface';
interface MenuListProps {
    menuOperation: ExtraOperation[][];
    menuStatus: MenuStatus;
    currentPop?: CurrentDisplayPop;
    popVisibleChange: (val: CurrentDisplayPop, visible: boolean) => void;
    setDropDownVisible: (val: boolean) => void;
    maxMenuOperationNum: number;
    getAsyncOperations: () => void;
}
declare const MenuList: ({ menuOperation, menuStatus, currentPop, popVisibleChange, setDropDownVisible, maxMenuOperationNum, getAsyncOperations, }: MenuListProps) => JSX.Element;
export default MenuList;
