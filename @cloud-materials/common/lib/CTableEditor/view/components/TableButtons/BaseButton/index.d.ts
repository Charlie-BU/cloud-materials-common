import type { CSSProperties, FC } from 'react';
import type { TableEditor } from '../../../../model/TableEditor';
import type { CallAbleBoolean, CallAblePopover, CallAbleReactNode } from '../utils';
export interface BaseButtonProps {
    style?: CSSProperties;
    className?: string;
    /**控制是否禁用按钮 */
    disabled?: CallAbleBoolean;
    /**ICON*/
    icon?: CallAbleReactNode;
    /**文本 */
    text?: CallAbleReactNode;
    /**当有 content 时， 使用 content 内容，而不会渲染 icon 和 text */
    content?: CallAbleReactNode;
    /**popover配置，可以配完整的 PopoverProps，或者只配置 content */
    popover?: CallAblePopover;
    /**控制显隐 */
    visible?: CallAbleBoolean;
    onClick: (tableEditor: TableEditor) => void;
    testId?: string;
}
export declare const BaseButton: FC<BaseButtonProps>;
