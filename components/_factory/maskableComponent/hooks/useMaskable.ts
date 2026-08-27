import { useAutoRef } from '../../../hooks';
import { useContext, useEffect } from 'react';
import type { BaseHooksProps } from '../interface';
import type { UseFooterProps } from './useFooter';
import { useFooter } from './useFooter';
import { ConfigProvider } from '@arco-design/web-react';

export const useBaseMaskable = <T = unknown>({ componentName, ...props }: UseFooterProps & T & BaseHooksProps) => {
  const { preventCloseSelectors = [], confirmOnOk: _, onCancel, ...restProps } = props;
  const { mask } = restProps;
  const { prefixCls } = useContext(ConfigProvider.ConfigContext);
  const preventCloseSelectorsRef = useAutoRef(
    [`.${prefixCls}-trigger`, `.${prefixCls}-modal-wrapper`].concat(preventCloseSelectors),
  );
  const onCancelRef = useAutoRef(onCancel);

  const [okState, okControl] = useFooter({ ...props, componentName });

  const { visible: innerVisible } = okState;
  const { setVisible } = okControl;

  useEffect(() => {
    let timer = -1;
    const handleClick = (e: MouseEvent) => {
      const typeTarget = e.target as HTMLElement;
      if (
        typeTarget &&
        preventCloseSelectorsRef.current.some(preventCloseSelector => typeTarget.closest(preventCloseSelector))
      ) {
        return;
      }
      setVisible(false);
      onCancelRef.current?.();
    };

    if (mask === false && innerVisible) {
      timer = window.setTimeout(() => {
        // 这里使用事件捕获，事件会先于react的事件触发，防止在用户交互后内容变化导致内容drawer隐藏起来
        // 展示后再绑定事件，不确定升级react 17+后是否有问题
        window.addEventListener('click', handleClick, true);
      });
    }

    return () => {
      window.removeEventListener('click', handleClick, true);
      clearTimeout(timer);
    };
  }, [innerVisible, mask]);

  const modalProps = {
    ...restProps,
    ...okState,
  };

  const controls = {
    setVisible: (visible: number | boolean) => {
      setVisible(Boolean(visible));
    },
  };

  return [modalProps, controls] as const;
};
