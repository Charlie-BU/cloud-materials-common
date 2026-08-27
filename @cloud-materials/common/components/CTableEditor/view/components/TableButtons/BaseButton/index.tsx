import { observer } from '@formily/react';
import type { CSSProperties, FC } from 'react';
import React from 'react';
import cls from 'classnames';
import { useTableEditor } from '../../../hooks';
import type { TableEditor } from '../../../../model/TableEditor';
import type { CallAbleBoolean, CallAblePopover, CallAbleReactNode } from '../utils';
import { runCallable } from '../utils';
import type { PopoverProps } from '@arco-design/web-react';
import { Popover } from '@arco-design/web-react';
import { isUndefined } from 'lodash-es';
import { usePrefix } from '../../../hooks/usePrefix';

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

export const BaseButton: FC<BaseButtonProps> = observer(props => {
  const {
    className,
    style,
    visible: _visible = true,
    disabled: _disabled,
    icon: _icon,
    text: _text,
    content: _content,
    popover: _popover,
    testId,
    onClick,
  } = props;
  const tableEditor = useTableEditor();
  const TableButtonCommonCls = usePrefix('operation-button');

  if (!tableEditor) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('按钮需要使用 TableEditorProvider 包裹，否则无法操作表格');
    }
    return null;
  }

  const disabled = runCallable(_disabled, tableEditor);
  const content = runCallable(_content, tableEditor);
  const text = runCallable(_text, tableEditor);
  const icon = runCallable(_icon, tableEditor);
  const visible = runCallable(_visible, tableEditor);

  /**
   * 将 Popover 配置处理为 popover 格式
   * 方便只配置 content，或者完整配置整个 Popover
   */
  let popover: PopoverProps = runCallable(_popover, tableEditor) as PopoverProps;
  if (!isUndefined(popover) && !popover?.content) {
    popover = {
      content: popover,
    };
  }

  const clz = `${TableButtonCommonCls}-${disabled ? 'disabled' : 'enabled'}`;

  const handleClick = () => {
    if (!disabled) {
      onClick(tableEditor);
    }
  };

  const render = () => {
    return (
      <>
        {visible ? (
          <div
            style={style}
            className={cls(className, clz, TableButtonCommonCls)}
            onClick={handleClick}
            data-testid={testId}
            data-cy={testId}
          >
            {!content ? (
              <span className={`${TableButtonCommonCls}-content`}>
                {icon ? <span className={`${TableButtonCommonCls}-content-icon`}>{icon}</span> : null}
                {text ? <span className={`${TableButtonCommonCls}-content-text`}>{text}</span> : null}
              </span>
            ) : (
              content
            )}
          </div>
        ) : null}
      </>
    );
  };

  const dom = render();
  return popover ? <Popover {...popover}>{dom}</Popover> : dom;
});
