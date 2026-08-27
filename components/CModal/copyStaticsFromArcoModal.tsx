import type { ButtonProps, PopoverProps } from '@arco-design/web-react';
import { Modal, Popover } from '@arco-design/web-react';
import type { ConfirmProps } from '@arco-design/web-react/es/Modal/confirm';
import React from 'react';
import CAgreement from '../CAgreement';
import type { CAgreementProps } from '../CAgreement/interface';
import { getGlobalContextConfig } from '../CConfigProvider';
import { testId } from './Base';
import {
  IconClose,
  IconInfoCircleFill,
  IconCheckCircleFill,
  IconExclamationCircleFill,
  IconCloseCircleFill,
} from '@arco-design/iconbox-react-ve-o-design';
import { createDeferred } from '../_utils/createDeferred';

type CopyStatics = Pick<typeof Modal, 'confirm' | 'error' | 'info' | 'warning' | 'success'>;

type PromiseStatics = {
  [key in keyof CopyStatics]: <T extends any = boolean>(
    props: CustomConfirmProps,
  ) => Promise<T> & ReturnType<CopyStatics[key]>;
};

const staticsKeys: (keyof CopyStatics)[] = ['confirm', 'error', 'info', 'warning', 'success'];

export interface CustomConfirmProps extends ConfirmProps {
  agreement?: string | Partial<CAgreementProps>;
  popoverOnOk?: PopoverProps | false;
}

const modalTypeIconMap: Record<keyof CopyStatics, React.ReactNode> = {
  confirm: <IconExclamationCircleFill />,
  error: <IconCloseCircleFill />,
  info: <IconInfoCircleFill />,
  success: <IconCheckCircleFill />,
  warning: <IconExclamationCircleFill />,
};

export const copyStaticsFromArcoModal = <T extends { closeAll: () => void }>(CModal: T): T & PromiseStatics => {
  const { closeAll } = CModal;

  CModal.closeAll = () => {
    closeAll();
    Modal.destroyAll();
  };

  const statics = staticsKeys.reduce((prev, current) => {
    prev[current] = <ReturnT extends any>({
      agreement,
      content,
      popoverOnOk,
      footer,
      ...props
    }: CustomConfirmProps) => {
      const [promise, resolve, reject] = createDeferred<ReturnT>();
      const okButtonProps: ButtonProps = {
        // @ts-ignore
        'data-testid': testId.okBtn,
        disabled: Boolean(agreement),
        ...props.okButtonProps,
      };
      const { prefixCls } = getGlobalContextConfig();

      let checkedFlag = false;

      const renderFooter = (cancel: React.ReactNode, ok: React.ReactElement) => (
        <>
          {!props.hideCancel && cancel}
          {popoverOnOk ? (
            <Popover {...popoverOnOk} disabled={checkedFlag}>
              {React.cloneElement(ok!, { className: `${prefixCls ?? 'arco'}-btn` })}
            </Popover>
          ) : (
            ok
          )}
        </>
      );

      const modalReturn = Modal[current]({
        prefixCls,
        closable: true,
        closeIcon: <IconClose />,
        icon: modalTypeIconMap[current],
        ...props,
        footer: footer === null ? footer : footer ?? renderFooter,
        content: agreement ? (
          <>
            {content}
            <CAgreement
              style={{ marginTop: 16 }}
              {...(typeof agreement === 'string'
                ? { prefix: agreement, link: [] }
                : { ...agreement, link: agreement.link ?? [] })}
              onChange={checked => {
                checkedFlag = checked;
                modalReturn.update({
                  okButtonProps: {
                    ...okButtonProps,
                    disabled: !checked,
                  } as ButtonProps,
                });

                if (typeof agreement !== 'string') {
                  return agreement.onChange?.(checked);
                }
              }}
            />
          </>
        ) : (
          content
        ),
        async onOk(...args) {
          try {
            await props.onOk?.(...args);
            resolve(true);
          } catch (error) {
            reject(error);
            throw error;
          }
        },
        okButtonProps,
        cancelButtonProps: {
          // @ts-ignore
          'data-testid': testId.cancelBtn,
          ...props.cancelButtonProps,
        },
        onCancel(...args) {
          props.onCancel?.(...args);
          resolve(false);
        },
      });

      return Object.assign(promise, modalReturn);
    };
    return prev;
  }, {} as PromiseStatics);

  return Object.assign(CModal, statics);
};
