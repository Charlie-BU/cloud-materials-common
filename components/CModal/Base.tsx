import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { ConfigProvider, Modal } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useContext, useRef } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { ChildrenRenderer, MaskableProvider } from '../_factory/maskableComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useCModal } from './hooks';
import type { CModalProps } from './interface';
import { useMergeProps } from '../hooks';

const testIdPrefix = classNamePrefixFactory('modal');

export const testId = {
  modal: testIdPrefix``,
  cancelBtn: testIdPrefix`cancel-btn`,
  okBtn: testIdPrefix`ok-btn`,
  content: testIdPrefix`content`,
};
// TODO 如果contentTop和contentBottom需要放表单，这里需要加个decorator属性，用于包裹children

export const BaseCModalComponent = React.forwardRef<HTMLDivElement, CModalProps>(({ children, ...props }, ref) => {
  const { useCssPrefix, cComponentConfig: { CModal = {} } = {} } = useCConfigContext();
  const mergedProps = useMergeProps<CModalProps>(props, {}, CModal);

  const [
    {
      className,
      contentTop,
      contentBottom,
      contentClassName,
      okButtonProps,
      cancelButtonProps,
      footerDivider,
      scrollMaxHeight = 474,
      ...restProps
    },
  ] = useCModal(mergedProps);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { prefixCls } = useContext(ConfigProvider.ConfigContext);
  const cssPrefix = useCssPrefix('modal');

  return (
    <Modal
      getChildrenPopupContainer={() => document.body}
      closeIcon={<IconClose />}
      {...restProps}
      className={classNames(
        cssPrefix``,
        className,
        footerDivider && cssPrefix`footer-divider`,
        restProps.footer === null && cssPrefix`no-footer`,
      )}
      data-testid={testId.modal}
      data-cy={testId.modal}
      okButtonProps={{
        ...okButtonProps,
        // @ts-ignore
        'data-testid': testId.okBtn,
      }}
      cancelButtonProps={{
        ...cancelButtonProps,
        // @ts-ignore
        'data-testid': testId.cancelBtn,
      }}
      ref={ref}
    >
      <ChildrenRenderer
        ref={scrollRef}
        contentTop={contentTop}
        contentBottom={contentBottom}
        data-testid={testId.content}
        className={classNames(testId.content, contentClassName)}
        contentClassNameWhenContentTop={cssPrefix`content-space`}
        // 和css保持一致
        maxHeight={scrollMaxHeight === 'none' ? void 0 : scrollMaxHeight}
        onMount={scrollRef => {
          const modalContent = scrollRef.closest<HTMLDivElement>(`.${prefixCls}-modal-content`);
          if (modalContent && scrollMaxHeight) {
            modalContent.style.maxHeight = scrollMaxHeight === 'none' ? scrollMaxHeight : `${scrollMaxHeight}px`;
          }
        }}
      >
        {children}
      </ChildrenRenderer>
    </Modal>
  );
});

BaseCModalComponent.displayName = 'CModal';

const BaseCModal = React.forwardRef<HTMLDivElement, CModalProps>((props, ref) => (
  <MaskableProvider>
    <BaseCModalComponent {...props} ref={ref} />
  </MaskableProvider>
));

BaseCModal.displayName = 'CModal';

export default BaseCModal;
