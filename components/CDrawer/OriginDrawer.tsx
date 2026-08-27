import type { DrawerProps } from '@arco-design/web-react';
import { Drawer as ArcoDrawer, Button } from '@arco-design/web-react';
import { isFunction } from 'lodash-es';
import React from 'react';
import { useCConfigContext } from '../CConfigProvider';

interface DrawerComponentProps extends Omit<DrawerProps, 'footer'> {
  footer?: React.ReactNode | ((cancelButtonNode: React.ReactNode, okButtonNode: React.ReactNode) => React.ReactNode);
}

const Drawer = (
  {
    footer,
    onCancel,
    onOk,
    okText,
    cancelText,
    okButtonProps,
    cancelButtonProps,
    confirmLoading,
    ...drawerProps
  }: DrawerComponentProps,
  ref: any,
) => {
  const { locale } = useCConfigContext();
  const renderFooter = () => {
    if (footer === null) return footer;

    const cancelButtonNode = (
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText || locale.Modal.cancelText}
      </Button>
    );
    const okButtonNode = (
      <Button loading={confirmLoading} onClick={onOk} type="primary" {...okButtonProps}>
        {okText || locale.Modal.okText}
      </Button>
    );
    const footerContent = isFunction(footer)
      ? footer(cancelButtonNode, okButtonNode)
      : footer ?? (
          <>
            {cancelButtonNode}
            {okButtonNode}
          </>
        );

    return <>{footerContent}</>;
  };

  return <ArcoDrawer {...drawerProps} footer={footer === null ? null : renderFooter()} onCancel={onCancel} ref={ref} />;
};

const DrawerComponent = React.forwardRef<unknown, DrawerProps>(Drawer);

DrawerComponent.displayName = 'CMDrawer';

export default DrawerComponent;
