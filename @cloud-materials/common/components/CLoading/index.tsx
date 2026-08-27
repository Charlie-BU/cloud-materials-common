import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import type { CLoadingProps, CSpinProps, CResultProps } from './interface';
import CSpin from './components/Spin';
import CResult from './components/Result';
import { getFallbackResultProps } from './components/DefaultFallbacks';
import { TEST_ID } from './constants';
import { CConfigContext } from '../CConfigProvider';

/**
 * 请使用 CLoadingV2 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
const CLoading: React.FC<CLoadingProps> & {
  Spin: React.FC<CSpinProps>;
  Result: React.FC<CResultProps>;
} = props => {
  const {
    style,
    className,
    type = 'inline',
    loading = false,
    hasError = false,
    children,
    onReload,
    isBlock,
    fallback,
    cSpinProps,
    cResultProps,
  } = props;

  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('loading');
  const cssRoot = cssPrefix``;

  /**
   * display:
   *  success - 展示 children
   *  loading - 展示 loading indicator
   *  hasError - 用于 error indicator 布局
   */
  const display = useMemo(() => {
    // 成功加载，直接返回 children
    if (!loading && !hasError) {
      return children;
    }

    // 加载中展示 loading indicator
    if (loading) {
      switch (type) {
        case 'inline':
          return <CSpin size="small" isBlock={isBlock} {...cSpinProps} />;
        case 'block':
        case 'page':
        default:
          return (
            <CSpin size="large" loading={true} isBlock={isBlock} {...cSpinProps}>
              {children}
            </CSpin>
          );
      }
    }

    // 用于提供出错占位展示的布局
    switch (type) {
      case 'inline':
        return null;
      case 'block':
      case 'page':
      default:
        return children;
    }
  }, [loading, hasError, type, children, cSpinProps]);

  const errorDisplay = useMemo(() => {
    if (!hasError || loading) {
      return null;
    }

    if (fallback) {
      return fallback;
    }

    const fallbackResultProps = getFallbackResultProps({ onReload, cResultProps, type });
    return (
      <div className={cssPrefix`${type}-fallback`}>
        <CResult {...fallbackResultProps} />
      </div>
    );
  }, [loading, type, hasError, fallback, cResultProps, onReload]);

  return (
    <div
      style={style}
      className={classNames(
        cssRoot,
        cssPrefix`${type}`,
        {
          [cssPrefix`error`]: hasError,
          [cssPrefix`with-children`]: children,
          [cssPrefix`without-children`]: !children,
          [cssPrefix`is-block`]: isBlock,
        },
        className,
      )}
      data-cy={TEST_ID.loading}
    >
      {/*display: loading 及需要展示的 children 的内容*/}
      <div className={cssPrefix`display`}>{display}</div>
      {/*error: 出错的时候显示的内容*/}
      {errorDisplay && <div className={cssPrefix`fallback`}>{errorDisplay}</div>}
    </div>
  );
};

CLoading.displayName = 'CLoading';

CLoading.Spin = CSpin;
CLoading.Result = CResult;

export default CLoading;
