import React, { useContext, useState } from 'react';
import type { CContentWrapperProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { Button, ConfigProvider, Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
import { IconLeft } from '@arco-design/iconbox-react-ve-o-design';

const cssPrefix = classNamePrefixFactory('content-wrapper');

export const testId = {
  container: cssPrefix`container`,
  popover: cssPrefix`popover`,
  icon: cssPrefix`icon`,
  cancelbutton: cssPrefix`cancelbutton`,
  submitbutton: cssPrefix`submitbutton`,
  operationList: cssPrefix`operationList`,
};

const CContentWrapper: React.VFC<CContentWrapperProps> = props => {
  const { locale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('content-wrapper');
  const iconCls = useCssPrefix('')`icon`;
  const {
    title,
    content,
    className,
    footer,
    onBack,
    leftContent,
    operationList,
    customOperation,
    tooltip,
    footerBtnPosition,
    onCancel,
    cancelText = locale.CContentWrapper.cancelText,
    cancelButtonProps,
    onSubmit = () => {},
    submitText = locale.CContentWrapper.submitText,
    submitButtonProps,
    footerContent,
    children,
    layout = 'normal',
    hideHeader,
    renderContent,
    prefixCls,
    autoWidthForFullPage,
    autoHeightWithViewPort,
    configForNormalLayout,
    customTopContent,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const defaultConfig = useContext(ConfigProvider.ConfigContext);
  const mergeConfig = Object.assign({}, defaultConfig, 'prefixCls' in props ? { prefixCls } : {});

  const finalContent = children ?? content;

  const operationListDom = operationList ? (
    <>
      {operationList.map(item => (
        <div key={item.name} className={cssPrefix`operation-list`} data-testid={testId.operationList}>
          <div className={cssPrefix`operation-icon`}>{item.icon}</div>
          <span onClick={item.onClick}>{item.name}</span>
        </div>
      ))}
    </>
  ) : null;

  const titleDom = (
    <div className={cssPrefix`title`}>
      {title}
      {tooltip && (
        <div className={cssPrefix`tooltip`} data-testid={testId.icon}>
          <ConfigProvider {...mergeConfig}>
            <Popover content={tooltip} position="right">
              <IconQuestionCircle />
            </Popover>
          </ConfigProvider>
        </div>
      )}
    </div>
  );

  const sidebarClassName = cssPrefix`sidebar`;

  const headerNode = !hideHeader && (
    <div className={cssPrefix`header`} style={configForNormalLayout?.headerStyle}>
      {title ? titleDom : <div />}
      <div className={cssPrefix`header-operation`}>
        {operationListDom}
        {customOperation}
      </div>
    </div>
  );

  const multiColContentWrapper = (
    <>
      {React.isValidElement(leftContent)
        ? React.cloneElement<any>(leftContent, { className: sidebarClassName })
        : leftContent && <div className={sidebarClassName}>{leftContent}</div>}
      <div className={cssPrefix`content`}>
        {renderContent ? (
          renderContent({
            header: headerNode,
            body: finalContent,
          })
        ) : (
          <>
            {customTopContent}
            {headerNode}
            <div style={configForNormalLayout?.contentStyle} className={cssPrefix`page-content`}>
              {finalContent}
            </div>
          </>
        )}
      </div>
    </>
  );

  const defaultFooter = (
    <div
      className={cssPrefix`fullpage-footer-container`}
      style={{ flexDirection: footerBtnPosition === 'left' ? 'row' : 'row-reverse' }}
    >
      <ConfigProvider {...mergeConfig}>
        <Button
          type="primary"
          onClick={async () => {
            setLoading(true);
            try {
              await onSubmit();
            } finally {
              setLoading(false);
            }
          }}
          loading={loading}
          data-testid={testId.submitbutton}
          {...submitButtonProps}
        >
          {submitText}
        </Button>
        <Button
          onClick={onCancel}
          data-testid={testId.cancelbutton}
          className={cssPrefix`cancel-btn`}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      </ConfigProvider>
      <div className={cssPrefix`fullpage-footer-content`}>{footerContent}</div>
    </div>
  );

  const fullPageContentWrapper = (
    <>
      {customTopContent}
      {!hideHeader && (
        <div className={cssPrefix`fullpage-header`}>
          <span className={cssPrefix`back-wrapper`}>
            {onBack && <IconLeft className={iconCls} onClick={onBack} />}
            {title && titleDom}
          </span>
          <div className={cssPrefix`header-operation`}>
            {operationListDom}
            {customOperation}
          </div>
        </div>
      )}
      <div className={cssPrefix`fullpage-content-wrapper`}>
        <div className={cssPrefix`fullpage-content`}>{finalContent}</div>
      </div>

      {footer !== null && (footer ?? <div className={cssPrefix`fullpage-footer`}>{defaultFooter}</div>)}
    </>
  );

  const layoutClassNameMap: Record<Exclude<CContentWrapperProps['layout'], undefined>, string> = {
    fullPage: cssPrefix`fullpage`,
    normal: cssPrefix`multiCol`,
  };

  return (
    <div
      className={classNames(cssPrefix``, layoutClassNameMap[layout], className, {
        [cssPrefix`fullpage-tiled`]: autoWidthForFullPage,
      })}
      style={autoHeightWithViewPort ? { height: '100vh' } : {}}
      data-testid={testId.container}
      {...restProps}
    >
      {layout === 'normal' ? multiColContentWrapper : fullPageContentWrapper}
    </div>
  );
};

CContentWrapper.displayName = 'CContentWrapper';

export default CContentWrapper;
