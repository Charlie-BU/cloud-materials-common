import { Link } from '@arco-design/web-react';
import classNames from 'classnames';
import React from 'react';

import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import CCopy from '../CCopy';
import CEllipsis from '../CEllipsis';
import CPopupEdit from '../CPopupEdit';
import type { CNameInfoProps } from './interface';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks';

export const cssPrefix = classNamePrefixFactory('name-info');

export const testId = {
  root: cssPrefix``,
  copy: cssPrefix`copy`,
  name: cssPrefix`name`,
};

enum SuffixTypeEnum {
  name,
  id,
}
const CNameInfo: React.FC<CNameInfoProps> = props => {
  const { getCPrefixCls, cComponentConfig } = useCConfigContext();
  const mergedProps = useMergeProps(props, {}, cComponentConfig?.CNameInfo ?? {});
  const {
    name,
    id,
    style,
    idStyle,
    nameStyle,
    className,
    href,
    arcoLinkProps,
    nameRenderType = 'link',
    disableLink,
    suffix,
    nameCopyable = false,
    nameCCopyProps,
    nameEditable,
    nameEditRules,
    nameEditPlaceholder,
    nameCEllipsisProps,
    nameCPopupEditProps,
    idCopyable = false,
    idCCopyProps,
    idCEllipsisProps,
    idEditable = false,
    idEditRules,
    idEditPlaceholder,
    idCPopupEditProps,
    isIconHoverDisplay = true,
    isIconHoverSqueezeWidth = false,
    onNameClick,
    onNameEditOk,
    onIdEditOk,
    ...rest
  } = mergedProps;

  const nameInfoCls = getCPrefixCls('name-info');

  const renderSuffix = (type: SuffixTypeEnum = SuffixTypeEnum.name) => {
    const copyable = type === SuffixTypeEnum.name ? nameCopyable : idCopyable;
    const CCopyProps = type === SuffixTypeEnum.name ? nameCCopyProps : idCCopyProps;
    const text = type === SuffixTypeEnum.name ? name : id;
    return (
      <span className={`${nameInfoCls}-suffix`}>
        {copyable && (
          <span
            className={classNames(`${nameInfoCls}-copy`, {
              [`${nameInfoCls}-copy-weight`]: !isIconHoverSqueezeWidth,
              [`${nameInfoCls}-copy-squeeze`]: isIconHoverSqueezeWidth,
            })}
            data-testid={testId.copy}
          >
            <CCopy text={text} {...CCopyProps} />
          </span>
        )}
        {type === SuffixTypeEnum.name ? suffix : null}
      </span>
    );
  };

  const renderLink = () => {
    if (nameRenderType === 'text') {
      return (
        <span style={nameStyle} className={`${nameInfoCls}-name-text`}>
          {name}
        </span>
      );
    }
    return (
      <Link
        defaultValue={name}
        disabled={disableLink}
        href={href}
        style={{ display: 'inline', padding: 0, ...nameStyle }}
        onClick={event => {
          if (href && onNameClick) {
            event.preventDefault();
          }
          if (onNameClick) {
            onNameClick(event);
          }
        }}
        {...arcoLinkProps}
      >
        {name}
      </Link>
    );
  };

  return (
    <div
      {...rest}
      style={style}
      data-cy={testId.root}
      className={classNames(`${nameInfoCls}`, className, {
        [`${nameInfoCls}-edit-hide`]: isIconHoverDisplay,
        [`${nameInfoCls}-edit-hide-squeeze`]: isIconHoverSqueezeWidth,
        [`${nameInfoCls}-copy-visible`]: !isIconHoverDisplay,
        [`${nameInfoCls}-edit-visible`]: !isIconHoverDisplay,
      })}
    >
      {(nameEditable || name) && (
        <div className={`${nameInfoCls}-name`} data-testid={testId.name}>
          {nameEditable ? (
            <CPopupEdit
              showEdit={false}
              defaultValue={name || ''}
              rules={nameEditRules}
              placeholder={nameEditPlaceholder}
              onOk={onNameEditOk}
              displayContent={renderLink()}
              suffix={renderSuffix()}
              cEllipsisProps={{
                className: `${nameInfoCls}-name-content`,
                popoverContent: name,
                style: {
                  paddingRight: 4,
                  ...nameCEllipsisProps?.style,
                },
                ...nameCEllipsisProps,
              }}
              {...nameCPopupEditProps}
            />
          ) : (
            <div style={{ display: 'flex' }}>
              <CEllipsis
                className={`${nameInfoCls}-name-content`}
                popoverContent={name}
                content={renderLink()}
                {...nameCEllipsisProps}
                style={{ ...nameCCopyProps?.style }}
                suffix={
                  <>
                    {renderSuffix()}
                    {nameCEllipsisProps?.suffix}
                  </>
                }
              />
            </div>
          )}
        </div>
      )}
      {(idEditable || id) && (
        <div className={`${nameInfoCls}-id`}>
          {idEditable ? (
            <CPopupEdit
              showEdit={false}
              defaultValue={id || ''}
              rules={idEditRules}
              placeholder={idEditPlaceholder}
              onOk={onIdEditOk}
              displayContent={id}
              suffix={renderSuffix(SuffixTypeEnum.id)}
              cEllipsisProps={{
                popoverContent: id,
                style: {
                  paddingRight: 4,
                  ...idCEllipsisProps?.style,
                  ...idStyle,
                },
                ...idCEllipsisProps,
              }}
              {...idCPopupEditProps}
            />
          ) : (
            <div style={{ display: 'flex' }}>
              <CEllipsis
                popoverContent={id}
                content={id || ''}
                {...idCEllipsisProps}
                style={idStyle}
                suffix={
                  <>
                    {renderSuffix(SuffixTypeEnum.id)}
                    {idCEllipsisProps?.suffix}
                  </>
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

CNameInfo.displayName = 'CNameInfo';

export default CNameInfo;
