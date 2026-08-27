import React, { useContext, useEffect, useState } from 'react';
import type { CAgreementProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { CConfigContext } from '../CConfigProvider';
import { Checkbox, Link, Popover, Tooltip } from '@arco-design/web-react';
import useMergeValue from '../hooks/useMergeValue';
import { isUndefined } from 'lodash-es';

const cssPrefix = classNamePrefixFactory('agreement');

const testId = {
  container: cssPrefix``,
};

const CAgreement: React.FC<CAgreementProps> = props => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('agreement');
  const {
    link = [],
    prefix = locale.CAgreement.defaultPrefix,
    scene = 'normal',
    errorToolTip = locale.CAgreement.defaultErrorToolTip,
    className,
    style,
    value,
    validateStatusError,
  } = props;

  // 是否展示错误信息
  const [showErrorPopover, setShowErrorPopover] = useState<boolean>(false);
  // 维护当前checkbox的状态
  const [current, setCurrent] = useMergeValue<boolean>(false, {
    value,
  });
  // 是否是受控模式
  const isControlled = !isUndefined(value);
  const linkArr = Array.isArray(link) ? link : [link];
  const [ContentID] = useState(() => `${Date.now()}c-agreement-wrapper`);

  // 未选中协议，展示报错提示
  const showError = (value: boolean) => {
    if (!value && validateStatusError) setShowErrorPopover(true);
    else setShowErrorPopover(false);
  };

  const onChange = (v: boolean) => {
    // 非受控模式 管理当前状态
    if (!isControlled) setCurrent(v);
    // 受控模式&非受控模式
    props?.onChange?.(v);
  };

  // 组件外部的校验状态发生变化 或者 组件状态发生变化时 判断是否展示错误信息
  useEffect(() => {
    showError(current);
  }, [current, validateStatusError]);

  return (
    <div
      className={classNames(
        cssPrefix``,
        {
          [cssPrefix`card`]: scene === 'card',
        },
        className,
      )}
      data-cy={testId.container}
      data-testid={testId.container}
      id={ContentID}
      style={style}
    >
      {/* 
        实现文本关联输入元素的效果

        方式一：通过 <Checkbox>我已阅读并同意xxxx</Checkbox> 的形式，默认带有文本聚焦的功能
        1. 但Popover的位置有偏移，无法对齐checkbox复选框
        2. checkbox有默认的高度，换行样式需要额外处理

        方式二：原生input+label标签： <input type="checkbox" id="agreement-checkbox"> 和<label>
        1. 原生input实现Checkbox的火山样式需要写Checkbox样式，并且需要替换svg元素，才能还原火山Checkbox样式

        方式三：给文本添加点击事件实现 扩大可点击区域

      */}
      <Tooltip
        content={errorToolTip}
        popupVisible={showErrorPopover}
        position={'tl'}
        color="#fff"
        getPopupContainer={() => document.getElementById(ContentID) || document.body}
      >
        <div className={cssPrefix`checkbox-container`}>
          <Checkbox onChange={onChange} className={cssPrefix`checkbox`} checked={current} />
        </div>
      </Tooltip>
      <span className={cssPrefix`link`}>
        <span
          className={cssPrefix`link-prefix`}
          onClick={() => {
            // 扩容协议的可点击范围
            const changedValue = !current;
            onChange(changedValue);
          }}
        >
          {prefix}
        </span>
        {linkArr.map((linkItem, index) => {
          return (
            <span key={`${index}-${linkItem.linkUrl}`}>
              {linkItem.linkUrl ? (
                <Link target="_blank" href={linkItem.linkUrl}>
                  {linkItem.linkDesc}
                </Link>
              ) : (
                <Popover
                  disabled={!linkItem.linkToolTip}
                  content={linkItem.linkToolTip}
                  getPopupContainer={() => document.getElementById(ContentID) || document.body}
                  {...(linkItem?.arcoPopoverProps ?? {})}
                >
                  <span className={cssPrefix`link-desc`}>{linkItem.linkDesc}</span>
                </Popover>
              )}
              {index !== linkArr.length - 1 ? <span>{locale.CAgreement.defaultSeparator}</span> : null}
            </span>
          );
        })}
        {locale.CAgreement.defaultEndSeparator}
      </span>
    </div>
  );
};

CAgreement.displayName = 'CAgreement';

export default CAgreement;
