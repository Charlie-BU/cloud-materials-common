import React from 'react';
import type { CLoadingType, CResultProps, TitleProps } from '../interface';
import { useCConfigContext } from '../../CConfigProvider';

interface FallbackProps {
  type?: CLoadingType;
  onReload?: () => void;
  cResultProps?: CResultProps;
}

const DefaultRetryFallback = ({ onReload, loadFailed, retry }: Pick<FallbackProps, 'onReload'> & TitleProps) => {
  const { locale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('loading-fallback');
  return (
    <>
      <span className={cssPrefix`text`}>{loadFailed ?? locale.CLoading.loadFailed}</span>
      <span className={cssPrefix`reload`} onClick={onReload}>
        {retry ?? locale.CLoading.retry}
      </span>
    </>
  );
};

export function getFallbackResultProps({ onReload, cResultProps = {}, type }: FallbackProps): CResultProps {
  let defaultFallbackResultProps: CResultProps;
  const { title: customTitle, ...restCResultProps } = cResultProps;
  const objectTitle = customTitle as TitleProps | undefined;
  const title =
    objectTitle?.loadFailed || objectTitle?.retry ? (
      <DefaultRetryFallback onReload={onReload} {...objectTitle} />
    ) : (
      objectTitle ?? <DefaultRetryFallback onReload={onReload} />
    );
  switch (type) {
    case 'inline':
      defaultFallbackResultProps = {
        status: null,
        size: 'small',
        title,
      };
      break;
    case 'block':
      defaultFallbackResultProps = {
        status: 'no-picture',
        size: 'small',
        title,
      };
      break;
    case 'page':
    default:
      defaultFallbackResultProps = {
        status: 'no-picture',
        size: 'large',
        title,
      };
  }
  return { ...defaultFallbackResultProps, ...restCResultProps };
}
