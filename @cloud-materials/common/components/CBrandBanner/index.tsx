import React from 'react';
import type { CBrandBannerProps } from './interface';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';

const CBrandBanner: React.FC<CBrandBannerProps> = props => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('brand-banner');
  const { style, className, title, description, imgUrl, operation } = props;
  const noOperation = operation === undefined || operation === null;

  return (
    <div style={style} className={classNames(cssPrefix`container`, className)} data-cy="c-m-brand-banner-container">
      <div className={classNames(cssPrefix`inner`)}>
        <div className={classNames(cssPrefix`inner-content`)}>
          <div className={cssPrefix`inner-content-title`} data-cy="c-m-brand-banner-inner-content-title">
            {title}
          </div>
          <div className={cssPrefix`inner-content-description`} data-cy="c-m-brand-banner-inner-content-description">
            {description}
          </div>
          {noOperation ? (
            <></>
          ) : (
            <div className={cssPrefix`inner-content-operation`} data-cy="c-m-brand-banner-inner-content-operation">
              {operation}
            </div>
          )}
        </div>
        <div className={cssPrefix`inner-thumb`}>
          <img src={imgUrl} />
        </div>
      </div>
    </div>
  );
};

CBrandBanner.displayName = 'CBrandBanner';

export default CBrandBanner;
