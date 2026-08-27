import type { ReactText } from 'react';
import React, { useContext } from 'react';
import type { CCheckboxGroupOption } from '../../CCheckbox/interface';
import classNames from 'classnames';
import { isObject, isUndefined } from 'lodash-es';
import CEllipsis from '../../CEllipsis';
import { CConfigContext } from '../../CConfigProvider';
import type { BtnSelectorContentProps } from './interface';

// 分段选择器（CRadio和CCheckbox）的公共内容区组件
// 负责处理CRadio的children或者option
export const BtnSelectorContent: React.FC<React.PropsWithChildren<BtnSelectorContentProps>> = props => {
  const { useCssPrefix } = useContext(CConfigContext);
  const prefixCls = useCssPrefix('btn-selector-content');
  const { textLineType, option, iconLayout = 'left', horizontalLayout = 'center', children } = props;
  const mergedOption: CCheckboxGroupOption<ReactText> | undefined =
    !option || isObject(option) ? option : { label: option, value: option };
  const { icon, label, description } = (mergedOption ?? {}) as Exclude<CCheckboxGroupOption<ReactText>, ReactText>;
  const labelRender = !option ? children : <CEllipsis>{!isUndefined(label) ? label : null}</CEllipsis>;
  const isDoubleTextLineType = textLineType === 'double';
  const textLineTypePrefix = textLineType === 'double' ? 'doubleline' : 'singleline';
  return (
    <div
      className={classNames({
        [prefixCls`container`]: true,
        [prefixCls`iconLayout-right`]: iconLayout === 'right',
        [prefixCls`horizontalLayout-stretch`]: horizontalLayout === 'stretch',
      })}
    >
      <div className={prefixCls`${textLineTypePrefix}`}>
        <div className={prefixCls`${textLineTypePrefix}-container`}>
          {icon ? <span className={prefixCls`${textLineTypePrefix}-icon`}>{icon}</span> : null}
          <div className={prefixCls`${textLineTypePrefix}-content`}>
            {isDoubleTextLineType ? (
              <>
                <div className={prefixCls`doubleline-content-label`}>{labelRender}</div>
                <div className={prefixCls`doubleline-content-description`}>{description}</div>
              </>
            ) : (
              labelRender
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
